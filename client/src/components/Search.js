import React, { useEffect, useState } from 'react'
import { BookCardSearch } from './BookCardSearch'

export const Search = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Function that handles the search.
  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`https://www.googleapis.com/books/v1/volumes?q="${searchQuery}"`)
      .then((response) => response.json())
      .then((books) => {
        setSearchResults(books.items);
        setSearchQuery('');
      })
      .catch(() => {
        console.error();
        setSearchResults('');
      })
  }

  return (
    <div className="debug grow">
      <p>Search</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a book or an author"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
      {
        searchResults.map(book => (
          // console.log(typeof book.volumeInfo.imageLinks.thumbnail),
          <BookCardSearch
            // Since some entries had "undefined" as author, we need to check whether the author(s) exist or not.
            author={
              Array.isArray(book.volumeInfo.authors) 
                ? book.volumeInfo.authors[0]
                : 'Unknown author'
            }
            title={book.volumeInfo.title}
            thumbnail={
              typeof book.volumeInfo.imageLinks !== "undefined"
                ? book.volumeInfo.imageLinks.thumbnail
                : "Has no image"
            }
            key={book.id}
          />
          // <p>{book.volumeInfo.title}</p>
        ))
      }
    </div>
  )
}