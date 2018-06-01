import {ITEMS_RECEIVED} from './actionTypes';
import api from '../api.js'

export default function fetchItems(web3) {
  return dispatch => {
    console.log('web3.contract.methods.getBiffelCount()', web3.contract.methods.getBiffelCount());
    web3.contract.methods.getBiffelCount().call({from: web3.userAccount})
    .then(count =>{
      var promises = []
      for(var id=0; id<count; id++){
        var promise = Promise.all([
          web3.contract.methods.getBiffelSeller(id).call({from: web3.userAccount}),
          web3.contract.methods.getBiffelBuyers(id).call({from: web3.userAccount}),
          web3.contract.methods.getBiffelSlotCount(id).call({from: web3.userAccount}),
          web3.contract.methods.getBiffelSlotPrice(id).call({from: web3.userAccount}),
          web3.contract.methods.getBiffelBalance(id).call({from: web3.userAccount}),
          web3.contract.methods.getBiffelBounty(id).call({from: web3.userAccount}),
          web3.contract.methods.getBiffelStartBlock(id).call({from: web3.userAccount}),
          web3.contract.methods.getBiffelBountyPaid(id).call({from: web3.userAccount}),
          web3.contract.methods.getBiffelIsActive(id).call({from: web3.userAccount})
        ])
        promises.push(promise)
      }
      return Promise.all(promises)
    })
    .then(result => {
      var items = []
      for(var i=0; i<result.length; i++){
        var item = {}
        item['id'] = i
        item['seller'] = result[i][0]
        item['buyers'] = result[i][1]
        item['slotCount'] = result[i][2]
        item['slotPrice'] = result[i][3]
        item['balance'] = result[i][4]
        item['bounty'] = result[i][5]
        item['startBlock'] = result[i][6]
        item['bountyPaid'] = result[i][7]
        item['isActive'] = result[i][8]
        items.push(item)
      }
      dispatch({type: ITEMS_RECEIVED, items})
    })
    .catch(err => console.log(err))
  };
}

// web3.contract.methods.getBiffelSeller()
// .then(seller => {
//   item['seller'] = seller
//   return web3.contract.methods.getBiffelBuyers()
// })
// .then(buyers => {
//   item['buyers'] = buyers
//   return web3.contract.methods.getBiffelSlotCount()
// })
// .then(slotCount => {
//   item['slotCount'] = slotCount
//   return web3.contract.methods.getBiffelSlotPrice()
// })
// .then(slotPrice => {
//   item['slotPrice'] = slotPrice
//   return web3.contract.methods.getBiffelBalance()
// })
// .then(balance => {
//   item['balance'] = balance
//   return web3.contract.methods.getBiffelBounty()
// })
// .then(bounty => {
//   item['bounty'] = bounty
//   return web3.contract.methods.getBiffelStartBlock()
// })
// .then(startBlock => {
//   item['startBlock'] = startBlock
//   return web3.contract.methods.getBiffelBountyPaid()
// })
// .then(bountyPaid => {
//   item['bountyPaid'] = bountyPaid
//   return web3.contract.methods.getBiffelIsActive()
// })
// .then(isActive => {
//   item['isActive'] = isActive
//   dispatch({type: ITEM_RECEIVED, item})
// })
// .catch(err => {
//   console.log(err);
// })
//getBiffelCount() ->  Number

//iterate over the numbers
