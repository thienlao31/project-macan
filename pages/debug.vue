<template>
  <div class="container mx-auto px-6 py-12 text-white">
    <div class="max-w-4xl mx-auto">
      <!-- Заголовок -->
      <h1 class="text-3xl font-bold text-green-400 mb-2">Debug Information</h1>
      <p class="text-gray-400 mb-8">Страница для отладки и проверки состояния авторизации</p>
      
      <!-- Карточка с информацией о текущем пользователе -->
      <div class="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
        <h2 class="text-xl font-bold text-green-300 mb-4">📊 Текущая сессия</h2>
        
        <div class="space-y-4">
          <!-- Статус авторизации -->
          <div class="flex items-center">
            <div class="w-40 text-gray-400">Статус:</div>
            <div :class="['px-4 py-2 rounded-full font-semibold', 
                         userEmail ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300']">
              {{ userEmail ? 'АВТОРИЗОВАН' : 'НЕ АВТОРИЗОВАН' }}
            </div>
          </div>
          
          <!-- Email пользователя -->
          <div class="flex items-center">
            <div class="w-40 text-gray-400">Email:</div>
            <div class="px-4 py-2 bg-black/50 rounded border border-gray-700">
              {{ userEmail || 'Не авторизован' }}
            </div>
          </div>
          
          <!-- Cookies -->
          <div class="flex items-start">
            <div class="w-40 text-gray-400 pt-2">Cookie (session):</div>
            <div class="flex-1">
              <div class="px-4 py-2 bg-black/50 rounded border border-gray-700 font-mono text-sm break-all">
                {{ sessionCookie }}
              </div>
              <div class="mt-2 text-sm text-gray-500">
                Имя: <code>session</code> | 
                HTTP Only: <code>true</code> | 
                Max Age: <code>86400</code> сек (1 день)
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Тестовые кнопки -->
      <div class="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
        <h2 class="text-xl font-bold text-green-300 mb-4">🧪 Тестирование</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <!-- Кнопка для проверки API логина -->
          <button 
            @click="testLoginAPI" 
            class="p-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition flex flex-col items-center justify-center"
          >
            <span class="text-blue-300 font-semibold mb-1">Проверить API Login</span>
            <span class="text-sm text-gray-400">/api/auth/login</span>
          </button>
          
          <!-- Кнопка для проверки API регистрации -->
          <button 
            @click="testRegisterAPI" 
            class="p-4 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg transition flex flex-col items-center justify-center"
          >
            <span class="text-purple-300 font-semibold mb-1">Проверить API Register</span>
            <span class="text-sm text-gray-400">/api/auth/register</span>
          </button>
          
          <!-- Кнопка для проверки API логаута -->
          <button 
            @click="testLogoutAPI" 
            class="p-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition flex flex-col items-center justify-center"
          >
            <span class="text-red-300 font-semibold mb-1">Проверить API Logout</span>
            <span class="text-sm text-gray-400">/api/auth/logout</span>
          </button>
        </div>
        
        <!-- Результаты тестов -->
        <div v-if="apiResult" class="mt-4 p-4 bg-black/50 rounded border border-gray-600">
          <h3 class="font-semibold text-green-300 mb-2">Результат запроса:</h3>
          <pre class="text-sm whitespace-pre-wrap">{{ JSON.stringify(apiResult, null, 2) }}</pre>
        </div>
      </div>
      
      <!-- Информация о пользователях в системе -->
      <div class="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-green-300">👥 Зарегистрированные пользователи</h2>
          <button 
            @click="refreshUsers" 
            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Обновить
          </button>
        </div>
        
        <!-- Загрузка -->
        <div v-if="loadingUsers" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-green-400"></div>
          <p class="mt-2 text-gray-400">Загрузка данных...</p>
        </div>
        
        <!-- Таблица пользователей -->
        <div v-else-if="users.length > 0">
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-gray-400 bg-black/50">
                <tr>
                  <th class="px-4 py-3">Email</th>
                  <th class="px-4 py-3">Статус</th>
                  <th class="px-4 py-3">Последний вход</th>
                  <th class="px-4 py-3">Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="user in users" 
                  :key="user.email"
                  :class="['border-b border-gray-800 hover:bg-gray-800/30', 
                           user.email === userEmail ? 'bg-green-500/10' : '']"
                >
                  <td class="px-4 py-3">
                    <div class="font-medium">{{ user.email }}</div>
                  </td>
                  <td class="px-4 py-3">
                    <span :class="['px-2 py-1 rounded-full text-xs', 
                                 user.email === userEmail ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300']">
                      {{ user.email === userEmail ? 'Текущий' : 'В системе' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-gray-400">
                    {{ new Date().toLocaleDateString() }}
                  </td>
                  <td class="px-4 py-3">
                    <button 
                      v-if="user.email !== userEmail"
                      @click="simulateLogin(user.email)"
                      class="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded text-blue-300 text-sm"
                    >
                      Имитировать вход
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 text-sm text-gray-500">
            Всего пользователей: {{ users.length }}
            <span v-if="userEmail" class="ml-4 text-green-300">
              Вы вошли как: <strong>{{ userEmail }}</strong>
            </span>
          </div>
        </div>
        
        <!-- Сообщение если нет пользователей -->
        <div v-else class="text-center py-8 text-gray-500">
          Нет зарегистрированных пользователей
        </div>
        
        <!-- Тестовый пользователь -->
        <div class="mt-6 p-4 bg-black/50 rounded border border-gray-600">
          <h3 class="font-semibold text-yellow-300 mb-2">Тестовый аккаунт:</h3>
          <div class="font-mono text-sm">
            <div>Email: <code>test@example.com</code></div>
            <div>Пароль: <code>12345</code></div>
          </div>
          <button 
            @click="useTestAccount"
            class="mt-3 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded transition"
          >
            Использовать тестовый аккаунт
          </button>
        </div>
      </div>
      
      <!-- Быстрые ссылки -->
      <div class="mt-8 flex flex-wrap gap-4 justify-center">
        <NuxtLink 
          to="/" 
          class="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
        >
          На главную
        </NuxtLink>
        <NuxtLink 
          to="/login" 
          class="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition"
        >
          Страница логина
        </NuxtLink>
        <NuxtLink 
          to="/logout" 
          class="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition"
        >
          Выйти
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Получаем данные о текущем пользователе
const userEmail = useCookie('session')
const sessionCookie = useCookie('session', { 
  watch: true,
  decode: (val) => val 
})

// Состояние
const loadingUsers = ref(false)
const users = ref([])
const apiResult = ref(null)

// Загружаем список пользователей
async function loadUsers() {
  loadingUsers.value = true
  try {
    const response = await $fetch('https://project-macan-backend.onrender.com/api/users', {
      method: 'GET',
      credentials: 'include'
    })
    
    if (response && Array.isArray(response)) {
      users.value = response
    } else {
      // Заглушка если API не отвечает
      users.value = [
        { email: userEmail.value || 'test@example.com', lastLogin: new Date().toISOString() },
        { email: 'admin@example.com', lastLogin: '2025-01-10T12:30:00Z' },
        { email: 'user@example.com', lastLogin: '2025-01-09T15:45:00Z' }
      ]
    }
    loadingUsers.value = false
  } catch (error) {
    console.error('Error loading users:', error)
    // Заглушка при ошибке
    users.value = [
      { email: userEmail.value || 'test@example.com', lastLogin: new Date().toISOString() },
      { email: 'admin@example.com', lastLogin: '2025-01-10T12:30:00Z' },
      { email: 'user@example.com', lastLogin: '2025-01-09T15:45:00Z' }
    ]
    loadingUsers.value = false
  }
}

// Обновить список пользователей
function refreshUsers() {
  loadUsers()
}

// Тестирование API
async function testLoginAPI() {
  apiResult.value = null
  try {
    const response = await $fetch('https://project-macan-backend.onrender.com/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: '12345'
      })
    })
    apiResult.value = response
  } catch (error) {
    apiResult.value = { error: error.message }
  }
}

