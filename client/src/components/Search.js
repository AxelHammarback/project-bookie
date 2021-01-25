import React, { useEffect, useState } from 'react'

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
          onChange={event => setSearchQuery(event.target.value)}
        />
        <button>Search</button>
      </form>
      {
        searchResults.map(book => (
          <p>{book.volumeInfo.title}</p>
        ))
      }
    </div>
  )
}