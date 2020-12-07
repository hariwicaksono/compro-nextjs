const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    basePath: '/blogapp-nextjs',
    //assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
    assetPrefix: isProd ? 'http://localhost/blogapp-nextjs/out' : '',
    images: {
      domains: ['localhost'],
    },
  }