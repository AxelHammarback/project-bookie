import React from 'react'
import './card.css'


export const BookCardWantToRead = (props) => {
  const onDeleteBook = () => {
    props.onDeleteBook(props._id)
  }

  const onMarkAsRead = () => {
    props.onMarkAsRead(props._id)
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

        <div className="card-info-bottom">
          <button className="button-primary" onClick={() => onMarkAsRead()}>Read</button>
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