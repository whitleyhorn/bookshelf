// 🐨 you'll need to import react and createRoot from react-dom up here
import React from 'react'
import {createRoot} from 'react-dom/client'

// 🐨 you'll also need to import the Logo component from './components/logo'
import {Logo} from './components/logo'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
const App = function ({handleClick}) {
  return (
    <div>
      <Logo height="80" width="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => handleClick('Login')}>Login</button>
      </div>
      <div>
        <button onClick={() => handleClick('Register')}>Register</button>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(<App handleClick={name => alert(`${name} button clicked!`)} />)
