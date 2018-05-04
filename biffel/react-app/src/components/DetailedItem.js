import React from 'react'
import ItemAPI from '../api'
import { Link } from 'react-router-dom'

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const DetailedItem = (props) => {

  console.log(props.match.params.id)
  
  const item = ItemAPI.get(
    parseInt(props.match.params.id, 0)
  )

  if (!item) {
    return <div>Sorry, but no item was found.</div>
  }

  return (
    <div>
      <h1>{item.name} (#{item.id})</h1>
      <h2>Slot Price: {item.slot_price}</h2>
      <Link to='/items'>Back</Link>
    </div>
  )
}

export default DetailedItem
