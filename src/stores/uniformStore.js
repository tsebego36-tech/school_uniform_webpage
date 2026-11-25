import { defineStore } from 'pinia'

export const useUniformStore = defineStore('uniform', {
  state: () => ({
    suppliers: [
      {
        id: 1,
        name: 'Classic Academy Outfitters',
        rating: 4.8,
        deliveryTime: '2-3 Business Days',
        location: 'North District',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
        items: [
          { id: 101, name: 'Branded Blazer', price: 45.00, category: 'Blazers', sizes: ['S', 'M', 'L', 'XL'] },
          { id: 102, name: 'Pleated Skirt', price: 28.50, category: 'Skirts', sizes: ['6', '8', '10', '12'] },
          { id: 103, name: 'Oxford White Shirt (2-Pack)', price: 22.00, category: 'Shirts', sizes: ['S', 'M', 'L'] },
          { id: 104, name: 'School Tie', price: 8.50, category: 'Accessories', sizes: ['Standard'] }
        ]
      },
      {
        id: 2,
        name: 'Scholar Uniform Hub',
        rating: 4.6,
        deliveryTime: 'Next Day Delivery Available',
        location: 'Central City',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
        items: [
          { id: 201, name: 'V-Neck Knitted Pullover', price: 25.00, category: 'Knitwear', sizes: ['S', 'M', 'L'] },
          { id: 202, name: 'Smart Trouser', price: 30.00, category: 'Trousers', sizes: ['28', '30', '32', '34'] },
          { id: 203, name: 'Polo Shirt with Logo', price: 15.00, category: 'Shirts', sizes: ['S', 'M', 'L', 'XL'] },
          { id: 204, name: 'Sports PE Kit Bundle', price: 40.00, category: 'Sports', sizes: ['M', 'L'] }
        ]
      },
      {
        id: 3,
        name: 'Prime Campus Gear',
        rating: 4.9,
        deliveryTime: '3-5 Business Days',
        location: 'West Suburbs',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80',
        items: [
          { id: 301, name: 'Waterproof School Coat', price: 55.00, category: 'Outerwear', sizes: ['M', 'L', 'XL'] },
          { id: 302, name: 'Cotton Socks (3-Pack)', price: 9.00, category: 'Accessories', sizes: ['S', 'M', 'L'] },
          { id: 303, name: 'Pleated Pinafore Dress', price: 34.00, category: 'Dresses', sizes: ['6', '8', '10'] },
          { id: 304, name: 'Branded Backpack', price: 29.99, category: 'Accessories', sizes: ['One Size'] }
        ]
      }
    ],
    selectedSupplierId: null,
    cart: [],
    searchQuery: '',
    selectedCategory: 'All'
  }),
  getters: {
    selectedSupplier(state) {
      if (!state.selectedSupplierId) return null
      return state.suppliers.find(s => s.id === state.selectedSupplierId) || null
    },
    filteredItems(state) {
      const supplier = this.selectedSupplier
      if (!supplier) return []
      return supplier.items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        const matchesCategory = state.selectedCategory === 'All' || item.category === state.selectedCategory
        return matchesSearch && matchesCategory
      })
    },
    cartTotal(state) {
      return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    cartItemCount(state) {
      return state.cart.reduce((sum, item) => sum + item.quantity, 0)
    }
  },
  actions: {
    selectSupplier(id) {
      this.selectedSupplierId = id
      this.searchQuery = ''
      this.selectedCategory = 'All'
    },
    addToCart(item, size) {
      const existing = this.cart.find(i => i.id === item.id && i.size === size && i.supplierId === this.selectedSupplierId)
      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({
          ...item,
          size,
          quantity: 1,
          supplierId: this.selectedSupplierId,
          supplierName: this.selectedSupplier.name
        })
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
    },
    updateQuantity(index, quantity) {
      if (quantity <= 0) {
        this.removeFromCart(index)
      } else {
        this.cart[index].quantity = quantity
      }
    },
    clearCart() {
      this.cart = []
    }
  }
})
