/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arquidiocesebh.org.br',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'miliciadaimaculada.org.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rqfba000.s3.sa-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mdl.artvee.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mapr.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'liturgiadashoras.online',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'r2.padrepauloricardo.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'prd-imagens.s3.sa-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'prd-imagens.s3-sa-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.elo7.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'santahildegarda.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.diocesedecrato.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'diocesedebomjesus.org.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'a.imagem.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.oceansbridge.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '2.bp.blogspot.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.cancaonova.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'p2.trrsf.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.artbible.info',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.churchofjesuschrist.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'guadalupegyn.com.br',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig; 