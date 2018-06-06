pragma solidity ^0.4.21;

contract BiffelContract {

    address contractCreator;
    
    struct Biffel {
        string biffelTitle;
        string biffelIPFSHash;
        uint biffelID;
        address seller;
        address[] buyers;
        uint32 slotCount;
        uint256 slotPrice;
        uint256 balance;
        uint256 bounty;
        uint startBlock;
        address winner;
        
        address bountyPaidTo;
        
        bool isActive;
    }

    struct Votes {
        uint upvotes;
        uint downvotes;
    }

    event biffelCreated(
        string biffelTitle,
        uint biffelID,
        address seller,
        uint32 slotCount,
        uint256 slotPrice,
        uint256 bounty
    );
    
    event slotBought(
        uint biffelID,
        address seller,
        address[] buyers,
        uint256 slotPrice,
        uint32 slotCount,
        uint256 bounty
    );
    
    event biffelFull(
        uint biffelID,
        address[] buyers
    );
    
    event biffelDecided(
        uint biffelID,
        address winner
    );

    mapping (uint => Biffel) biffels;
    mapping (address => Votes) ratings;
    uint256 biffelCount;
    
    //assuming average finality is around 6 or 7 this number should be 10. height of 1 is better for testing
    uint constant clearingHeight = 1;

    constructor() public {
        contractCreator = msg.sender;
        biffelCount = 0;
    }

    function createBiffel(string title, string ipfshash, uint32 _slotCount, uint256 _slotPrice, uint256 _bounty) public returns (uint) {
        uint _biffelID = biffelCount;

        biffelCount += 1;
        
        Biffel memory biffel = Biffel(title, ipfshash, _biffelID,msg.sender,new address[](0),_slotCount,_slotPrice,0 wei,_bounty,0,address(0),address(0), true);
        
        biffels[_biffelID] = biffel;

        emit biffelCreated(title, _biffelID,msg.sender,_slotCount,_slotPrice,_bounty);

        return _biffelID;
    }

    function buySlot(uint _biffelID) public payable returns (bool success) {
        
        require(msg.sender != biffels[_biffelID].seller);
        require(biffels[_biffelID].isActive);
        require(biffels[_biffelID].buyers.length < biffels[_biffelID].slotCount);
        require(msg.value >= biffels[_biffelID].slotPrice + biffels[_biffelID].bounty);

        biffels[_biffelID].buyers.push(msg.sender);
        uint buyerCount = biffels[_biffelID].buyers.length;

        biffels[_biffelID].balance += msg.value;
        
        emit slotBought(_biffelID,biffels[_biffelID].seller,biffels[_biffelID].buyers,biffels[_biffelID].slotPrice,biffels[_biffelID].slotCount,biffels[_biffelID].bounty);

        if (buyerCount == biffels[_biffelID].slotCount) {
            biffels[_biffelID].startBlock = block.number;
            emit biffelFull(_biffelID,biffels[_biffelID].buyers);
        }

        return true;
    }

    function startBiffel(uint _biffelID) public payable returns (address winner){
        uint blockNumber = block.number;
        
        //check if we have reached average finality
        require(blockNumber >= biffels[_biffelID].startBlock + clearingHeight);
        
        require(biffels[_biffelID].isActive == true);
        
        
        bytes32 hash = keccak256(block.blockhash(blockNumber));
        uint intHash = uint(hash);
        uint randInt = intHash % biffels[_biffelID].slotCount;
        winner = biffels[_biffelID].buyers[randInt];
        biffels[_biffelID].isActive = false;
        
        require(biffels[_biffelID].bountyPaidTo == address(0));
        uint256 totalBounty = biffels[_biffelID].bounty * biffels[_biffelID].slotCount;
        msg.sender.transfer(totalBounty);
        biffels[_biffelID].balance -= totalBounty;
        biffels[_biffelID].bountyPaidTo = msg.sender;
        
        emit biffelDecided(_biffelID,winner);
        
        biffels[_biffelID].winner = winner;
        
        return winner;


    }
    
    function confirmShipment(uint _biffelID) public returns (bool success) {
        require(biffels[_biffelID].isActive == false);
        require(msg.sender == biffels[_biffelID].winner);
        biffels[_biffelID].seller.transfer(biffels[_biffelID].balance);
        biffels[_biffelID].balance = 0;
        return true;
    }
    
    function withdrawSlot(uint _biffelID) public returns (bool success) {
        
        require(biffels[_biffelID].isActive);
        uint buyerLength = biffels[_biffelID].buyers.length;
        for(uint i = 0; i < buyerLength;i++){
           if(biffels[_biffelID].buyers[i] == msg.sender){
               
               biffels[_biffelID].buyers[i] = biffels[_biffelID].buyers[buyerLength - 1];
               
               delete biffels[_biffelID].buyers[buyerLength - 1];
               
               
               msg.sender.transfer(biffels[_biffelID].slotPrice + biffels[_biffelID].bounty);
               biffels[_biffelID].balance -= (biffels[_biffelID].slotPrice + biffels[_biffelID].bounty);
               return true;
           }
        }
        
        return false;
    }
    
    //return a count of the biffels
    function getBiffelCount() public view returns (uint256){
        return biffelCount;
    }
    
    //public getters for Biffel struct variables
    //requires biffelIDs
    
    function getBiffelTitle(uint256 _biffelID) public view returns (string title){
        return biffels[_biffelID].biffelTitle;
    }

    function getBiffelIPFSHash(uint256 _biffelID) public view returns (string IPFSHash){
        return biffels[_biffelID].biffelIPFSHash;
    }
    
    function getBiffelSeller(uint256 _biffelID) public view returns (address seller){
        return biffels[_biffelID].seller;
    }
    
    function getBiffelBuyers(uint256 _biffelID) public view returns (address[] buyers){
        return biffels[_biffelID].buyers;
    }
    
    function getBiffelBuyerLength(uint256 _biffelID) public view returns (uint buyerLength){
        return biffels[_biffelID].buyers.length;
    }
    
    function getBiffelSlotCount(uint256 _biffelID) public view returns (uint32 slotCount){
        return biffels[_biffelID].slotCount;
    }
    
    function getBiffelSlotPrice(uint256 _biffelID) public view returns (uint256 slotPrice){
        return biffels[_biffelID].slotPrice;
    }
    
    function getBiffelBalance(uint256 _biffelID) public view returns (uint256 balance){
        return biffels[_biffelID].balance;
    }
    
    function getBiffelBounty(uint256 _biffelID) public view returns (uint256 bounty){
        return biffels[_biffelID].bounty;
    }
    
    function getBiffelStartBlock(uint256 _biffelID) public view returns (uint startBlock){
        return biffels[_biffelID].startBlock;
    }
    
    function getBiffelBountyPaidTo(uint256 _biffelID) public view returns (address bountyPaidTo){
        return biffels[_biffelID].bountyPaidTo;
    }
    
    function getBiffelIsActive(uint256 _biffelID) public view returns (bool isActive){
        return biffels[_biffelID].isActive;
    }
    
    function getBiffelWinner(uint256 _biffelID) public view returns (address winner){
        return biffels[_biffelID].winner;
    }
    
    function getBiffelTotalBounty(uint256 _biffelID) public view returns (uint256 totalBounty){
        return biffels[_biffelID].slotCount * biffels[_biffelID].bounty;
    }
    
    // ratings
    function rate(address person, bool upvote) {
        if (upvote) {
            ratings[person].upvotes += 1;
        } else {
            ratings[person].downvotes += 1;
        }
    }

    function getRating(address person) public view returns (uint upvotes, uint downvotes){
        return (ratings[person].upvotes, ratings[person].downvotes);
    }

}