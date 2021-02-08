import React from 'react'

import Rating from '@material-ui/lab/Rating';

import './card.css'

export const BookCardHasRead = (props) => {
  const [value, setValue] = React.useState(2);

  const onDeleteBook = () => {
    props.onDeleteBook(props._id)
  }

  const onMarkAsNotRead = () => {
    props.onMarkAsNotRead(props._id)
  }

  const onRateBook = (rating) => {
    setValue(rating)
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
          <p>Rating: {props.rating}</p>
          <div id="container-stars">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                onRateBook(newValue);
              }}
            />
            {/* <button className="button-rating" onClick={() => onRateBook(1)}>1</button>
            <button className="button-rating" onClick={() => onRateBook(2)}>2</button>
            <button className="button-rating" onClick={() => onRateBook(3)}>3</button>
            <button className="button-rating" onClick={() => onRateBook(4)}>4</button>
            <button className="button-rating" onClick={() => onRateBook(5)}>5</button> */}
          </div>

        </div>
        <div className="card-info-bottom">
          <button className="button-primary" onClick={() => onMarkAsNotRead()}>Un-read</button>
          <button className="button-primary" onClick={() => onDeleteBook()}>Remove</button>
        </div>
      </div>
      <div className="card-actions">
        {/* <p>◆</p> */}
      </div>
    </div >
  )
}


// author={book.author}
// title={book.title}
// googleId={book.googleId}
// isRead={book.isRead}
// thumbnail={book.thumbnail}

// author: "Hanna Johansson"
// dateRead: null
// googleId: "q2jvDwAAQBAJ"
// isRead: false
// thumbnail: "http://books.google.com/books/content?id=q2jvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
// title: "Antiken"
// __v: 0
// _id: "600c8a52da9eefdad186ace8"