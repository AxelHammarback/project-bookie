import React, { useEffect, useState } from 'react'

import { BookCardHasRead } from '../components/BookCardHasRead'
import { Header } from '../components/Header'

export const HasRead = () => {
  const BOOKS_URL = 'https://bookie-axel.herokuapp.com/books/isRead'
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

  const setReadStatusToFalse = (_id) => {
    fetch(`https://bookie-axel.herokuapp.com/books/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead: true }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res =>
        res.json().then(json => {
          fetchBooks()
          return json;
        })
      );
  }

  const deleteBook = (_id) => {
    fetch(`https://bookie-axel.herokuapp.com/books/${_id}`, {
      method: 'DELETE',
    })
      .then(res =>
        res.json().then(json => {
          fetchBooks()
          return json
        })
      )
  }

  const rateBook = (_id, rating) => {
    fetch(`https://bookie-axel.herokuapp.com/books/setRating/${_id}/${rating}`, {
      method: 'PATCH'
    })
      .then(res =>
        res.json().then(json => {
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
        return res.json()
      })
      .then((data) => {
        const filteredBooks = data.filter(book => book.title)
        setBooks(filteredBooks)
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