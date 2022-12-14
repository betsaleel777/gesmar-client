export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  env: {
    API: process.env.API,
  },
  head: {
    title: 'gesmar',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/lib/@fortawesome/fontawesome-free/css/all.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/lib/ionicons/css/ionicons.min.css',
      },
    ],
    script: [
      { src: '/lib/jquery/jquery.min.js', body: 'true' },
      { src: '/lib/bootstrap/js/bootstrap.bundle.min.js', body: 'true' },
    ],
  },
  loading: {
    continuous: true,
  },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#5556fd',
    background: 'white',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/cassie.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/feather.js',
    '~/plugins/perfect-scrollbar.js',
    '~/plugins/user.js',
    '~/plugins/vue-gates',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    '@nuxtjs/vuetify',
  ],

  moment: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxt/image',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API,
    credentials: true,
  },

  router: {
    middleware: ['auth'],
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API,
        endpoints: {
          login: { url: '/api/login' },
          logout: { url: '/api/logout', method: 'post' },
        },
      },
    },
    plugins: ['~/plugins/currency.js', '~/plugins/axios.js'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
