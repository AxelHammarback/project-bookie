import React, { useState } from 'react'

import { BookCardSearch } from '../components/BookCardSearch'
import { Header } from '../components/Header'
import ic_search_white from '../assets/search-white.svg'
import '../components/searchbar.css'

export const Search = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Function that takes the state variable searchQuery and uses it to search the Google Books API.
  const handleSubmit = (event) => {
    event.preventDefault()

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
    <div>
      <Header
        icon="ic_search"
        title="Search"
      />
      <form onSubmit={handleSubmit}>
        <input
          className="input-search"
          type="text"
          placeholder="Search for a book or an author"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button
          className="button-search"
          disabled={searchQuery < 1}
        >
          <img src={ic_search_white} alt="Search"/>
        </button>
      </form>
      <section className="card-list">
        {
          searchResults.map(book => (
            <BookCardSearch
              // Since some entries had "undefined" as author, we need to check whether the author(s) exist or not.
              author={
                Array.isArray(book.volumeInfo.authors)
                  ? book.volumeInfo.authors[0]
                  : 'Unknown author'
              }
              title={book.volumeInfo.title}
              thumbnail={
                // Since some entries didn't have a thumbnail, we need to check whether the thumbnail exists or not.
                typeof book.volumeInfo.imageLinks !== "undefined"
                  ? book.volumeInfo.imageLinks.thumbnail
                  : "Has no image"
              }
              key={book.id}
            />
          ))
        }
      </section>
    </div>
  )
}