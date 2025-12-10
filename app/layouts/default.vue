<template>
  <div class="relative min-h-screen text-white">
    <!-- Фон (подставляется по route) -->
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
         :style="{ backgroundImage: `url(${backgroundImage})` }"></div>

    <!-- Затемнение поверх фона -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Контент (все сверху) -->
    <div class="relative z-20 flex flex-col min-h-screen">
      <!-- Header -->
      <header class="z-30">
        <nav class="container mx-auto flex items-center justify-between px-6 py-4 bg-black/30 backdrop-blur-sm">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <img src="/images/logo.png" alt="logo" class="w-10 h-10 object-contain" v-if="false"/>
            <div class="text-2xl font-bold text-green-400">Project Macan</div>
          </div>

          <!-- Desktop menu -->
          <ul class="hidden md:flex items-center gap-6">
          <li><NuxtLink to="/" class="hover:text-green-300 transition">Home</NuxtLink></li>
<li
  class="relative"
  @mouseenter="openLabs"
  @mouseleave="delayedCloseLabs"
>
  <button class="flex items-center gap-2 hover:text-green-300 transition">
    Labs
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <transition name="fade">
    <div
      v-if="labsOpen"
      class="absolute left-0 top-full bg-black/70 backdrop-blur-md border border-gray-700 
             rounded-lg shadow-xl py-2 min-w-[160px] z-50"
      @mouseenter="cancelClose"
      @mouseleave="delayedCloseLabs"
    >
      <NuxtLink to="/lab3" class="block px-4 py-2 hover:bg-gray-800">Lab3</NuxtLink>
      <NuxtLink to="/lab4" class="block px-4 py-2 hover:bg-gray-800">Lab4</NuxtLink>
      <NuxtLink to="/lab5" class="block px-4 py-2 hover:bg-gray-800">Lab5</NuxtLink>
      <NuxtLink to="/lab6" class="block px-4 py-2 hover:bg-gray-800">Lab6</NuxtLink>
    </div>
  </transition>
</li>




            <li><NuxtLink to="/login" class="hover:text-green-300 transition">Login</NuxtLink></li>
            <li><NuxtLink to="/logout" class="hover:text-green-300 transition">Logout</NuxtLink></li>
          </ul>

          <!-- Burger (mobile <=480px) -->
          <div class="md:hidden flex items-center">
            <button @click="toggleBurger" class="p-2 rounded bg-black/30">
              <template v-if="!burger">
                <!-- three lines -->
                <div class="space-y-1">
                  <span class="block w-6 h-0.5 bg-white"></span>
                  <span class="block w-6 h-0.5 bg-white"></span>
                  <span class="block w-6 h-0.5 bg-white"></span>
                </div>
              </template>
              <template v-else>
                <!-- cross -->
                <div class="w-6 h-6 relative">
                  <span class="absolute left-0 top-1/2 w-6 h-0.5 bg-white transform rotate-45"></span>
                  <span class="absolute left-0 top-1/2 w-6 h-0.5 bg-white transform -rotate-45"></span>
                </div>
              </template>
            </button>
          </div>
        </nav>

        <!-- Mobile menu (appears when burger=true and screen <=480px) -->
        <div
          :class="['md:hidden transition-max-h duration-300 overflow-hidden', burger ? 'max-h-[1000px]' : 'max-h-0']"
          class="bg-black/60"
        >
          <div class="px-6 py-4 space-y-2">
            <NuxtLink to="/" class="block py-2 border-b border-gray-700">Home</NuxtLink>

            <!-- Labs parent (mobile) -->
            <div>
              <button @click="toggleLabs" class="w-full text-left py-2 flex justify-between items-center border-b border-gray-700">
                Labs
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Submenu mobile (используем v-show) -->
              <div v-show="labsOpen" class="mt-2 pl-4 space-y-1">
                <NuxtLink to="/lab3" class="block py-2 border-b border-gray-800">Lab3</NuxtLink>
                <NuxtLink to="/lab4" class="block py-2 border-b border-gray-800">Lab4</NuxtLink>
                <NuxtLink to="/lab5" class="block py-2 border-b border-gray-800">Lab5</NuxtLink>
                <NuxtLink to="/lab6" class="block py-2">Lab6</NuxtLink>
              </div>
            </div>

            <NuxtLink to="/login" class="block py-2 border-b border-gray-700">Login</NuxtLink>
            <NuxtLink to="/logout" class="block py-2">Logout</NuxtLink>
          </div>
        </div>
      </header>

      <!-- Main slot -->
      <main class="flex-1 container mx-auto px-6 py-12">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="text-center py-6 text-gray-400">
        © 2025 Project Macan
      </footer>
    </div>
  </div>
</template>

<script setup>
let closeTimeout = null

function openLabs() {
  clearTimeout(closeTimeout)
  labsOpen.value = true
}

function delayedCloseLabs() {
  closeTimeout = setTimeout(() => {
    labsOpen.value = false
  }, 250) // ← ЗАДЕРЖКА 250мс (можно изменить)
}

function cancelClose() {
  clearTimeout(closeTimeout)
}

import { ref, computed } from 'vue'
const route = useRoute()

// Background mapping по пути (подставь свои файлы в /public/images)
const backgrounds = {
  '/': '/images/home.jpg',
  '/lab3': '/images/lab3-bg.jpg',
  '/lab4': '/images/lab4-bg.jpg',
  '/lab5': '/images/lab5-bg.jpg',
  '/lab6': '/images/lab6-bg.jpg',
  '/login': '/images/login.jpg',
  '/logout': '/images/logout-bg.jpg',
}
const backgroundImage = computed(() => backgrounds[route.path] || '/images/default-bg.jpg')

// reactive controls
const burger = ref(false)    // true - меню открыто (mobile)
const labsOpen = ref(false)  // true - submenu открыт

function toggleBurger() {
  burger.value = !burger.value
  // optionally close labs when closing burger
  if (!burger.value) labsOpen.value = false
}
function toggleLabs() {
  labsOpen.value = !labsOpen.value
}
</script>

<style scoped>
/* небольшая плавная смена фона */
div[style] { will-change: background-image; }
</style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}



