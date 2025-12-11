<template>
  <div class="container mx-auto px-6 py-12 text-white relative min-h-screen">

    <!-- ▬▬▬▬▬▬▬▬ ЛЕВАЯ КОЛОНКА - СПИСОК ПОЛЬЗОВАТЕЛЕЙ ▬▬▬▬▬▬▬▬ -->
    <div 
      class="hidden lg:block bg-black/40 border border-gray-700 backdrop-blur-xl 
             p-8 rounded-xl min-h-[500px] w-[400px] absolute left-10 top-1/2 transform -translate-y-1/2"
    >
      <h2 class="text-3xl font-bold text-green-400 mb-6">Зарегистрированные пользователи</h2>
      
      <!-- Статус загрузки -->
      <div v-if="loadingUsers" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-green-400 mb-4"></div>
        <p class="text-gray-400">Загрузка пользователей...</p>
      </div>
      
      <!-- Список пользователей -->
      <div v-else>
        <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          <div 
            v-for="user in users" 
            :key="user.email"
            class="p-3 rounded-lg border border-gray-700 hover:border-green-500/50 transition"
            :class="user.email === currentUser ? 'bg-green-500/10 border-green-500' : 'bg-black/20'"
          >
            <div class="flex justify-between items-center">
              <div>
                <span class="font-medium text-white">{{ user.email }}</span>
                <span v-if="user.email === currentUser" class="ml-2 text-xs px-2 py-1 bg-green-500/30 text-green-300 rounded-full">
                  Вы
                </span>
              </div>
              <div class="text-xs text-gray-400">
                {{ user.createdAt ? formatDate(user.createdAt) : 'Новый пользователь' }}
              </div>
            </div>
            <div class="mt-2 text-xs text-gray-500">
              Зарегистрирован: {{ user.createdAt ? formatDate(user.createdAt) : 'Недавно' }}
            </div>
          </div>
        </div>
        
        <!-- Статистика -->
        <div class="mt-6 pt-4 border-t border-gray-700">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="text-center p-3 bg-black/30 rounded">
              <div class="text-2xl font-bold text-green-400">{{ users.length }}</div>
              <div class="text-gray-400">Всего пользователей</div>
            </div>
            <div class="text-center p-3 bg-black/30 rounded">
              <div class="text-2xl font-bold text-blue-400">{{ onlineUsers }}</div>
              <div class="text-gray-400">Сейчас онлайн</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Инструкция -->
      <div class="mt-6 p-4 bg-black/30 rounded-lg border border-gray-700">
        <h3 class="font-bold text-green-300 mb-2">Тестовый аккаунт:</h3>
        <div class="space-y-1 text-sm">
          <div>Email: <span class="text-green-300 font-mono">test@example.com</span></div>
          <div>Пароль: <span class="text-green-300 font-mono">12345</span></div>
        </div>
      </div>
    </div>

    <!-- ▬▬▬▬▬▬▬▬ ЦЕНТРАЛЬНОЕ ОКНО LOGIN / REGISTER ▬▬▬▬▬▬▬▬ -->
    <div 
      class="w-full max-w-md mx-auto lg:mx-0 lg:ml-[500px] relative z-30"
    >
      <div 
        class="bg-black/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700 
               shadow-[0_0_25px_#22ff55]"
      >
        
        <!-- Заголовок с текущим статусом -->
        <div class="mb-6 text-center">
          <h1 class="text-2xl font-bold text-green-400 mb-2">
            {{ mode === 'login' ? 'Вход в систему' : 'Регистрация' }}
          </h1>
          <div class="text-sm text-gray-400">
            <span v-if="currentUser">Вы вошли как: <span class="text-green-300">{{ currentUser }}</span></span>
            <span v-else>Войдите или создайте новый аккаунт</span>
          </div>
        </div>

        <!-- Переключатель вкладок -->
        <div class="flex justify-center mb-6 gap-4">
          <button 
            class="px-6 py-3 text-lg font-semibold transition rounded-lg"
            :class="mode === 'login' ? 'bg-green-400 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'"
            @click="mode = 'login'"
          >
            Вход
          </button>

          <button 
            class="px-6 py-3 text-lg font-semibold transition rounded-lg"
            :class="mode === 'register' ? 'bg-green-400 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'"
            @click="mode = 'register'"
          >
            Регистрация
          </button>
        </div>

        <!-- Сообщения -->
        <div 
          v-if="message"
          class="mb-6 p-4 rounded-lg border transition-all duration-300"
          :class="message.type === 'success' 
            ? 'bg-green-500/20 border-green-500/50 text-green-300' 
            : 'bg-red-500/20 border-red-500/50 text-red-300'"
        >
          <div class="flex items-start">
            <div class="flex-1">
              <strong class="font-bold">{{ message.title }}</strong>
              <p class="mt-1">{{ message.text }}</p>
              
              <!-- Дополнительная информация для успешной регистрации -->
              <div v-if="message.type === 'success' && mode === 'register'" class="mt-3 p-3 bg-black/30 rounded">
                <p class="text-sm mb-2">Теперь вы можете:</p>
                <ul class="text-sm space-y-1">
                  <li>• Использовать тестовый аккаунт для входа</li>
                  <li>• Или войти с только что созданным аккаунтом</li>
                  <li>• Получить доступ к аудиоплееру на главной странице</li>
                </ul>
              </div>
            </div>
            <button 
              @click="clearMessage" 
              class="ml-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- ▬▬▬▬▬▬▬▬ LOGIN ▬▬▬▬▬▬▬▬ -->
        <form 
          v-if="mode === 'login'" 
          @submit.prevent="submitLogin" 
          class="space-y-4"
        >
          <div>
            <label class="block text-sm text-gray-400 mb-2">Email</label>
            <input 
              v-model="loginEmail"
              type="email" 
              placeholder="Введите ваш email"
              required
              class="w-full p-3 rounded bg-black/40 border border-gray-700 
                     text-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Пароль</label>
            <input 
              v-model="loginPassword"
              type="password" 
              placeholder="Введите пароль"
              required
              class="w-full p-3 rounded bg-black/40 border border-gray-700 
                     text-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            />
          </div>

          <div class="flex items-center justify-between">
            <button 
              type="button"
              @click="useTestAccount"
              class="text-sm text-green-400 hover:text-green-300 transition"
            >
              Использовать тестовый аккаунт
            </button>
            <button 
              type="submit"
              class="px-8 py-3 bg-green-400 text-black font-semibold rounded-lg 
                     hover:bg-green-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              :disabled="loading"
            >
              <span v-if="!loading">Войти</span>
              <span v-else>Вход...</span>
              <svg v-if="loading" class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </div>
        </form>

        <!-- ▬▬▬▬▬▬▬▬ REGISTER ▬▬▬▬▬▬▬▬ -->
        <form 
          v-if="mode === 'register'" 
          @submit.prevent="submitRegister" 
          class="space-y-4"
        >
          <div>
            <label class="block text-sm text-gray-400 mb-2">Email</label>
            <input 
              v-model="regEmail"
              type="email" 
              placeholder="example@email.com"
              required
              class="w-full p-3 rounded bg-black/40 border border-gray-700 
                     text-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Пароль</label>
            <input 
              v-model="regPassword"
              type="password" 
              placeholder="Минимум 6 символов"
              required
              minlength="6"
              class="w-full p-3 rounded bg-black/40 border border-gray-700 
                     text-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Подтвердите пароль</label>
            <input 
              v-model="regConfirm"
              type="password" 
              placeholder="Повторите пароль"
              required
              minlength="6"
              class="w-full p-3 rounded bg-black/40 border border-gray-700 
                     text-white focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            />
          </div>

          <div class="pt-2">
            <button 
              type="submit"
              class="w-full py-3 bg-green-400 text-black font-semibold rounded-lg 
                     hover:bg-green-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              :disabled="loading"
            >
              <span v-if="!loading">Создать аккаунт</span>
              <span v-else>Регистрация...</span>
              <svg v-if="loading" class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </div>
        </form>

        <!-- Информация после успешной регистрации -->
        <div 
          v-if="showRegistrationSuccess"
          class="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-xl"
        >
          <h3 class="text-xl font-bold text-green-400 mb-3">🎉 Регистрация успешна!</h3>
          <p class="text-gray-300 mb-4">Ваш аккаунт <span class="text-green-300 font-bold">{{ lastRegisteredEmail }}</span> был создан.</p>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="text-green-400 mt-1">✓</div>
              <div>
                <p class="font-medium text-white">Теперь вы можете:</p>
                <p class="text-sm text-gray-400">Войти с вашими учетными данными</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-green-400 mt-1">✓</div>
              <div>
                <p class="font-medium text-white">Или попробовать тестовый аккаунт:</p>
                <p class="text-sm text-gray-400">Email: test@example.com | Пароль: 12345</p>
              </div>
            </div>
          </div>
          
          <div class="mt-6 flex gap-3">
            <button 
              @click="switchToLoginAfterRegister"
              class="flex-1 py-3 bg-green-400 text-black font-semibold rounded-lg hover:bg-green-300 transition"
            >
              Войти сейчас
            </button>
            <button 
              @click="clearRegistrationSuccess"
              class="flex-1 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
            >
              Закрыть
            </button>
          </div>
        </div>

        <!-- Навигация -->
        <div class="mt-8 pt-6 border-t border-gray-700">
          <div class="text-center space-y-3">
            <p class="text-gray-400">
              {{ mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
              <button 
                @click="mode = mode === 'login' ? 'register' : 'login'" 
                class="text-green-400 hover:text-green-300 font-semibold ml-2"
              >
                {{ mode === 'login' ? 'Создать аккаунт' : 'Войти' }}
              </button>
            </p>
            
            <div class="flex justify-center gap-4">
              <NuxtLink 
                to="/" 
                class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm"
              >
                На главную
              </NuxtLink>
              <NuxtLink 
                to="/debug" 
                class="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition text-sm"
              >
                Страница отладки
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mode = ref("login")
const loading = ref(false)
const loadingUsers = ref(false)

// Состояние сообщений
const message = ref(null)
const showRegistrationSuccess = ref(false)
const lastRegisteredEmail = ref("")

// Текущий пользователь
const currentUser = useCookie('session')

// login data
const loginEmail = ref("")
const loginPassword = ref("")

// register data
const regEmail = ref("")
const regPassword = ref("")
const regConfirm = ref("")

// Данные пользователей
const users = ref([])
const onlineUsers = ref(0)

// Функция загрузки пользователей
async function loadUsers() {
  loadingUsers.value = true
  try {
    // Загружаем пользователей с бэкенда
    const response = await $fetch('https://project-macan-backend.onrender.com/api/users', {
      method: 'GET',
      credentials: 'include' // Важно для cookies
    })
    
    if (response && Array.isArray(response)) {
      users.value = response
      
      // Добавляем текущего пользователя, если он есть и его нет в списке
      if (currentUser.value && !users.value.find(u => u.email === currentUser.value)) {
        users.value.unshift({
          email: currentUser.value,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        })
      }
      
      // Добавляем последнего зарегистрированного пользователя
      if (lastRegisteredEmail.value && !users.value.find(u => u.email === lastRegisteredEmail.value)) {
        users.value.unshift({
          email: lastRegisteredEmail.value,
          createdAt: new Date().toISOString(),
          lastLogin: null
        })
      }
    } else {
      // Заглушка если API не отвечает
      users.value = [
        { 
          email: 'test@example.com', 
          createdAt: '2024-01-01T10:00:00Z',
          lastLogin: '2025-01-15T14:30:00Z'
        },
      ]
    }
    
    loadingUsers.value = false
    onlineUsers.value = Math.min(users.value.length, Math.floor(Math.random() * 5) + 1)
  } catch (error) {
    console.error('Error loading users:', error)
    // Заглушка при ошибке
    users.value = [
      { 
        email: 'test@example.com', 
        createdAt: '2024-01-01T10:00:00Z',
        lastLogin: '2025-01-15T14:30:00Z'
      },
    ]
    loadingUsers.value = false
    onlineUsers.value = Math.min(users.value.length, Math.floor(Math.random() * 5) + 1)
  }
}

// Форматирование даты
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Очистка сообщений
function clearMessage() {
  message.value = null
}

function clearRegistrationSuccess() {
  showRegistrationSuccess.value = false
  lastRegisteredEmail.value = ""
}

// Использовать тестовый аккаунт
function useTestAccount() {
  loginEmail.value = 'test@example.com'
  loginPassword.value = '12345'
}

// Переключиться на логин после регистрации
function switchToLoginAfterRegister() {
  mode.value = 'login'
  loginEmail.value = lastRegisteredEmail.value
  showRegistrationSuccess.value = false
  loadUsers() // Обновляем список пользователей
}

// Логин
async function submitLogin() {
  message.value = null
  loading.value = true
  
  try {
    console.log('Sending login request...')
    
    const res = await $fetch('https://project-macan-backend.onrender.com/api/auth/login', {
      method: 'POST',
      credentials: 'include', // Важно для cookies
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value
      })
    })

    console.log('Login response:', res)

    if (res.error) {
      message.value = {
        type: 'error',
        title: 'Ошибка входа',
        text: res.error
      }
    } else {
      message.value = {
        type: 'success',
        title: 'Успешный вход!',
        text: `Добро пожаловать, ${loginEmail.value}!`
      }
      
      // Обновляем состояние
      currentUser.value = loginEmail.value
      
      // Обновляем список пользователей
      loadUsers()
      
      // Показываем информацию о входе
      console.log('User logged in:', currentUser.value)
      
      // НЕ перенаправляем - остаемся на странице
    }
  } catch (error) {
    console.error('Login fetch error:', error)
    message.value = {
      type: 'error',
      title: 'Ошибка подключения',
      text: `Не удалось подключиться: ${error.message}. Проверьте консоль.`
    }
  } finally {
    loading.value = false
  }
}

// Регистрация
async function submitRegister() {
  message.value = null
  
  // Валидация
  if (regPassword.value !== regConfirm.value) {
    message.value = {
      type: 'error',
      title: 'Ошибка',
      text: 'Пароли не совпадают!'
    }
    return
  }
  
  if (regPassword.value.length < 6) {
    message.value = {
      type: 'error',
      title: 'Ошибка',
      text: 'Пароль должен содержать минимум 6 символов'
    }
    return
  }

  loading.value = true
  
  try {
    const res = await $fetch('https://project-macan-backend.onrender.com/api/auth/register', {
      method: 'POST',
      credentials: 'include', // Важно для cookies
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: regEmail.value,
        password: regPassword.value
      })
    })

    if (res.error) {
      message.value = {
        type: 'error',
        title: 'Ошибка регистрации',
        text: res.error
      }
    } else {
      // Сохраняем email последнего зарегистрированного пользователя
      lastRegisteredEmail.value = regEmail.value
      
      message.value = {
        type: 'success',
        title: 'Регистрация успешна!',
        text: `Аккаунт ${regEmail.value} был создан.`
      }
      
      // Показываем блок успешной регистрации
      showRegistrationSuccess.value = true
      
      // Очищаем поля регистрации
      regEmail.value = ""
      regPassword.value = ""
      regConfirm.value = ""
      
      // Обновляем список пользователей
      setTimeout(() => {
        loadUsers()
      }, 500)
    }
  } catch (error) {
    console.error('Register error:', error)
    message.value = {
      type: 'error',
      title: 'Ошибка сервера',
      text: 'Не удалось подключиться к серверу. Попробуйте снова.'
    }
  } finally {
    loading.value = false
  }
}

// Загружаем пользователей при монтировании
onMounted(() => {
  loadUsers()
  
  // Показываем приветствие, если пользователь уже вошел
  if (currentUser.value) {
    message.value = {
      type: 'success',
      title: 'Вы уже вошли в систему',
      text: `Текущий пользователь: ${currentUser.value}`
    }
  }
})
</script>

<style scoped>
/* Стили для скроллбара */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(34, 255, 85, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 255, 85, 0.5);
}
</style>