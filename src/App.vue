<script setup>
import { ref } from 'vue'
import { useUniformStore } from './stores/uniformStore'

const store = useUniformStore()

const selectedSize = ref({})
const isCartOpen = ref(false)
const checkoutSuccess = ref(false)

const handleAddToCart = (item) => {
  const size = selectedSize.value[item.id] || item.sizes[0]
  store.addToCart(item, size)
  isCartOpen.value = true
}

const handleCheckout = () => {
  checkoutSuccess.value = true
  store.clearCart()
  setTimeout(() => {
    checkoutSuccess.value = false
    isCartOpen.value = false
  }, 4000)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans w-full">
    <!-- Header -->
    <header class="bg-indigo-700 text-white shadow-md sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-3 cursor-pointer" @click="store.selectedSupplierId = null">
          <span class="text-3xl">🎓</span>
          <div>
            <h1 class="text-xl font-bold tracking-tight">CampusThreads</h1>
            <p class="text-xs text-indigo-200">School Uniform Marketplace</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button 
            @click="isCartOpen = true"
            class="relative bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition shadow-sm border border-indigo-500"
          >
            <span>🛒 Cart</span>
            <span v-if="store.cartItemCount > 0" class="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow">
              {{ store.cartItemCount }}
            </span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      
      <!-- Supplier Listing View -->
      <div v-if="!store.selectedSupplier">
        <div class="mb-8 text-center max-w-2xl mx-auto">
          <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Verified School Uniform Suppliers</h2>
          <p class="text-slate-600">Select an official supplier partner below to browse and order uniform bundles, blazers, sports kits, and everyday wear.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="supplier in store.suppliers" 
            :key="supplier.id"
            class="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-slate-100 flex flex-col group cursor-pointer"
            @click="store.selectSupplier(supplier.id)"
          >
            <div class="h-48 overflow-hidden relative">
              <img :src="supplier.image" :alt="supplier.name" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow">
                ⭐ {{ supplier.rating }}
              </div>
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">{{ supplier.location }}</span>
              <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition">{{ supplier.name }}</h3>
              <p class="text-sm text-slate-500 mb-6 flex items-center">
                <span class="mr-1.5">🚚</span> {{ supplier.deliveryTime }}
              </p>
              <div class="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-sm font-medium text-slate-600">{{ supplier.items.length }} Items Available</span>
                <span class="text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition flex items-center">
                  Shop Store &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Supplier Catalog View -->
      <div v-else>
        <div class="mb-6 flex items-center justify-between flex-wrap gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div class="flex items-center space-x-4">
            <button 
              @click="store.selectedSupplierId = null"
              class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm transition"
            >
              &larr; Back to Suppliers
            </button>
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Active Supplier</span>
              <h2 class="text-2xl font-bold text-slate-900">{{ store.selectedSupplier.name }}</h2>
            </div>
          </div>
          <div class="flex items-center space-x-2 text-sm text-slate-600">
            <span>📍 {{ store.selectedSupplier.location }}</span>
            <span>•</span>
            <span>⭐ {{ store.selectedSupplier.rating }} Rating</span>
          </div>
        </div>

        <!-- Filters & Search -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div class="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button 
              v-for="cat in ['All', 'Blazers', 'Skirts', 'Shirts', 'Accessories', 'Knitwear', 'Trousers', 'Sports', 'Outerwear', 'Dresses']"
              :key="cat"
              @click="store.selectedCategory = cat"
              :class="store.selectedCategory === cat ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'"
              class="px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
            >
              {{ cat }}
            </button>
          </div>

          <div class="w-full md:w-72">
            <input 
              type="text" 
              v-model="store.searchQuery"
              placeholder="Search items in store..." 
              class="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>
        </div>

        <!-- Catalog Grid -->
        <div v-if="store.filteredItems.length === 0" class="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p class="text-lg text-slate-500 mb-2">No uniform items found matching your filters.</p>
          <button @click="store.searchQuery = ''; store.selectedCategory = 'All'" class="text-indigo-600 font-semibold hover:underline">Reset Filters</button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="item in store.filteredItems" 
            :key="item.id"
            class="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100 p-5 flex flex-col"
          >
            <div class="flex justify-between items-start mb-3">
              <span class="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-md">{{ item.category }}</span>
              <span class="text-lg font-extrabold text-slate-900">${{ item.price.toFixed(2) }}</span>
            </div>

            <h3 class="font-bold text-slate-800 text-lg mb-4">{{ item.name }}</h3>

            <div class="mt-auto space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Select Size:</label>
                <select 
                  v-model="selectedSize[item.id]" 
                  class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option v-for="size in item.sizes" :key="size" :value="size">{{ size }}</option>
                </select>
              </div>

              <button 
                @click="handleAddToCart(item)"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-sm flex items-center justify-center space-x-2"
              >
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </main>

    <!-- Cart Sidebar Drawer -->
    <div v-if="isCartOpen" class="fixed inset-0 z-50 overflow-hidden">
      <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" @click="isCartOpen = false"></div>

      <div class="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          <!-- Cart Header -->
          <div class="p-6 bg-indigo-700 text-white flex items-center justify-between">
            <h3 class="text-lg font-bold">Your Uniform Order Cart</h3>
            <button @click="isCartOpen = false" class="text-indigo-200 hover:text-white text-xl font-bold">&times;</button>
          </div>

          <!-- Success Alert -->
          <div v-if="checkoutSuccess" class="m-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center">
            <p class="font-bold text-lg mb-1">🎉 Order Placed Successfully!</p>
            <p class="text-sm text-emerald-600">Thank you for shopping with CampusThreads. Confirmation sent to your email.</p>
          </div>

          <!-- Cart Body -->
          <div v-else class="flex-1 overflow-y-auto p-6 space-y-4">
            <div v-if="store.cart.length === 0" class="text-center py-16 text-slate-400">
              <p class="text-4xl mb-3">🛒</p>
              <p class="font-medium text-slate-600">Your cart is currently empty</p>
              <p class="text-xs text-slate-400 mt-1">Add items from any supplier to get started.</p>
            </div>

            <div v-else class="space-y-4">
              <div v-for="(cartItem, idx) in store.cart" :key="idx" class="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col space-y-2">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-bold text-slate-900">{{ cartItem.name }}</h4>
                    <p class="text-xs text-indigo-600 font-medium">Supplier: {{ cartItem.supplierName }}</p>
                  </div>
                  <button @click="store.removeFromCart(idx)" class="text-slate-400 hover:text-rose-500 text-sm font-bold">&times;</button>
                </div>

                <div class="flex justify-between items-center pt-2 border-t border-slate-200/60 text-sm">
                  <span class="text-slate-600">Size: <strong class="text-slate-800">{{ cartItem.size }}</strong></span>
                  <span class="font-bold text-slate-900">${{ (cartItem.price * cartItem.quantity).toFixed(2) }}</span>
                </div>

                <div class="flex justify-between items-center pt-1">
                  <div class="flex items-center space-x-2">
                    <button @click="store.updateQuantity(idx, cartItem.quantity - 1)" class="w-7 h-7 bg-white border border-slate-200 rounded flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">-</button>
                    <span class="text-sm font-semibold w-6 text-center">{{ cartItem.quantity }}</span>
                    <button @click="store.updateQuantity(idx, cartItem.quantity + 1)" class="w-7 h-7 bg-white border border-slate-200 rounded flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">+</button>
                  </div>
                  <span class="text-xs text-slate-400">${{ cartItem.price.toFixed(2) }} each</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart Footer -->
          <div v-if="!checkoutSuccess && store.cart.length > 0" class="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
            <div class="flex justify-between items-center text-lg">
              <span class="font-semibold text-slate-600">Total Amount:</span>
              <span class="font-extrabold text-slate-900">${{ store.cartTotal.toFixed(2) }}</span>
            </div>

            <button 
              @click="handleCheckout"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow transition flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
