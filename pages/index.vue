<template>
  <header class="flex flex-row w-full items-center p-4 bg-white shadow">
    <div class="basis-1/4 flex items-center gap-3">
      <!-- Положите arizonalogo.png в папку public/ -->
      <img src="/assets/images/cot.png" alt="logo" class="w-16 h-16"/>
      <span class="font-bold text-xl">MyLab</span>
    </div>

    <div class="basis-1/4"></div>

    <nav class="basis-1/2 flex justify-end gap-4">
      <NuxtLink to="/" class="p-2 rounded hover:bg-gray-200">Home</NuxtLink>
      <NuxtLink to="/Lab3" class="p-2 rounded hover:bg-gray-200">Lab3</NuxtLink>
      <NuxtLink to="#" class="p-2 rounded hover:bg-gray-200">LogIn</NuxtLink>
      <NuxtLink to="#" class="p-2 rounded hover:bg-gray-200">LogOut</NuxtLink>
    </nav>
  </header>

  <main class="p-8">
    <h1 class="text-2xl font-semibold">Welcome to Lab 1</h1>
    <p class="mt-4">Здесь добавьте содержимое вашей лабораторной работы.</p>
  </main>
</template>
