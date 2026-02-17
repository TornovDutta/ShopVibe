import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../context/AuthContext'

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

beforeEach(() => {
  localStorage.clear()
})

describe('AuthContext', () => {
  it('starts unauthenticated', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('signs up a new user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    let res
    act(() => {
      res = result.current.signup('Alice', 'alice@example.com', 'pass123')
    })
    expect(res.success).toBe(true)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user.name).toBe('Alice')
    expect(result.current.user.email).toBe('alice@example.com')
  })

  it('rejects duplicate email on signup', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.signup('Alice', 'alice@example.com', 'pass123')
    })
    act(() => {
      result.current.logout()
    })
    let res
    act(() => {
      res = result.current.signup('Bob', 'ALICE@example.com', 'other')
    })
    expect(res.success).toBe(false)
    expect(res.error).toMatch(/already exists/i)
  })

  it('logs in with valid credentials', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.signup('Alice', 'alice@example.com', 'pass123')
    })
    act(() => {
      result.current.logout()
    })
    let res
    act(() => {
      res = result.current.login('alice@example.com', 'pass123')
    })
    expect(res.success).toBe(true)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user.name).toBe('Alice')
  })

  it('rejects login with wrong password', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.signup('Alice', 'alice@example.com', 'pass123')
    })
    act(() => {
      result.current.logout()
    })
    let res
    act(() => {
      res = result.current.login('alice@example.com', 'wrong')
    })
    expect(res.success).toBe(false)
    expect(res.error).toMatch(/invalid/i)
  })

  it('logs out the user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.signup('Alice', 'alice@example.com', 'pass123')
    })
    expect(result.current.isAuthenticated).toBe(true)
    act(() => {
      result.current.logout()
    })
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('persists session to localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.signup('Alice', 'alice@example.com', 'pass123')
    })
    const session = JSON.parse(localStorage.getItem('shopvibe_session'))
    expect(session.name).toBe('Alice')
  })

  it('throws when useAuth is used outside AuthProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth must be used within an AuthProvider'
    )
    console.error.mockRestore()
  })
})
