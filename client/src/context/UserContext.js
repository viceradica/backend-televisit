import { useState, createContext } from 'react'

const UserContext = createContext()

export function UserProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [token, setToken] = useState(null)
  const [roleId, setRoleId] = useState(null)
  const [role, setRole] = useState(null)

  const setUserObject = (user, username, token, roleId, role) => {
    setUser(user)
    setUsername(username)
    setToken(token)
    setRoleId(roleId)
    setRole(role)
  }
  return (
    <UserContext.Provider value={{ user, username, token, roleId, role, setUserObject }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
