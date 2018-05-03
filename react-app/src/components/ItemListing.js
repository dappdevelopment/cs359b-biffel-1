import React from 'react'
import ItemAPI from '../api'
import { Link } from 'react-router-dom'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const ItemListing = () => (
  <div>
    <ul>
      {
        ItemAPI.all().map(i => (
          <li key={i.id}>
            <Link to={`/items/${i.id}`}>{i.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

export default ItemListing
