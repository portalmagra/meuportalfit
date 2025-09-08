// CLAUDE: Layout principal - versão mais completa com CSS
import './globals.css'
import ConditionalFooter from './components/ConditionalFooter'

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
        url: 'https://meuportalfit.com/images/og/meuportalfit-og.svg',
        width: 1200,
        height: 630,
        alt: 'MeuPortalFit - Portal de Wellness para Brasileiros nos EUA',
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
    images: ['https://meuportalfit.com/images/og/meuportalfit-og.svg'],
    creator: '@meuportalfit',
    site: '@meuportalfit',
  },
  
  // Meta tags adicionais para WhatsApp
  other: {
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/svg+xml',
    'og:image:alt': 'MeuPortalFit - Portal de Wellness para Brasileiros nos EUA',
    
    // WhatsApp específico
    'og:image:secure_url': 'https://meuportalfit.com/images/og/meuportalfit-og.svg',
    'og:image:url': 'https://meuportalfit.com/images/og/meuportalfit-og.svg',
    
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
    
    // WhatsApp específico adicional
    'whatsapp:image': 'https://meuportalfit.com/images/og/meuportalfit-og.svg',
    'whatsapp:title': 'MeuPortalFit - Portal de Wellness para Brasileiros nos EUA',
    'whatsapp:description': 'Descubra produtos Amazon personalizados para suas necessidades de saúde e bem-estar.',
  },
  
  // Manifest para PWA
  manifest: '/manifest.json',
  
  // Ícones
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
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
        <ConditionalFooter />
      </body>
    </html>
  )
}
