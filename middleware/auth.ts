export default defineNuxtRouteMiddleware((to, from) => {
  const cookie = useCookie('session')
  
  console.log('Middleware check:', {
    path: to.path,
    hasCookie: !!cookie.value,
    cookieValue: cookie.value
  })
  
  // Если пользователь не авторизован и пытается получить доступ к защищенным страницам
  if (!cookie.value && to.path !== '/login') {
    console.log('Redirecting to login (no cookie)')
    return navigateTo('/login')
  }
  
  // Если пользователь авторизован и пытается зайти на страницу логина
  if (cookie.value && to.path === '/login') {
    console.log('Redirecting to home (already logged in)')
    return navigateTo('/')
  }
})