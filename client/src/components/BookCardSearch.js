import React, { useState } from 'react'

import './card.css'

export const BookCardSearch = (props) => {
  const BOOKS_POST_URL = 'https://bookie-axel.herokuapp.com/books'
  const [buttonLabel, setButtonLabel] = useState("Add")
  const [buttonDisabled, setButtonDisabled] = useState(false)

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
        setButtonLabel("Book added")
        setButtonDisabled(true)
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
          <button className="button-primary" disabled={buttonDisabled} onClick={() => addBook(props)}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}