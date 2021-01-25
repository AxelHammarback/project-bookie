import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Nav } from './components/Nav'
import { WantToRead } from './components/WantToRead'
import { HasRead } from './components/HasRead'
import { Search } from './components/Search'
import 'index.css'

export const App = () => {

  return (
    <>
      <BrowserRouter>
        <main>
          <Header />
          <Switch>
            <div className="page-content">

            <Route path="/" exact>
              <WantToRead />
            </Route>

            <Route path="/hasread">
              <HasRead />
            </Route>

            <Route path="/search">
              <Search />
            </Route>
            </div>

          </Switch>
          <Nav />
        </main>
      </BrowserRouter>
    </>
  )
}
