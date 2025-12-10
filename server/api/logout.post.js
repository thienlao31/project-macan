export default defineEventHandler(async (event) => {
  try {
    console.log('Logout request')
    
    // Удаляем cookie
    deleteCookie(event, 'session', { 
      path: '/' 
    })
    
    return { 
      ok: true, 
      message: 'Вы успешно вышли' 
    }
  } catch (error) {
    console.error('Logout API error:', error)
    return { 
      error: 'Ошибка при выходе' 
    }
  }
})