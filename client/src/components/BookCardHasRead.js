import React from 'react'

import Rating from '@material-ui/lab/Rating'
import './card.css'

export const BookCardHasRead = (props) => {

  const onDeleteBook = () => {
    props.onDeleteBook(props._id)
  }

  const onMarkAsNotRead = () => {
    props.onMarkAsNotRead(props._id)
  }

  const onRateBook = (rating) => {
    props.onRateBook(props._id, rating)
  }

  return (
    <div className="card">
      <div className="card-thumbnail" style={{
        backgroundImage: `url(${props.thumbnail})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      </div>
      <div className="card-info">
        <div className="card-info-top">
          <h3 className="h3-title">{props.title}</h3>
          <p className="p-author">{props.author}</p>
        </div>

        <div className="container-rating">
          <Rating
            value={props.rating}
            onChange={(event, newValue) => {
              onRateBook(newValue)
            }} />
        </div>
        <div className="card-info-bottom">
          <button className="button-primary" onClick={() => onMarkAsNotRead()}>Un-read</button>
          <button className="button-primary" onClick={() => onDeleteBook()}>Remove</button>
        </div>
      </div>
    </div >
  )
}