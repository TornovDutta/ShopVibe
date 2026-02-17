import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../context/CartContext'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

const product1 = { id: 1, name: 'Sneakers', price: 89.99 }
const product2 = { id: 2, name: 'Watch', price: 199.99 }

describe('CartContext', () => {
  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.cartItems).toEqual([])
    expect(result.current.cartCount).toBe(0)
    expect(result.current.cartTotal).toBe(0)
  })

  it('adds a product to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(product1))
    expect(result.current.cartItems).toHaveLength(1)
    expect(result.current.cartItems[0]).toMatchObject({ ...product1, quantity: 1 })
  })

  it('increments quantity when adding the same product', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(product1))
    act(() => result.current.addToCart(product1))
    expect(result.current.cartItems).toHaveLength(1)
    expect(result.current.cartItems[0].quantity).toBe(2)
  })

  it('adds a custom quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(product1, 3))
    expect(result.current.cartItems[0].quantity).toBe(3)
  })

  it('removes a product from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(product1))
    act(() => result.current.addToCart(product2))
    act(() => result.current.removeFromCart(product1.id))
    expect(result.current.cartItems).toHaveLength(1)
    expect(result.current.cartItems[0].id).toBe(product2.id)
  })

  it('updates product quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(product1))
    act(() => result.current.updateQuantity(product1.id, 5))
    expect(result.current.cartItems[0].quantity).toBe(5)
  })

  it('removes product when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(product1))
    act(() => result.current.updateQuantity(product1.id, 0))
    expect(result.current.cartItems).toHaveLength(0)
  })

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(product1))
    act(() => result.current.addToCart(product2))
    act(() => result.current.clearCart())
    expect(result.current.cartItems).toEqual([])
    expect(result.current.cartCount).toBe(0)
  })

  it('calculates cart count correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(product1, 2))
    act(() => result.current.addToCart(product2, 3))
    expect(result.current.cartCount).toBe(5)
  })

  it('calculates cart total correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addToCart(product1, 2))
    act(() => result.current.addToCart(product2, 1))
    const expected = product1.price * 2 + product2.price * 1
    expect(result.current.cartTotal).toBeCloseTo(expected)
  })

  it('throws when useCart is used outside CartProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used within a CartProvider'
    )
    console.error.mockRestore()
  })
})
