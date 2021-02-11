import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { Nav } from './components/Nav'
import { WantToRead } from './components/WantToRead'
import { HasRead } from './components/HasRead'
import { Search } from './components/Search'
import bookieLogo from './assets/bookie-logo-60px.svg' 

import 'index.css'
import './components/button.css'

export const App = () => {

  return (
    <>
      <img className="bookie-logo-static" src={bookieLogo}/>
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