async function testRegisterAPI() {
  apiResult.value = null
  try {
    const randomEmail = `test${Math.floor(Math.random() * 1000)}@test.com`
    const response = await $fetch('https://project-macan-backend.onrender.com/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: randomEmail,
        password: 'test123'
      })
    })
    apiResult.value = response
    // Обновляем список пользователей после регистрации
    refreshUsers()
  } catch (error) {
    apiResult.value = { error: error.message }
  }
}

async function testLogoutAPI() {
  apiResult.value = null
  try {
    const response = await $fetch('https://project-macan-backend.onrender.com/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
    apiResult.value = response
    // Обновляем страницу после логаута
    setTimeout(() => {
      location.reload()
    }, 1000)
  } catch (error) {
    apiResult.value = { error: error.message }
  }
}

// Имитировать вход
function simulateLogin(email) {
  useCookie('session').value = email
  location.reload()
}

// Использовать тестовый аккаунт
function useTestAccount() {
  useCookie('session').value = 'test@example.com'
  location.reload()
}

// Загружаем данные при монтировании компонента
onMounted(() => {
  loadUsers()
})
</script>

<style scoped>
/* Дополнительные стили для таблицы */
table {
  border-collapse: separate;
  border-spacing: 0;
}

th {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

tr:last-child td {
  border-bottom: none;
}
</style>