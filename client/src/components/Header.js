import React from 'react'
import './header.css'

export const Header = (props) => {
  return (
  <div className="debug header">
    <h2>{props.title}</h2>
  </div>
  )
}