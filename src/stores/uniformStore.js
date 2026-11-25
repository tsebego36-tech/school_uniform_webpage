import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    categories: [
      { id: 1, name: 'Blazers & Formal', bg: 'bg-[#E28D97]', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80', count: '12 Items' },
      { id: 2, name: 'Skirts & Pinafores', bg: 'bg-[#45B2C3]', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', count: '18 Items' },
      { id: 3, name: 'Shirts & Polos', bg: 'bg-[#45B2C3]', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&q=80', count: '24 Items' },
      { id: 4, name: 'Sports & PE Kits', bg: 'bg-[#DF8B96]', image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80', count: '15 Items' }
    ],
    features: [
      { id: 1, title: 'Premium Cotton Blends', desc: 'Breathable, durable fabrics designed for all-day school comfort.', bg: 'bg-[#45B2C3]', icon: '🎒' },
      { id: 2, title: 'Official School Crests', desc: 'High-precision embroidery matching exact school guidelines.', bg: 'bg-[#E28D97]', icon: '✨' },
      { id: 3, title: 'Easy-Care & Stain Resist', desc: 'Machine washable and treated to withstand playground adventures.', bg: 'bg-[#7BC6B9]', icon: '🛡️' }
    ],
    testimonials: [
      { id: 1, name: 'Sarah Jenkins', role: 'Parent of Two', text: 'The uniform quality is incredible! Lasts all year without fading.' },
      { id: 2, name: 'David Miller', role: 'PTA President', text: 'Super fast delivery and exact school colors. Highly recommend.' },
      { id: 3, name: 'Amanda Clarke', role: 'Mom of 3', text: 'Stain-resistant fabric has saved my mornings. Amazing service!' },
      { id: 4, name: 'Liam O’Connor', role: 'Dad', text: 'Easy sizing guide and great customer support. Five stars!' }
    ],
    cart: [],
    isCartOpen: false,
    checkoutSuccess: false,
    activeTestimonial: 0
  }),
  getters: {
    cartTotal(state) {
      return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    cartItemCount(state) {
      return state.cart.reduce((sum, item) => sum + item.quantity, 0)
    }
  },
  actions: {
    addToCart(product) {
      const existing = this.cart.find(i => i.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      this.isCartOpen = true
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
    },
    updateQuantity(index, qty) {
      if (qty <= 0) {
        this.removeFromCart(index)
      } else {
        this.cart[index].quantity = qty
      }
    },
    clearCart() {
      this.cart = []
    },
    nextTestimonial() {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length
    },
    prevTestimonial() {
      this.activeTestimonial = (this.activeTestimonial - 1 + this.testimonials.length) % this.testimonials.length
    }
  }
})
