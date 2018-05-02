pragma solidity ^0.4.21;

contract Biffel {
    
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
        balances[msg.sender] = totalSupply;
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

    function addBuyer(uint _waffleID, address buyer) public (bool success) {
        var waffle = waffles[_waffleID];

        require(waffle != 0);
        var buyerCount = waffle.buyers.length;
        var slotCount = waffle.slotCount;
        require(buyerCount < slotCount);
        //require(that the buyer has enough money to pay for a slot)

        waffle.buyers.push(buyer);
        buyerCount += 1;

        payMoney(_waffleID, buyer);

        if (buyerCount == slotCount) {
            startWaffle(_waffleID)
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
        var randInt = random.random(waffle.slotCount); //not real solidity 

        var winner = waffle.buyers[randInt];
        notify(winner, waffle.seller);
    }

    function confirm(uint waffleID) public {
        waffles[waffleID] = 0; // reset waffle
        moveFunds(waffleID);
    }

    function moveFunds(waffleID) {
        var waffle = waffles[waffleID];

        //move money from waffle to seller
    }


    // // copied from http://solidity-apis.link-blockchain.org/docs/BlobStore/ 
    // function createID(bytes4 flags, bytes contents) external returns (bytes20 blobId) {
    //     // Generate the blobId.
    //     blobId = bytes20(keccak256(msg.sender, block.blockhash(block.number - 1)));
    //     // Make sure this blobId has not been used before (could be in the same block).
    //     while (blobInfo[blobId].blockNumber != 0) {
    //         blobId = bytes20(keccak256(blobId));
    //     }
    //     // Store blob info in state.
    //     blobInfo[blobId] = BlobInfo({
    //         flags: flags,
    //         revisionCount: 1,
    //         blockNumber: uint32(block.number),
    //         owner: (flags & ANONYMOUS != 0) ? 0 : msg.sender,
    //     });
    //     // Store the first revision in a log in the current block.
    //     Store(blobId, 0, contents);
    // }

}
