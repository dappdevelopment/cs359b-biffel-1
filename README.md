# CS359B Project Biffel

In recent years, the ‘waffling’ subculture has been growing in pockets of the online fashion community. A ‘waffle’ is a type of auction where sellers of an item sell uniformly-priced lots to a range of different bidders. After a certain period of time, a random number determines the winner of the auction. 

Informal waffling is very primitive, as current waffle mediums, like facebook, are unsafe and unreliable. On facebook for example, a post is constantly updated with new slots and buyers, and the final winner is chosen via a scheduled facebook live video of someone going onto random.org and getting a number. This unrefined system is ripe for fraud and manipulation.

With our team - Jaime Deverall (Senior Front End Engineer), Jiwoo Lee (CEO Intern + Backend Distributed Systems Developer) and Miguel Ayala (Solidity Smart Contract Engineer) - biffel is trying to provide a smooth and transparent waffling experience for both buyers and sellers by implementing a provably fair algorithm for pseudo-random number generation.

The dapp is appealing to buyers who want the opportunity to buy items for less than market value, and to sellers who can sell their items for prices above their market value.

# What is Biffel?

In recent years, the ‘waffling’ subculture has been growing in pockets of the online fashion community. A ‘waffle’ is a type of auction where sellers of an item sell uniformly-priced lots to a range of different bidders. After a certain period of time, a random number determines the winner of the auction. 

Informal waffling is very primitive, as current waffle mediums, like facebook, are unsafe and unreliable. On facebook for example, a post is constantly updated with new slots and buyers, and the final winner is chosen via a scheduled facebook live video of someone going onto random.org and getting a number. This unrefined system is ripe for fraud and manipulation.

**Biffel** is trying to provide a smooth and transparent waffling experience for both buyers and sellers by implementing a provably fair algorithm for pseudo-random number generation.

* As a **seller**, click into the **Create Biffel** tab of our app and upload your item with a title, image, slot count and slot price. Often times the slot count * slot price can exceed the market amount.
* As a **buyer**, browse through the listings on the **Buy Slots** tab. You can click on an item to see the details and purchase a slot if necessary
* Anyone can initiate a waffle with all of its slots taken up to collect a small bounty.

### Technical Architecture
Our application is a react app, and doesn't communicate with a server. Instead, all the data is stored directly on the blockchain. Though this is definitely expensive, this ensures the immutability of the data. Our front end communicates directly with the contract to get all the information about the waffles, so there is some latency between pressing a button to purchase a slot or listing an item to when it actually appears on our website.

### Technical challenges

The random algorithm took some work to implement, since getting data from a third party defeats the point of transparency. We tried to create a random algorithm that took noise from unrelated sources like the price of gas, but in the end we drew inspiration from the random algorithm used by CryptoKitties.

### Future work

We are planning to work on the project in the future as we add a rating system and a way to arbitrate conflicts that arise. 

## Technologies used

Solidity, MERN stack (mongoDB, Express, Node, React), web3

## Istallation intructions

TBD
