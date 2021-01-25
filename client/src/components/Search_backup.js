import React, { useEffect, useState } from 'react'

export const Search = () => {
  const SEARCH_URL = `https://www.googleapis.com/books/v1/volumes?q="Knausgård"`
  const [searchResults, setSearchResults] = useState([])

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    handleSearch()
  }, [])

  // const handleSubmit = e => {
  //   // e.preventDefault()
  //   fetch(`https://www.googleapis.com/books/v1/volumes?q="${searchQuery}"`)
  //   .then(res => {
  //     return res.json()
  //   })
  //   .then(books => {
  //     // console.log(books)
  //     setSearchResults(books.items)
  //   })
  // }

  const handleSearchQueryUpdate = event => {
    setSearchQuery(event.target.value)
  }

  // const handleSearch = () => {
  //   handleSubmit()
  // }

  // const submitSearch = () => {
  //   console.log("Hej")
  //   fetch(SEARCH_URL)
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(books => {
  //       // console.log(books)
  //       setSearchResults(books.items)
  //     })
  // }

  return (
    <div className="debug grow">
      <p>Search</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a book or an author"
          value={searchQuery}
          onChange={handleSearchQueryUpdate}
        />
        <button type="button">Search</button>
      </form>
      {
        searchResults.map(book => (
          <p>{book.volumeInfo.title}</p>
        ))
        // console.log(searchResults)
      }
    </div>
  )
}