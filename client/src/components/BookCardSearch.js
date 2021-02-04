import React from 'react'
import './card.css'

export const BookCardSearch = (props) => {

  const BOOKS_POST_URL = 'http://localhost:8080/books'

  const addBook = (book) => {
    const bookObject = {
      title: book.title,
      author: book.author,
      thumbnail: book.thumbnail,
      googleId: book.googleId,
      rating: null
    }

    fetch(BOOKS_POST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookObject)
    })
      .then(() => {
        console.log(bookObject.thumbnail)
        console.log(`Book ${bookObject.title} added`)
      })
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
          <button className="button-primary" onClick={()=> addBook(props)}>Add</button>
        </div>
      </div>
      <div className="card-actions">
        <p>◆</p>
      </div>
    </div >
  )
}