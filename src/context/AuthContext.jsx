import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const USERS_KEY = 'shopvibe_users'
const SESSION_KEY = 'shopvibe_session'

function getStoredUsers() {
  const data = localStorage.getItem(USERS_KEY)
  return data ? JSON.parse(data) : []
}

function storeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function getStoredSession() {
  const data = localStorage.getItem(SESSION_KEY)
  return data ? JSON.parse(data) : null
}

function storeSession(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredSession())

  useEffect(() => {
    storeSession(user)
  }, [user])

  const signup = (name, email, password) => {
    const users = getStoredUsers()
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return { success: false, error: 'An account with this email already exists' }
    }
    const newUser = {
      id: Date.now().toString(36),
      name,
      email: email.toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    }
    storeUsers([...users, newUser])
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email }
    setUser(sessionUser)
    return { success: true }
  }

  const login = (email, password) => {
    const users = getStoredUsers()
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      return { success: false, error: 'Invalid email or password' }
    }
    const sessionUser = { id: found.id, name: found.name, email: found.email }
    setUser(sessionUser)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (updates) => {
    const users = getStoredUsers()
    const updated = users.map(u =>
      u.id === user.id ? { ...u, ...updates } : u
    )
    storeUsers(updated)
    setUser(prev => ({ ...prev, ...updates }))
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      signup,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
