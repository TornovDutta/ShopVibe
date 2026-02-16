import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const { user, logout, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [saved, setSaved] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (name.trim()) {
      updateProfile({ name: name.trim() })
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="bg-light min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">My Account</h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-[#16213e] p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-white">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-300 text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary">Profile Information</h3>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="text-sm text-accent font-medium hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>

              {saved && (
                <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">
                  ✓ Profile updated successfully
                </div>
              )}

              {editing ? (
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 text-muted"
                    />
                    <p className="text-xs text-muted mt-1">Email cannot be changed</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl text-sm transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEditing(false); setName(user.name) }}
                      className="px-6 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-muted mb-1">Full Name</p>
                    <p className="text-sm font-medium text-primary">{user.name}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-muted mb-1">Email</p>
                    <p className="text-sm font-medium text-primary">{user.email}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Quick Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  to="/products"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🛍️</span>
                  <div>
                    <p className="text-sm font-medium text-primary">Shop</p>
                    <p className="text-xs text-muted">Browse products</p>
                  </div>
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🛒</span>
                  <div>
                    <p className="text-sm font-medium text-primary">Cart</p>
                    <p className="text-xs text-muted">View your cart</p>
                  </div>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🏠</span>
                  <div>
                    <p className="text-sm font-medium text-primary">Home</p>
                    <p className="text-xs text-muted">Back to home</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="border-t pt-6">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-2.5 border border-red-200 text-red-600 font-medium rounded-xl text-sm hover:bg-red-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
