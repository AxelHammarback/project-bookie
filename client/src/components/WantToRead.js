import React, { useEffect, useState } from 'react'
import { BookCardWantToRead } from './BookCardWantToRead'

export const WantToRead = () => {
  const BOOKS_URL = 'http://localhost:8080/books/wantToRead'
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

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
    <div className="debug grow">
      <section className="card-list">
        {
          books.map(book => (
            <BookCardWantToRead
              author={book.author}
              title={book.title}
              googleId={book.googleId}
              isRead={book.isRead}
              thumbnail={book.thumbnail}
              key={book._id}
            />
          ))
        }
      </section>
    </div>
  )
}

// author: "Hanna Johansson"
// dateRead: null
// googleId: "q2jvDwAAQBAJ"
// isRead: false
// thumbnail: "http://books.google.com/books/content?id=q2jvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
// title: "Antiken"
// __v: 0
// _id: "600c8a52da9eefdad186ace8"