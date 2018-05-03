// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const ItemAPI = {
  items: [
    {id: 0, name: "Yeezy1", slot_price: 10 },
    {id: 1, name: "Yeezy2", slot_price: 10 },
    {id: 2, name: "Yeezy3", slot_price: 10 },
    {id: 3, name: "Yeezy4", slot_price: 10 },
    {id: 4, name: "Yeezy5", slot_price: 10 },
    {id: 5, name: "Yeezy6", slot_price: 10 },
  ],
  all: function() { return this.items},
  get: function(id) {
    const isItem = item => item.id === id
    return this.items.find(isItem)
  }
}

export default ItemAPI
