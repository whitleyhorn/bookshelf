import '@reach/dialog/styles.css'
import React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import {VisuallyHidden} from '@reach/visually-hidden'

const LoginForm = ({onSubmit, buttonText}) => {
  const handleSubmit = e => {
    e.preventDefault()
    const {username, password} = e.target.elements

    onSubmit({username: username.value, password: password.value})
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" />
      <label htmlFor="password">Password:</label>
      <input type="text" id="password" name="password" />
      <input type="submit" value={buttonText} />
    </form>
  )
}

const LoginDialog = ({isOpen, closeDialog}) => {
  function handleSubmit(formData) {
    console.log('login', formData)
  }
  return (
    <Dialog isOpen={isOpen} onDismiss={closeDialog} aria-label="Login form">
      <button className="close-button" onClick={closeDialog}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </button>
      <LoginForm onSubmit={handleSubmit} buttonText="Login" />
    </Dialog>
  )
}

const RegisterDialog = ({isOpen, closeDialog}) => {
  function handleSubmit(formData) {
    console.log('register', formData)
  }
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
      <LoginForm onSubmit={handleSubmit} buttonText="Register" />
    </Dialog>
  )
}

const App = () => {
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
root.render(<App />)
