import React, { useEffect, useState } from 'react'

import { BookCardHasRead } from '../components/BookCardHasRead'
import { Header } from '../components/Header'

export const HasRead = () => {
  const BOOKS_URL = 'http://localhost:8080/books/isRead'
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

  const setReadStatusToFalse = (_id) => {
    fetch(`http://localhost:8080/books/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead: true }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res =>
        res.json().then(json => {
          console.log("Book updated so that the read status is 'false'")
          fetchBooks()
          return json;
        })
      );
  }

  const deleteBook = (_id) => {
    fetch(`http://localhost:8080/books/${_id}`, {
      method: 'DELETE',
      // headers: { 'Content-Type': 'application/json' },
    })
      .then(res =>
        res.json().then(json => {
          console.log("Book deleted successfully")
          fetchBooks()
          return json
        })
      )
  }

  const rateBook = (_id, rating) => {
    fetch(`http://localhost:8080/books/setRating/${_id}/${rating}`, {
      method: 'PATCH'
    })
      .then(res =>
        res.json().then(json => {
          console.log("Rating edited successfully")
          fetchBooks()
          return json
        })
      )
  }

  const fetchBooks = () => {
    // do a fetch to the local database
    fetch(BOOKS_URL)
      .then((res) => {
        // convert the resonse into json format
        console.log(res)
        return res.json()
      })
      .then((data) => {
        // NEED TO FILTER ON BOOKS WITH THE ISREAD=FALSE FLAG HERE
        const filteredBooks = data.filter(book => book.title)
        setBooks(filteredBooks)
        console.log("filteredBooks")
        console.log(filteredBooks)
      })
  }

  return (

    <div>
      <Header
        icon="ic_isRead"
        title="Books I've read"
      />
      <section className="card-list">
        {
          books.map(book => (
            <BookCardHasRead
              _id={book._id}
              author={book.author}
              title={book.title}
              googleId={book.googleId}
              isRead={book.isRead}
              thumbnail={book.thumbnail}
              rating={book.rating}
              key={book._id}
              onRateBook={rateBook}
              onDeleteBook={deleteBook}
              onMarkAsNotRead={setReadStatusToFalse}
            />
          ))
        }
      </section>
    </div>
  )
}