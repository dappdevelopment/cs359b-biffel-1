pragma solidity ^0.4.21;

contract BiffelContract {

    address contractCreator;
    
    struct Biffel {
        uint biffelID;
        address seller;
        address[] buyers;
        uint32 slotCount;
        uint256 slotPrice;
        uint256 balance;
        
        bool isValue;
    }

    mapping (uint => Biffel) biffels;
    uint counter;

    constructor() public {
        contractCreator = msg.sender;
    }

    function createBiffel(uint32 _slotCount, uint256 _slotPrice) public returns (uint) {
        uint _biffelID = block.number;
        
        Biffel memory biffel = Biffel(_biffelID,msg.sender,new address[](0),_slotCount,_slotPrice,0 wei,true);
        
        biffels[_biffelID] = biffel;

        return _biffelID;
    }

    function addBuyer(uint _biffelID) public payable returns (bool success) {
        Biffel storage biffel = biffels[_biffelID];
        
        require(msg.sender != biffel.seller);
        require(biffel.isValue);
        require(biffel.buyers.length < biffel.slotCount);
        require(msg.value >= biffel.slotPrice);

        biffel.buyers.push(msg.sender);
        uint buyerCount = biffel.buyers.length;

        biffel.balance += msg.value;
        
        biffels[_biffelID] = biffel;

        if (buyerCount == biffel.slotCount) {
            startBiffel(_biffelID);
        }

        return true;
    }

    /* Removes a biffel
    */
    function userRemoveBiffel(uint _biffelID) public returns (bool success) {

        require(msg.sender == biffels[_biffelID].seller);

        delete biffels[_biffelID];
        return true;
    }
    
    /* This is different from userRemoveBiffel
    */

    function autoDestroyBiffel(uint _biffelID) public returns (bool success) {
        delete biffels[_biffelID];
        return true;
    }
    
    
    function startBiffel(uint _biffelID) public {
        Biffel storage biffel = biffels[_biffelID];
        
        uint blockNumber = block.number;
        bytes32 hash = keccak256(blockNumber);
        uint intHash = uint(hash);
        uint randInt = intHash % biffels[_biffelID].slotCount; // This isn't secure
        address winner = biffel.buyers[randInt];
        moveFunds(_biffelID);
        //notify(winner, biffel.seller);
    }

    function moveFunds(uint _biffelID) private {
        Biffel storage biffel = biffels[_biffelID];
        biffel.seller.transfer(biffel.balance);
        autoDestroyBiffel(_biffelID);
    }

}