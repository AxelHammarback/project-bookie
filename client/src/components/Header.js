import React from 'react'

import './header.css'
import ic_wantToRead from '../assets/import_contacts-prim.svg'
import ic_isRead from '../assets/book-read-prim.svg'
import ic_search from '../assets/search-prim.svg'

export const Header = (props) => {
  let icon
  if (props.icon === "ic_search") {
    icon = <img src={ic_search} alt="search"/>
  } else if (props.icon === "ic_isRead") {
    icon = <img src={ic_isRead} alt="is read"/>
  } else {
    icon = <img src={ic_wantToRead} alt="want to read"/>
  }

  return (
    <div className="header">
      <div className="icon-container-header">
        {icon}
      </div>
      <h2>{props.title}</h2>
    </div>
  )
}
