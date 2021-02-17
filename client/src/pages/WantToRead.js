import React, { useEffect, useState } from 'react'

import { BookCardWantToRead } from '../components/BookCardWantToRead'
import { Header } from '../components/Header'

export const WantToRead = () => {
  const BOOKS_URL = 'https://bookie-axel.herokuapp.com/books/wantToRead'
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

  const setReadStatusToTrue = (_id) => {
    fetch(`https://bookie-axel.herokuapp.com/books/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead: false }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res =>
        res.json().then(json => {
          // console.log("Book updated so that the read status is 'true'")
          fetchBooks()
          return json;
        })
      );
  }

  const deleteBook = (_id) => {
    fetch(`https://bookie-axel.herokuapp.com/books/${_id}`, {
      method: 'DELETE'
      // headers: { 'Content-Type': 'application/json' },
    })
      .then(res =>
        res.json().then(json => {
          // console.log("Book deleted successfully")
          fetchBooks()
          return json;
        })
      );
  }

  const fetchBooks = () => {
    // do a fetch to the local database
    fetch(BOOKS_URL)
      .then((res) => {
        // convert the resonse into json format
        return res.json()
      })
      .then((data) => {
        const filteredBooks = data.filter(book => book.title)
        setBooks(filteredBooks)
      })
  }

  return (
    <div className="debug grow">
      <Header
        icon="ic_wantToRead"
        title="Want to read" 
      />
      <section className="card-list">
        {
          books.map(book => (
            <BookCardWantToRead
              _id={book._id}
              author={book.author}
              title={book.title}
              googleId={book.googleId}
              isRead={book.isRead}
              thumbnail={book.thumbnail}
              key={book._id}
              onDeleteBook={deleteBook}
              onMarkAsRead={setReadStatusToTrue}
            />
          ))
        }
      </section>
    </div>
  )
}