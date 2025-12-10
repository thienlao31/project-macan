export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    console.log('Login attempt for:', body.email)
    
    // Простая проверка для теста
    if (body.email === 'test@example.com' && body.password === '12345') {
      // Устанавливаем cookie
      setCookie(event, 'session', body.email, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 день
        sameSite: 'strict'
      })
      
      console.log('Login successful for:', body.email)
      return { 
        ok: true, 
        message: 'Вы успешно вошли',
        user: {
          email: body.email,
          createdAt: '2025-01-01T10:00:00Z'
        }
      }
    }
    
    return { 
      error: 'Неверный email или пароль. Используйте test@example.com / 12345' 
    }
  } catch (error) {
    console.error('Login API error:', error)
    return { 
      error: 'Внутренняя ошибка сервера при входе' 
    }
  }
})