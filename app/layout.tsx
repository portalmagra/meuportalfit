// CLAUDE: Layout principal - versão mais completa com CSS
import './globals.css'
import Footer from './components/Footer'

export const metadata = {
  title: 'MeuPortalFit - Portal de Wellness para Brasileiros nos EUA',
  description: 'Descubra produtos Amazon personalizados para suas necessidades de saúde e bem-estar. Análise IA gratuita, produtos por área e suporte personalizado.',
  keywords: 'wellness, saúde, suplementos, Amazon, brasileiros EUA, IA, análise personalizada',
  
  // Open Graph / Facebook / WhatsApp
  openGraph: {
    title: 'MeuPortalFit - Portal de Wellness para Brasileiros nos EUA',
    description: 'Descubra produtos Amazon personalizados para suas necessidades de saúde e bem-estar. Análise IA gratuita, produtos por área e suporte personalizado.',
    url: 'https://meuportalfit.com',
    siteName: 'MeuPortalFit',
    images: [
      {
        url: '/images/og/meuportalfit-og.jpg',
        width: 1200,
        height: 630,
        alt: 'MeuPortalFit - Portal de Wellness para Brasileiros nos EUA',
      },
      {
        url: '/images/og/meuportalfit-og-square.jpg',
        width: 600,
        height: 600,
        alt: 'MeuPortalFit Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'MeuPortalFit - Portal de Wellness para Brasileiros nos EUA',
    description: 'Descubra produtos Amazon personalizados para suas necessidades de saúde e bem-estar.',
    images: ['/images/og/meuportalfit-og.jpg'],
    creator: '@meuportalfit',
    site: '@meuportalfit',
  },
  
  // Meta tags adicionais para WhatsApp
  other: {
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/jpeg',
    'og:image:alt': 'MeuPortalFit - Portal de Wellness para Brasileiros nos EUA',
    
    // WhatsApp específico
    'og:image:secure_url': 'https://meuportalfit.com/images/og/meuportalfit-og.jpg',
    
    // Informações da empresa
    'og:site_name': 'MeuPortalFit',
    'og:locale': 'pt_BR',
    'og:type': 'website',
    
    // Informações de contato
    'og:phone_number': '+1 7862535032',
    'og:country_name': 'United States',
    
    // SEO adicional
    'robots': 'index, follow',
    'author': 'MeuPortalFit',
    'copyright': '© 2025 MeuPortalFit. Todos os direitos reservados.',
  },
  
  // Manifest para PWA
  manifest: '/manifest.json',
  
  // Ícones
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/images/icons/safari-pinned-tab.svg', color: '#22c55e' },
    ],
  },
  
  // Viewport e configurações mobile
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  
  // Cores do tema
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#22c55e' },
    { media: '(prefers-color-scheme: dark)', color: '#16a34a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
