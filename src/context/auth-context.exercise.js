import * as React from 'react'

const AuthContext = React.createContext()

const useAuth = () => React.useContext(AuthContext)

export {AuthContext, useAuth}
