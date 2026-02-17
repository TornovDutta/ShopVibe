import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import ProtectedRoute from '../components/ProtectedRoute'

beforeEach(() => {
  localStorage.clear()
})

const renderWithRoute = (initialPath, session) => {
  if (session) {
    localStorage.setItem('shopvibe_session', JSON.stringify(session))
  }
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Secret Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}

describe('ProtectedRoute', () => {
  it('redirects to login when not authenticated', () => {
    renderWithRoute('/protected', null)
    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Secret Content')).not.toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    renderWithRoute('/protected', { id: '1', name: 'Alice', email: 'alice@example.com' })
    expect(screen.getByText('Secret Content')).toBeInTheDocument()
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
  })
})
