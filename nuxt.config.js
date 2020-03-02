
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  server: {
    port: 9008, // default: 3000
    host: 'localhost' // default: localhost
  },
  router: {
    linkExactActiveClass: 'exact-active-link'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
      { src: 'http://cdn.jsdelivr.net/npm/eruda' },
      { src: 'https://qiyukf.com/script/8dcfd5a9f9ae2d6448afedac9090773b.js?hiddden=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/styles/common/reset.scss',
    'video.js/dist/video-js.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/element-ui',
    { src: '~plugins/nuxt-video-player-plugin.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true,
    prefix: '', // baseURL
    credentials: true,
  },
  proxy: {
    '/Fco': {
      target: 'https://wapapi.xiniaogongkao.com', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/Fco': '', //将 /api 替换掉
      },
    },
    '/App': {
      target: 'https://testapp.xiniaogongkao.com', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/App': '', //将 /api 替换掉
      },
    },
    '/api': {
      target: 'https://www.xiniaogongkao.com', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', //将 /api 替换掉
      },
    },
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // config.module.rules.push(
      //   {
      //     test: /\.(png|jpe?g|gif|svg)$/,
      //     loader: 'url-loader',
      //     query: {
      //       limit: 1000, // 1KB
      //       name: 'img/[name].[hash:7].[ext]'
      //     }
      //   },
      //   {
      //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //     loader: 'url-loader',
      //     query: {
      //       limit: 1000, // 1 KB
      //       name: 'fonts/[name].[hash:7].[ext]'
      //     }
      //   }
      // )
    },
  }
}
