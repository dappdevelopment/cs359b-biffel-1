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
        uint _waffleID = counter;
        counter++;

        // https://coursetro.com/posts/code/102/Solidity-Mappings-&-Structs-Tutorial
        Waffle storage waffle = waffles[_waffleID];
        waffle.seller = msg.sender;
        waffle.slotCount = _slotCount;
        waffle.slotPrice = _slotPrice;
        waffle.isValue = true;

        return _waffleID;
    }

    function addBuyer(uint _waffleID) public payable returns (bool success) {
        Waffle storage waffle = waffles[_waffleID];

        require(waffle.isValue);
        require(waffle.buyers.length < waffle.slotCount);
        require(msg.value > waffle.slotPrice);

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
        uint randInt = block.number % waffle.slotCount; // This isn't secure
        address winner = waffle.buyers[randInt];
        moveFunds(_waffleID);
        // notify(winner, waffle.seller);
    }

    function moveFunds(uint _waffleID) private {
        Waffle storage waffle = waffles[_waffleID];
        waffle.seller.transfer(waffle.balance);
        removeWaffle(_waffleID);
    }

}