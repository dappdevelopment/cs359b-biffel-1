pragma solidity ^0.4.21;
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract Biffel {

    address contractCreator;
    
    struct Waffle {
        uint waffleID;
        address seller;
        address[] buyers;
        uint32 slotCount;
        uint256 slotPrice;
        uint256 balance;
    }

    mapping (uint => Waffle) waffles;
    uint counter; 

    constructor() public {
        contractCreator = msg.sender;
    }

    function createWaffle(address _seller, uint32 _slotCount, uint256 _slotPrice) public returns uint {
        var _waffleID = counter;
        counter++;

        // https://coursetro.com/posts/code/102/Solidity-Mappings-&-Structs-Tutorial
        var waffle = waffles[_waffleID];
        waffle.seller = _seller;
        waffle.slotCount = _slotCount;
        waffle.slotPrice = _slotPrice;

        return _waffleID;
    }

    function addBuyer(uint _waffleID) public (bool success) {
        var waffle = waffles[_waffleID];

        require(waffle != 0);
        require(waffle.buyers.length < waffle.slotCount);
        require(msg.value > slotPrice);

        waffle.buyers.push(msg.sender);
        buyerCount += 1;

        waffle.balances += msg.value;

        if (buyerCount == slotCount) {
            startWaffle(_waffleID);
        }

        return true;
    }

    function removeWaffle(uint _waffleID) public (bool success) {
        var waffle = waffles[_waffleID];

        require(waffle != 0);
        require(msg.sender == waffle.seller);

        waffles[_waffleID] = 0;
        return true
    }

    function startWaffle(uint _waffleID) {
        var waffle = waffles[_waffleID];
        var randInt = block.number % waffle.slotCount; // This isn't secure
        var winner = waffle.buyers[randInt];
        notify(winner, waffle.seller);
    }

    function generateNumber(uint numSlots) private view returns (uint winningSlot){
        newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        entropy = oraclize_query("URL", "xml(https://www.fueleconomy.gov/ws/rest/fuelprices).fuelPrices.diesel");

        return uint(keccak256(entropy)%numSlots)
    }

    function moveFunds(_waffleID) {
        var waffle = waffles[_waffleID];
        waffle.seller.transfer(waffle.balance);
        removeWaffle(_waffleID)
    }

}