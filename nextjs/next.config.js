//const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'
const basePath = '/compro';

module.exports = {
    basePath: isProd ? basePath : '',
    env: {
      BASE_PATH: isProd ? basePath : '',
    },
    trailingSlash: isProd ? true : false,
    images: {
      domains: ['localhost', 'itshop.ukm.id'],
    },
    //assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
    //assetPrefix: isProd ? 'http://localhost/blogapp-nextjs/out' : '',
  }