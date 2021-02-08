import React from 'react'

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
          <p className="container-rating-text">
            <span className="p-rating-text">Rating:</span>
            <span className="p-rating-number"> {props.rating}</span>
          </p>
          <div className="container-rating-buttons">
            <button className="button-rating" onClick={() => onRateBook(1)}>1</button>
            <button className="button-rating" onClick={() => onRateBook(2)}>2</button>
            <button className="button-rating" onClick={() => onRateBook(3)}>3</button>
            <button className="button-rating" onClick={() => onRateBook(4)}>4</button>
            <button className="button-rating" onClick={() => onRateBook(5)}>5</button>
          </div>
        </div>
        <div className="card-info-bottom">
          <button className="button-primary" onClick={() => onMarkAsNotRead()}>Un-read</button>
          <button className="button-primary" onClick={() => onDeleteBook()}>Remove</button>
        </div>
      </div>
    </div >
  )
}