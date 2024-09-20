export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Target: https://go.nuxtjs.dev/config-target
  // Global page headers: https://go.nuxtjs.dev/config-head
  env: { API: process.env.API },
  head: {
    titleTemplate: '%s Gesmar',
    htmlAttrs: { lang: 'fr' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'application de gestion du grand marché de Treichville',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/lib/@fortawesome/fontawesome-free/css/all.min.css',
      },
    ],
    script: [
      { src: '/lib/jquery/jquery.min.js', body: 'true' },
      { src: '/lib/bootstrap/js/bootstrap.bundle.min.js', body: 'true' },
    ],
  },
  loading: { continuous: true },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#5556fd',
    background: 'white',
  },
  css: ['~/assets/css/cassie.css'],

  plugins: [
    '~/plugins/feather.js',
    '~/plugins/perfect-scrollbar.js',
    '~/plugins/user.js',
    '~/plugins/vue-gates',
    '~/plugins/currency.js',
    '~/plugins/notifications.js',
    '~/plugins/server-errors.js',
  ],

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/moment', '@nuxtjs/vuetify', '@nuxt/image'],

  moment: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', '@nuxtjs/auth-next'],

  axios: {
    baseURL: process.env.API,
    headers: { 'Access-Control-Allow-Origin': '*' },
    credentials: true,
  },
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: '#5556fd',
        },
      },
    },
    treeShake: true,
  },
  bootstrapVue: {
    icons: false,
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    components: [
      'BOverlay',
      'BModal',
      'BCard',
      'BCardText',
      'BFormInput',
      'BTable',
      'BSpinner',
      'BPagination',
      'BFormGroup',
      'BInputGroup',
      'BInputGroupAppend',
      'BInputGroupText',
      'BPaginationNav',
      'BTabs',
      'BTab',
      'BImg',
      'BTooltip',
      'BProgress',
      'BFormFile',
      'BButton',
      'BNav',
      'BNavItem',
      'BCardHeader',
      'BCardBody',
      'BBreadcrumb',
      'BLink',
      'BFormInput',
    ],
    componentPlugins: ['ModalPlugin', 'VBTooltipPlugin'],
  },

  router: { middleware: ['auth', 'permission-filter'] },

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
    plugins: ['~/plugins/axios.js'],
  },

  build: {},
}
