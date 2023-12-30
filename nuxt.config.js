export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  env: { API: process.env.API },
  head: {
    title: 'gesmar',
    htmlAttrs: { lang: 'fr' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/lib/@fortawesome/fontawesome-free/css/all.min.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/lib/ionicons/css/ionicons.min.css'
      }
    ],
    script: [
      { src: '/lib/jquery/jquery.min.js', body: 'true' },
      { src: '/lib/bootstrap/js/bootstrap.bundle.min.js', body: 'true' }
    ]
  },
  loading: { continuous: true },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#5556fd',
    background: 'white'
  },
  css: ['~/assets/css/cassie.css'],

  plugins: [
    '~/plugins/feather.js',
    '~/plugins/perfect-scrollbar.js',
    '~/plugins/user.js',
    '~/plugins/vue-gates',
    '~/plugins/currency.js'
  ],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/moment', '@nuxtjs/vuetify', '@nuxt/image'],

  moment: {
    defaultLocale: 'fr',
    locales: ['fr']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', '@nuxtjs/auth-next'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API,
    credentials: true
  },

  router: {
    middleware: ['auth']
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API,
        endpoints: {
          login: { url: '/api/login' },
          logout: { url: '/api/logout', method: 'post' }
        }
      }
    },
    plugins: ['~/plugins/axios.js']
  },

  build: {}
}
