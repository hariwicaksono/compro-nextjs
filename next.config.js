//const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    basePath: isProd ? '/blogapp' : '',
    trailingSlash: isProd ? true : false,
    images: {
      domains: ['localhost'],
    },
    //assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
    //assetPrefix: isProd ? 'http://localhost/blogapp-nextjs/out' : '',
  }