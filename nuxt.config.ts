// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt'
  ],
  runtimeConfig: {
    public: {
      appName: '',
      appVersion: '',
      appEmail: ''
    }
  }
})