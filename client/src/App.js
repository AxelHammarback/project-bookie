import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { Nav } from './components/Nav'
import { WantToRead } from './components/WantToRead'
import { HasRead } from './components/HasRead'
import { Search } from './components/Search'
import 'index.css'
import './components/button.css'

export const App = () => {
  const BOOKS_POST_URL = 'http://localhost:8080/books'

  // const addBook = (book) => {
  //   const bookObject = {
  //     title: book.title,
  //     author: book.author,
  //     thumbnail: book.thumbnail,
  //     googleId: book.googleId,
  //     rating: null
  //   }

  //   fetch(BOOKS_POST_URL, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(bookObject)
  //   })
  //     .then(() => {
  //       console.log(bookObject.thumbnail)
  //       // When the message is done being posted, fetch the messages again, so the new post is visible.
  //       console.log(`Book ${bookObject.title} added`)
  //     })
  // }


  return (
    <>
      <BrowserRouter>
        <main>
          <div className="page-content">
          {/* <Header /> */}
            <Switch>

              <Route path="/" exact>
                <WantToRead />
              </Route>

              <Route path="/hasread">
                <HasRead />
              </Route>

              <Route path="/search">
                <Search />
              </Route>

            </Switch>
          </div>
          <Nav />
        </main>
      </BrowserRouter>
    </>
  )
}
