import React from 'react'

import './header.css'
import ic_wantToRead from '../assets/import_contacts-prim.svg'
import ic_isRead from '../assets/book-read-prim.svg'
import ic_search from '../assets/search-prim.svg'

export const Header = (props) => {
  let icon
  if (props.icon === "ic_search") {
    icon = <img src={ic_search} />
  } else if (props.icon === "ic_isRead") {
    icon = <img src={ic_isRead} />
  } else {
    icon = <img src={ic_wantToRead} />
  }

  return (
    <div className="debug header">
      <div className="icon-container-header">
        {icon}
      </div>
      <h2>{props.title}</h2>
    </div>
  )
}


// props.icon values:
  // ic_search
  // ic_wantToRead
  // ic_isRead