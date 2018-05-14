import Web3 from 'web3';
var $ = require ('jquery');
//ws://localhost:3000
var web3 = new Web3(Web3.givenProvider || "https://biffel.herokuapp.com/");

var contract;
var userAccount;
var contractAddress;

var contractDataPromise = $.getJSON('/build/contracts/Biffel.json');
var networkIdPromise = web3.eth.net.getId(); // resolves on the current network id
var accountsPromise = web3.eth.getAccounts(); // resolves on an array of accounts

Promise.all([contractDataPromise, networkIdPromise, accountsPromise])
    .then(function initApp(results) {
        var contractData = results[0];  // resolved value of contractDataPromise
        var networkId = results[1];     // resolved value of networkIdPromise
        var accounts = results[2];      // resolved value of accountsPromise
        userAccount = accounts[0];
        console.log("printing userAccount in metamask.js: " + userAccount);

        if (!(networkId in contractData.networks)) {
            throw new Error("Contract not found in selected Ethereum network on MetaMask.");
        }

        contractAddress = contractData.networks[networkId].address;
        contract = new web3.eth.Contract(contractData.abi, contractAddress);
    }).catch(console.error);

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
  },
  createWaffle: function(title, slotPrice, numberOfSlots){
    return contract.methods.createWaffle(numberOfSlots, slotPrice);
  }
}

export default ItemAPI
