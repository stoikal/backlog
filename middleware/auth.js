export default defineNuxtRouteMiddleware((to, from) => {
  const session = useSupabaseSession()
  const isLoggedIn = !!session.value

  if (!isLoggedIn && to.path !== '/login') {
    return navigateTo('/login')
  } 

  if (isLoggedIn && to.path === '/login') {
    return navigateTo('/')
  }

  return true
})