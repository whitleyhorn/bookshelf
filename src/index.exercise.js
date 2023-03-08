import '@reach/dialog/styles.css'
import React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import {VisuallyHidden} from '@reach/visually-hidden'

const LoginDialog = ({isOpen, closeDialog}) => {
  return (
    <Dialog isOpen={isOpen} onDismiss={closeDialog} aria-label="Login form">
      <button className="close-button" onClick={closeDialog}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </button>
      <h3>Login</h3>
    </Dialog>
  )
}

const RegisterDialog = ({isOpen, closeDialog}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={closeDialog}
      aria-label="Registration form"
    >
      <button className="close-button" onClick={closeDialog}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </button>
      <h3>Register</h3>
    </Dialog>
  )
}

const App = ({handleClick}) => {
  const [openDialog, setOpenDialog] = React.useState('none')
  const closeDialog = () => setOpenDialog('none')

  return (
    <div>
      <Logo height="80" width="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenDialog('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenDialog('register')}>Register</button>
      </div>
      <LoginDialog isOpen={openDialog === 'login'} closeDialog={closeDialog} />
      <RegisterDialog
        isOpen={openDialog === 'register'}
        closeDialog={closeDialog}
      />
    </div>
  )
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(<App handleClick={name => alert(`${name} button clicked!`)} />)
