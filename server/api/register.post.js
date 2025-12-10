export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    console.log('Registration attempt for:', body.email)
    
    // Простая регистрация для теста
    // В реальном проекте здесь была бы запись в базу данных
    
    return { 
      ok: true, 
      message: 'Вы успешно зарегистрированы',
      user: {
        email: body.email,
        createdAt: new Date().toISOString(),
        lastLogin: null
      }
    }
  } catch (error) {
    console.error('Register API error:', error)
    return { 
      error: 'Внутренняя ошибка сервера при регистрации' 
    }
  }
})