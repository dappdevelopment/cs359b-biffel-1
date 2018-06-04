import Web3 from 'web3';
import {SETUP_CONNECTION_SUCCESS, SETUP_CONNECTION_FAILURE, SETUP_CONNECTION_LOADING} from './actionTypes';

export default function setupConnection() {
  return dispatch => {
    //eventually this will be a database call.
    //ws://localhost:3000
    //https://biffel.herokuapp.com/
    // dispatch({type: SETUP_CONNECTION_LOADING});
    var web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");
    var contract;
    var userAccount;
    var contractAddress;
    //var contractDataPromise = $.getJSON('/build/contracts/Biffel.json');
    var contractDataPromise = require('../contracts/BiffelContract.json');
    var networkIdPromise = web3.eth.net.getId(); // resolves on the current network i
    var accountsPromise = web3.eth.getAccounts(); // resolves on an array of accounts
    // var ms = 10000;
    // let timeout = new Promise((resolve, reject) => {
    //   let id = setTimeout(() => {
    //     clearTimeout(id);
    //     reject('Timed out in '+ ms + 'ms.')
    //   }, ms)
    // })
    Promise.all([contractDataPromise, networkIdPromise, accountsPromise])
    .then(function initApp(results) {
      var contractData = results[0];  // resolved value of contractDataPromise
      console.log('contractData', contractData)
      var networkId = results[1];     // resolved value of networkIdPromise
      console.log('networkId', networkId);
      var accounts = results[2];      // resolved value of accountsPromise
      userAccount = accounts[0];
      if(userAccount === undefined){
        throw new Error("User not logged into MetaMask")
      }
      if (!(networkId in contractData.networks)) {
        throw new Error("Contract not found in selected Ethereum network on MetaMask.");
      }
      contractAddress = contractData.networks[networkId].address;
      console.log('contractAddress', contractAddress);
      contract = new web3.eth.Contract(contractData.abi, contractAddress);
      dispatch({type: SETUP_CONNECTION_SUCCESS, web3: {contract, userAccount}})
      return {contract, userAccount, networkId, abi: contractData.abi, address: contractAddress};
    })
    .then(web3 => {
      var networkURI;
      var abi = web3.abi;
      var networkId = web3.networkId;
      var address = web3.address;
      console.log('networkId', networkId);
      switch(networkId){
        case 1:
          networkURI = 'wss://mainnet.infura.io/ws';
          break;
        case 4:
          networkURI = 'wss://rinkeby.infura.io/ws';
          break;
        default:
          networkURI = 'wss://rinkeby.infura.io/ws';
      }
      const web3ForEvents = new Web3(new Web3.providers.WebsocketProvider(networkURI));
      console.log('web3ForEvents', web3ForEvents);
      const contractForEvents = new web3ForEvents.eth.Contract(abi, address);

      contractForEvents.events.slotBought()
      .on('data', function(event){
        let data = event.returnValues;
        console.log('data', data)
      })
    })
    .catch((err) => {
      var message;
      if(typeof err === 'string'){
        message = err;
      }else{
        message = err.message;
      }
      dispatch({type: SETUP_CONNECTION_FAILURE, error: message})
    })

  };
}
