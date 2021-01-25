import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <div className="debug">

      <ul className="navbar">
        <NavLink to="/">
          <li>Want to read</li>
        </NavLink>
        <NavLink to="/hasread">
          <li>Has read</li>
        </NavLink>
        <NavLink to="/search">
          <li>Search</li>
        </NavLink>
      </ul>

    </div>
  )
}