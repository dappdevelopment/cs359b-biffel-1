pragma solidity ^0.4.21;

contract Biffel {

    address contractCreator;
    
    struct Waffle {
        uint waffleID;
        address seller;
        address[] buyers;
        uint32 slotCount;
        uint256 slotPrice;
        uint256 balance;
        
        bool isValue;
    }

    mapping (uint => Waffle) waffles;
    uint counter;

    constructor() public {
        contractCreator = msg.sender;
    }

    function createWaffle(uint32 _slotCount, uint256 _slotPrice) public returns (uint) {
        uint _waffleID = block.number;
        
        address[] memory emptyBuyer = new address[](_slotCount);
        
        Waffle memory waffle = Waffle(_waffleID,msg.sender,emptyBuyer,_slotCount,_slotPrice,0,true);
        
        waffles[_waffleID] = waffle;

        // https://coursetro.com/posts/code/102/Solidity-Mappings-&-Structs-Tutorial
        // waffles[_waffleID].seller = msg.sender;
        // waffles[_waffleID].slotCount = _slotCount;
        // waffles[_waffleID].slotPrice = _slotPrice;
        // waffles[_waffleID].isValue = true;
        
        // Waffle storage waffle = waffles[_waffleID];

        return _waffleID;
    }

    function addBuyer(uint _waffleID) public payable returns (bool success) {
        Waffle storage waffle = waffles[_waffleID];

        require(waffle.isValue);
        require(waffle.buyers.length < waffle.slotCount);
        require(msg.value >= waffle.slotPrice);

        waffle.buyers.push(msg.sender);
        uint buyerCount = waffle.buyers.length;
        buyerCount += 1;

        waffle.balance += msg.value;

        if (buyerCount == waffle.slotCount) {
            startWaffle(_waffleID);
        }

        return true;
    }

    function removeWaffle(uint _waffleID) public returns (bool success) {
        Waffle storage waffle = waffles[_waffleID];

        require(waffle.isValue);
        require(msg.sender == waffle.seller);

        waffles[_waffleID].isValue = false;
        return true;
    }

    function startWaffle(uint _waffleID) public {
        Waffle storage waffle = waffles[_waffleID];
        
        uint blockNumber = block.number;
        bytes32 hash = keccak256(blockNumber);
        uint intHash = uint(hash);
        uint randInt = intHash % waffles[_waffleID].slotCount; // This isn't secure
        address winner = waffles[_waffleID].buyers[randInt];
        moveFunds(_waffleID);
        // notify(winner, waffle.seller);
    }

    function moveFunds(uint _waffleID) private {
        Waffle storage waffle = waffles[_waffleID];
        waffle.seller.transfer(waffle.balance);
        removeWaffle(_waffleID);
    }

}