<template>
  <div class="container mx-auto px-6 py-12 text-white relative">

    <!-- ▬▬▬▬▬▬▬▬ ПРАВАЯ КОЛОНКА ▬▬▬▬▬▬▬▬ -->
<div 
  class="hidden lg:block bg-black/40 border border-gray-700 backdrop-blur-xl 
         p-8 rounded-xl min-h-[500px] w-[360px] ml-auto mt-20 translate-x-60"
>

>

    >
      <h2 class="text-3xl font-bold text-green-400 mb-4">Биография</h2>
      <p class="text-gray-300 leading-relaxed">
       Macan (рус. Мака́н, настоящее имя — Андре́й Кири́ллович Косола́пов, род. 6 января 2002, Москва) — российский рэпер.
      Родился 6 января 2002 года в Москве. В детстве посещал музыкальную школу, однако ему это было неинтересно.
      Впоследствии поступил в Российскую академию народного хозяйства и государственной службы на юриста. В подростковом возрасте начал интересоваться рэпом. Прежде чем начать карьеру, он выпускал треки под псевдонимами MC Гай Фокс, Nemo MC и Young Chaser в социальной сети «ВКонтакте». В это же время он выпустил дебютный альбом — «1000 км до мечты». Исповедует православие. 
      </p>
    </div>

    <!-- ▬▬▬▬▬▬▬▬ ЦЕНТРАЛЬНОЕ ОКНО LOGIN / REGISTER ▬▬▬▬▬▬▬▬ -->
    <div 
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             w-full max-w-md z-30"
    >
      <div 
        class="bg-black/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700 
               shadow-[0_0_25px_#22ff55]"
      >
        
        <!-- Переключатель вкладок -->
        <div class="flex justify-center mb-6 gap-4">
          <button 
            class="px-4 py-2 text-lg font-semibold transition"
            :class="mode === 'login' ? 'text-green-400 underline' : 'text-gray-400'"
            @click="mode = 'login'"
          >
            Login
          </button>

          <button 
            class="px-4 py-2 text-lg font-semibold transition"
            :class="mode === 'register' ? 'text-green-400 underline' : 'text-gray-400'"
            @click="mode = 'register'"
          >
            Register
          </button>
        </div>

        <!-- Сообщение об успехе -->
        <div 
          v-if="successMessage"
          class="mb-4 p-3 bg-green-400 text-black font-bold rounded text-center"
        >
          {{ successMessage }}
        </div>

        <!-- ▬▬▬▬▬▬▬▬ LOGIN ▬▬▬▬▬▬▬▬ -->
        <form 
          v-if="mode === 'login'" 
          @submit.prevent="submitLogin" 
          class="space-y-4"
        >
          <input 
            v-model="loginEmail"
            type="email" 
            placeholder="Email"
            class="w-full p-3 rounded bg-black/40 border border-gray-700 
                   text-white focus:ring-2 focus:ring-green-400"
          />

          <input 
            v-model="loginPassword"
            type="password" 
            placeholder="Пароль"
            class="w-full p-3 rounded bg-black/40 border border-gray-700 
                   text-white focus:ring-2 focus:ring-green-400"
          />

          <button 
            class="w-full py-3 bg-green-400 text-black font-semibold rounded-lg 
                   hover:bg-green-300 transition"
          >
            Войти
          </button>
        </form>

        <!-- ▬▬▬▬▬▬▬▬ REGISTER ▬▬▬▬▬▬▬▬ -->
        <form 
          v-if="mode === 'register'" 
          @submit.prevent="submitRegister" 
          class="space-y-4"
        >
          <input 
            v-model="regEmail"
            type="email" 
            placeholder="Email"
            class="w-full p-3 rounded bg-black/40 border border-gray-700 
                   text-white focus:ring-2 focus:ring-green-400"
          />

          <input 
            v-model="regPassword"
            type="password" 
            placeholder="Пароль"
            class="w-full p-3 rounded bg-black/40 border border-gray-700 
                   text-white focus:ring-2 focus:ring-green-400"
          />

          <input 
            v-model="regConfirm"
            type="password" 
            placeholder="Подтвердите пароль"
            class="w-full p-3 rounded bg-black/40 border border-gray-700 
                   text-white focus:ring-2 focus:ring-green-400"
          />

          <button 
            class="w-full py-3 bg-green-400 text-black font-semibold rounded-lg 
                   hover:bg-green-300 transition"
          >
            Зарегистрироваться
          </button>
        </form>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref("login")

// login data
const loginEmail = ref("")
const loginPassword = ref("")

// register data
const regEmail = ref("")
const regPassword = ref("")
const regConfirm = ref("")

const successMessage = ref("")

function submitLogin() {
  successMessage.value = "Вы успешно вошли!"
}

function submitRegister() {
  if (regPassword.value !== regConfirm.value) {
    successMessage.value = "Пароли не совпадают!"
    return
  }
  successMessage.value = "Вы успешно зарегистрировались!"
}
</script>
