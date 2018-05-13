// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const ItemAPI = {
  users: [
    {id: 0, username: 'jaimedeverall', password: 'password', name: 'Jaime Deverall', eth_address: '5667778'},
    {id: 1, username: 'jiwoolee', password: 'password', name: 'Jiwoo Lee', eth_address: '797069960'},
    {id: 2, username: 'miguelayala', password: 'password', name: 'Miguel Ayala', eth_address: '483895955'},
  ],
  findUser: function(username, password) {
    const isUser = user => user.password = password && user.username === username
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
