// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
console.log("hello world");
var Web3 = require ('web3');
if (typeof web3 == 'undefined') {
  throw 'No web3 detected. Is Metamask/Mist being used?';
} else {
  console.log("we good");
}
// web3 = new Web3(web3.currentProvider); // MetaMask injected Ethereum provider
// console.log("Using web3 version: " + Web3.version);

var contract;
var userAccount;
var $ = require ('jquery');
var contractDataPromise = $.getJSON('Biffel.json');
// var networkIdPromise = web3.eth.net.getId(); // resolves on the current network id
// var accountsPromise = web3.eth.getAccounts(); // resolves on an array of accounts

const ItemAPI = {
  users: [
    {id: 0, email: 'jaimedeverall@gmail.com', password: 'password', name: 'Jaime Deverall', eth_address: '5667778'},
    {id: 1, email: 'jiwoolee@gmail.com', password: 'password', name: 'Jiwoo Lee', eth_address: '797069960'},
    {id: 2, email: 'miguelayala@gmail.com', password: 'password', name: 'Miguel Ayala', eth_address: '483895955'},
  ],
  findUser: function(email, password) {
    const isUser = user => (user.password === password) && (user.email === email)
    return this.users.find(isUser);
  },
  items: [
    {id: 0, name: "Yeezy1", slotPrice: 10 },
    {id: 1, name: "Yeezy2", slotPrice: 10 },
    {id: 2, name: "Yeezy3", slotPrice: 10 },
    {id: 3, name: "Yeezy4", slotPrice: 10 },
    {id: 4, name: "Yeezy5", slotPrice: 10 },
    {id: 5, name: "Yeezy6", slotPrice: 10 },
  ],
  all: function() { return this.items},
  get: function(id) {
    const isItem = item => item.id === id
    return this.items.find(isItem)
  }
}

export default ItemAPI
