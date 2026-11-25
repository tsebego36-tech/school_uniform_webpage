<script setup>
import { useStore } from './stores/uniformStore'

const store = useStore()

const sampleProducts = [
  { id: 101, name: 'Classic Academy Blazer', price: 45.00, category: 'Blazers & Formal', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80' },
  { id: 102, name: 'Pleated School Skirt', price: 28.50, category: 'Skirts & Pinafores', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80' },
  { id: 103, name: 'Oxford White Shirt (2-Pack)', price: 22.00, category: 'Shirts & Polos', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&q=80' },
  { id: 104, name: 'Complete PE Sports Bundle', price: 40.00, category: 'Sports & PE Kits', image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80' }
]

const handleCheckout = () => {
  store.checkoutSuccess = true
  store.clearCart()
  setTimeout(() => {
    store.checkoutSuccess = false
    store.isCartOpen = false
  }, 4000)
}
</script>

<template>
  <div class="min-h-screen bg-white text-[#555555] font-sans selection:bg-[#FCDA00] selection:text-[#00518E]">
    
    <!-- A. Header & Navigation -->
    <header class="w-full sticky top-0 z-40 shadow-sm">
      <!-- Top Utility Bar -->
      <div class="bg-[#00518E] px-[5%] py-3 flex justify-between items-center text-white">
        <div class="flex items-center space-x-3 cursor-pointer" @click="window.scrollTo({top: 0, behavior: 'smooth'})">
          <span class="text-2xl bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm">🎓</span>
          <h1 class="text-xl font-extrabold tracking-tight text-white">Katlehong School Suppliers</h1>
        </div>
        <div class="hidden md:flex items-center space-x-4 text-sm font-medium">
          <span class="bg-white/10 px-3 py-1 rounded-full text-xs text-white">🌟 Free Express Delivery on Orders Over $50</span>
          <span>📞 Support: 1-800-KIDS-UNIFORM</span>
        </div>
        <button @click="store.isCartOpen = true" class="relative bg-[#DF0615] hover:bg-[#c40512] text-white px-5 py-2 rounded-full font-bold text-sm transition shadow-sm flex items-center space-x-2">
          <span>🛒 Cart</span>
          <span v-if="store.cartItemCount > 0" class="absolute -top-1 -right-1 bg-[#FCDA00] text-[#00518E] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {{ store.cartItemCount }}
          </span>
        </button>
      </div>

      <!-- Sub-Navigation Bar -->
      <div class="bg-white px-[5%] py-3 border-b border-[#EEEEEE] flex justify-between items-center">
        <span class="bg-[#FCDA00] text-[#1A1A1A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
          Official Suppliers
        </span>
        <nav class="hidden lg:flex items-center space-x-6 text-sm font-semibold text-[#1A1A1A]">
          <a href="#categories" class="hover:text-[#00518E] transition">Categories</a>
          <a href="#products" class="hover:text-[#00518E] transition">Featured Uniforms</a>
          <a href="#sale" class="hover:text-[#00518E] transition">Seasonal Sale</a>
          <a href="#reviews" class="hover:text-[#00518E] transition">Reviews</a>
        </nav>
        <span class="bg-[#DF0615] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
          ✨ Up to 50% Off
        </span>
      </div>
    </header>

    <!-- B. Hero Section -->
    <section class="relative bg-[#E6F0F7] py-16 md:py-24 px-[5%] overflow-hidden text-center">
      <div class="absolute -top-10 left-10 text-4xl animate-bounce text-[#DF0615]">🎈</div>
      <div class="absolute top-10 right-20 text-4xl animate-pulse text-[#FCDA00]">⭐</div>
      <div class="absolute bottom-5 left-1/4 text-3xl text-[#009B55]">🌿</div>

      <div class="max-w-2xl mx-auto relative z-10">
        <span class="bg-white text-[#00518E] font-bold text-xs uppercase px-4 py-1.5 rounded-full tracking-widest inline-block mb-4 shadow-sm border border-[#00518E]/10">
          New Term Collection 2026/2027
        </span>
        <h2 class="text-4xl md:text-5xl font-extrabold text-[#00518E] tracking-tight mb-4 drop-shadow-sm">
          Joy for Every Little One!
        </h2>
        <p class="text-[#555555] text-base md:text-lg mb-8 max-w-[500px] mx-auto font-medium">
          Equipping students with premium, comfortable school uniforms, blazers, and sports kits crafted for all-day confidence.
        </p>
        <div class="flex justify-center items-center space-x-4 flex-wrap gap-y-3">
          <a href="#products" class="bg-[#DF0615] hover:bg-[#c40512] text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition transform hover:-translate-y-0.5">
            Shop Uniforms
          </a>
          <a href="#sale" class="bg-[#FCDA00] hover:bg-[#e2c200] text-[#00518E] font-bold px-8 py-3.5 rounded-full shadow-lg transition transform hover:-translate-y-0.5">
            View Sale
          </a>
        </div>
      </div>
    </section>

    <!-- C. Body: Category & Promo Grids -->
    <div id="categories" class="max-w-[1200px] mx-auto px-6 py-12">
      
      <!-- Row 1 (4-Column Category Grid) -->
      <div class="mb-12">
        <div class="text-center mb-10">
          <h3 class="text-2xl md:text-3xl font-extrabold text-[#1A1A1A]">Shop by Category</h3>
          <p class="text-sm text-[#555555] mt-1">Explore our certified school apparel ranges</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div 
            v-for="(cat, idx) in [
              { id: 1, name: 'Blazers & Formal', bg: 'bg-[#DF0615]', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80', count: '12 Items' },
              { id: 2, name: 'Skirts & Pinafores', bg: 'bg-[#00518E]', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', count: '18 Items' },
              { id: 3, name: 'Shirts & Polos', bg: 'bg-[#00518E]', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&q=80', count: '24 Items' },
              { id: 4, name: 'Sports & PE Kits', bg: 'bg-[#DF0615]', image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80', count: '15 Items' }
            ]" 
            :key="cat.id"
            :class="cat.bg"
            class="rounded-2xl overflow-hidden aspect-[4/5] relative flex flex-col justify-between p-6 shadow-md hover:shadow-xl transition group cursor-pointer"
          >
            <div class="relative z-10">
              <span class="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">{{ cat.count }}</span>
              <h4 class="text-xl font-extrabold text-white mt-2">{{ cat.name }}</h4>
            </div>
            <div class="absolute inset-0 z-0 opacity-40 group-hover:scale-105 transition duration-500">
              <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover" />
            </div>
            <div class="relative z-10 pt-4">
              <span class="bg-white text-[#1A1A1A] text-xs font-bold px-4 py-2 rounded-full shadow inline-flex items-center group-hover:bg-[#FCDA00] transition">
                Explore &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Divider CTA -->
      <div class="my-16 text-center">
        <a href="#products" class="bg-[#FCDA00] hover:bg-[#e2c200] text-[#00518E] font-extrabold px-10 py-4 rounded-full shadow-md transition inline-block text-lg">
          Shop Now 💛
        </a>
        <p class="text-xs text-[#555555] mt-2 font-medium">✨ Guaranteed perfect fit with easy 30-day exchanges</p>
      </div>

      <!-- Row 2 (3-Column Feature Grid) -->
      <div id="products" class="mb-16">
        <div class="text-center mb-10">
          <h3 class="text-2xl md:text-3xl font-extrabold text-[#1A1A1A]">Featured School Uniforms</h3>
          <p class="text-sm text-[#555555] mt-1">Top-rated quality essentials ready to order</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="item in sampleProducts" :key="item.id" class="bg-[#F8F9FA] rounded-2xl p-5 border border-[#EEEEEE] shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div class="h-48 rounded-xl overflow-hidden mb-4 relative">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                <span class="absolute top-2 right-2 bg-white/90 text-[#1A1A1A] font-bold text-xs px-2.5 py-1 rounded-full shadow">${{ item.price.toFixed(2) }}</span>
              </div>
              <span class="text-xs font-bold text-[#00518E] uppercase tracking-wider">{{ item.category }}</span>
              <h4 class="font-bold text-[#1A1A1A] text-lg mt-1 mb-3">{{ item.name }}</h4>
            </div>
            <button @click="store.addToCart(item)" class="w-full bg-[#00518E] hover:bg-[#003f72] text-white font-bold py-2.5 rounded-full text-sm transition shadow-sm">
              Add to Cart 🎒
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- D. Full-Width Promotional Banner -->
    <div id="sale" class="w-full grid grid-cols-1 lg:grid-cols-12 my-12 shadow-inner">
      <div class="lg:col-span-7 bg-[#00518E] p-10 md:p-16 flex flex-col justify-center items-start text-white">
        <span class="bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">Limited Time Event</span>
        <h3 class="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Seasonal Sale – Up to 50% Off</h3>
        <p class="text-white/80 text-base mb-6 max-w-lg font-medium">Stock up on premium quality blazers, shirts, skirts, and knitwear ahead of the new school term with massive seasonal discounts.</p>
        <button @click="window.scrollTo({top: 600, behavior: 'smooth'})" class="bg-[#DF0615] hover:bg-[#c40512] text-white font-bold px-8 py-3.5 rounded-full shadow transition">
          Shop Sale Items
        </button>
      </div>
      <div class="lg:col-span-5 bg-[#DF0615] p-10 md:p-16 flex items-center justify-between relative overflow-hidden text-white">
        <div class="relative z-10">
          <span class="text-4xl font-extrabold block mb-2">50% OFF</span>
          <p class="text-sm font-semibold max-w-[200px]">On all secondary school bundles and sports kits.</p>
        </div>
        <div class="relative z-10 bg-[#FCDA00] hover:bg-[#e2c200] text-[#00518E] w-24 h-24 rounded-full flex items-center justify-center font-extrabold text-xs tracking-wider shadow-lg cursor-pointer transform hover:scale-105 transition text-center p-2" @click="window.scrollTo({top: 600, behavior: 'smooth'})">
          SHOP NOW
        </div>
      </div>
    </div>

    <!-- E. Testimonials Carousel -->
    <div id="reviews" class="bg-white py-12 px-[5%] border-t border-[#EEEEEE]">
      <div class="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h3 class="text-2xl font-extrabold text-[#1A1A1A]">Loved by Parents & Schools</h3>
          <p class="text-sm text-[#555555]">Read what our community has to say</p>
        </div>
        <div class="flex space-x-2">
          <button @click="store.prevTestimonial()" class="w-10 h-10 rounded-full bg-[#F8F9FA] border border-[#EEEEEE] flex items-center justify-center font-bold text-[#1A1A1A] hover:bg-[#FCDA00] transition">&larr;</button>
          <button @click="store.nextTestimonial()" class="w-10 h-10 rounded-full bg-[#F8F9FA] border border-[#EEEEEE] flex items-center justify-center font-bold text-[#1A1A1A] hover:bg-[#FCDA00] transition">&rarr;</button>
        </div>
      </div>

      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(t, idx) in store.testimonials" :key="t.id" :class="idx === store.activeTestimonial ? 'border-[#00518E] ring-2 ring-[#00518E]/20' : 'border-[#EEEEEE]'" class="bg-[#F8F9FA] border rounded-2xl p-5 flex items-center space-x-4 shadow-sm transition">
          <div class="w-12 h-12 bg-[#00518E] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">
            {{ t.name.charAt(0) }}
          </div>
          <div>
            <h4 class="font-bold text-sm text-[#1A1A1A]">{{ t.name }}</h4>
            <p class="text-xs text-[#00518E] font-semibold mb-1">{{ t.role }}</p>
            <p class="text-xs text-[#555555] line-clamp-2">"{{ t.text }}"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- F. Footer -->
    <footer class="bg-[#00518E] text-white px-[5%] py-16">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 items-start">
        <div>
          <span class="text-xl mb-4 block">🎒</span>
          <h5 class="font-bold text-sm mb-3 uppercase tracking-wider text-white">Categories</h5>
          <ul class="space-y-2 text-xs font-medium text-white/80">
            <li><a href="#categories" class="hover:underline">Blazers & Formal</a></li>
            <li><a href="#categories" class="hover:underline">Skirts & Pinafores</a></li>
            <li><a href="#categories" class="hover:underline">Shirts & Polos</a></li>
            <li><a href="#categories" class="hover:underline">Sports & PE Kits</a></li>
          </ul>
        </div>
        <div>
          <span class="text-xl mb-4 block">🛡️</span>
          <h5 class="font-bold text-sm mb-3 uppercase tracking-wider text-white">Customer Care</h5>
          <ul class="space-y-2 text-xs font-medium text-white/80">
            <li><a href="#" class="hover:underline">Size Guide</a></li>
            <li><a href="#" class="hover:underline">Delivery & Returns</a></li>
            <li><a href="#" class="hover:underline">Track Your Order</a></li>
            <li><a href="#" class="hover:underline">FAQs</a></li>
          </ul>
        </div>
        <div>
          <span class="text-xl mb-4 block">🏫</span>
          <h5 class="font-bold text-sm mb-3 uppercase tracking-wider text-white">School Partners</h5>
          <ul class="space-y-2 text-xs font-medium text-white/80">
            <li><a href="#" class="hover:underline">Academy Directory</a></li>
            <li><a href="#" class="hover:underline">Wholesale & PTAs</a></li>
            <li><a href="#" class="hover:underline">Apply as Supplier</a></li>
          </ul>
        </div>
        <div>
          <span class="text-xl mb-4 block">✨</span>
          <h5 class="font-bold text-sm mb-3 uppercase tracking-wider text-white">Company</h5>
          <ul class="space-y-2 text-xs font-medium text-white/80">
            <li><a href="#" class="hover:underline">About Us</a></li>
            <li><a href="#" class="hover:underline">Sustainability</a></li>
            <li><a href="#" class="hover:underline">Contact Support</a></li>
          </ul>
        </div>
        <div class="col-span-2 md:col-span-1 flex md:justify-end items-center space-x-3 pt-4 md:pt-0">
          <div class="w-10 h-10 rounded-full bg-[#DF0615] text-white flex items-center justify-center font-bold shadow cursor-pointer hover:opacity-90">f</div>
          <div class="w-10 h-10 rounded-full bg-[#FCDA00] text-[#00518E] flex items-center justify-center font-bold shadow cursor-pointer hover:opacity-90">ig</div>
          <div class="w-10 h-10 rounded-full bg-[#009B55] text-white flex items-center justify-center font-bold shadow cursor-pointer hover:opacity-90">in</div>
        </div>
      </div>
    </footer>

    <!-- Cart Sidebar Drawer -->
    <div v-if="store.isCartOpen" class="fixed inset-0 z-50 overflow-hidden">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="store.isCartOpen = false"></div>
      <div class="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div class="p-6 bg-[#00518E] text-white flex items-center justify-between">
            <h3 class="text-lg font-bold">Your Uniform Cart</h3>
            <button @click="store.isCartOpen = false" class="text-white hover:text-gray-200 text-2xl font-bold">&times;</button>
          </div>

          <div v-if="store.checkoutSuccess" class="m-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center">
            <p class="font-bold text-lg mb-1">🎉 Order Placed Successfully!</p>
            <p class="text-xs text-emerald-600">Thank you for ordering with Katlehong School Suppliers. Your confirmation has been emailed.</p>
          </div>

          <div v-else class="flex-1 overflow-y-auto p-6 space-y-4">
            <div v-if="store.cart.length === 0" class="text-center py-16 text-gray-400">
              <p class="text-4xl mb-3">🛒</p>
              <p class="font-medium text-gray-600">Your cart is empty</p>
            </div>
            <div v-else class="space-y-4">
              <div v-for="(item, idx) in store.cart" :key="idx" class="bg-[#F8F9FA] border border-gray-100 rounded-xl p-4 flex flex-col space-y-2">
                <div class="flex justify-between items-start">
                  <h4 class="font-bold text-[#1A1A1A]">{{ item.name }}</h4>
                  <button @click="store.removeFromCart(idx)" class="text-gray-400 hover:text-rose-500 font-bold">&times;</button>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-500">${{ item.price.toFixed(2) }} each</span>
                  <span class="font-bold text-[#1A1A1A]">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
                <div class="flex items-center space-x-2 pt-1">
                  <button @click="store.updateQuantity(idx, item.quantity - 1)" class="w-7 h-7 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-gray-700">-</button>
                  <span class="text-sm font-semibold w-6 text-center">{{ item.quantity }}</span>
                  <button @click="store.updateQuantity(idx, item.quantity + 1)" class="w-7 h-7 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-gray-700">+</button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!store.checkoutSuccess && store.cart.length > 0" class="p-6 bg-[#F8F9FA] border-t border-gray-100 space-y-4">
            <div class="flex justify-between items-center text-lg">
              <span class="font-semibold text-gray-600">Total:</span>
              <span class="font-extrabold text-[#1A1A1A]">${{ store.cartTotal.toFixed(2) }}</span>
            </div>
            <button @click="handleCheckout" class="w-full bg-[#DF0615] hover:bg-[#c40512] text-white font-bold py-3.5 rounded-full shadow transition">
              Proceed to Checkout 🎒
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
