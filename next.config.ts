import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Otimização de imagens
  images: {
    domains: [
      'images-na.ssl-images-amazon.com',
      'm.media-amazon.com',
      'i.imgur.com',
      'via.placeholder.com'
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },

  // Compressão
  compress: true,

  // Otimização de fonts é automática no Next.js 15
  // optimizeFonts foi removido - é padrão agora
}

export default nextConfig