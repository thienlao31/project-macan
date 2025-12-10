<template>
  <div class="container mx-auto px-6 py-12 text-white relative">

    <!-- ЦЕНТРАЛЬНОЕ ОКНО УСПЕШНОГО ВЫХОДА -->
    <div 
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             w-full max-w-md z-30"
    >
      <div 
        class="bg-black/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700 
               shadow-[0_0_25px_#22ff55] text-center"
      >

        <h1 class="text-3xl font-bold text-green-400 mb-6 drop-shadow-[0_0_15px_#22ff55]">
          Вы успешно вышли из системы
        </h1>

        <p class="text-gray-300 mb-6">
          Спасибо, что использовали Project Macan.
        </p>

        <NuxtLink 
          to="/" 
          class="px-6 py-3 bg-green-400 text-black font-semibold rounded-lg hover:bg-green-300 transition"
        >
          Вернуться на главную
        </NuxtLink>

      </div>
    </div>

  </div>
</template>

<script setup>
/* Ничего не нужно — просто UI */
</script>
