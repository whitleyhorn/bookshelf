import {Dialog} from './lib'
import * as React from 'react'

const ModalContext = React.createContext()
ModalContext.displayName = 'ModalContext'

function Modal({children}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ModalContext.Provider value={{isOpen, setIsOpen}}>
      {children}
    </ModalContext.Provider>
  )
}

function ModalButton({children, isOpenValue}) {
  if (Array.isArray(children))
    throw new Error('Only one button should be passed to <ModalDismissButton/>')
  const {setIsOpen} = React.useContext(ModalContext)

  return React.cloneElement(children, {
    onClick: () => setIsOpen(isOpenValue),
  })
}

function ModalDismissButton({children}) {
  return <ModalButton children={children} isOpenValue={false} />
}

function ModalOpenButton({children}) {
  return <ModalButton children={children} isOpenValue={true} />
}

function ModalContents(props) {
  const {isOpen, setIsOpen} = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props}>
      {props.children}
    </Dialog>
  )
}

export {Modal, ModalDismissButton, ModalOpenButton, ModalContents}
