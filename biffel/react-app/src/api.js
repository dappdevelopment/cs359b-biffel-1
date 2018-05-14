// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
function app() {
  if (typeof web3 == 'undefined') throw 'No web3 detected. Is Metamask/Mist being used?';
  web3 = new Web3(web3.currentProvider); // MetaMask injected Ethereum provider
    console.log("Using web3 version: " + Web3.version); // why doesn't this work
    console.log(web3.version)

    var contract;
    var userAccount;
    var contractAddress; 
  
    var contractDataPromise = $.getJSON('build/contracts/Biffle.json');
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
}

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

$(document).ready(app);

export default ItemAPI
