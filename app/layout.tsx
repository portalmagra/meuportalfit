// CLAUDE: Layout principal - versão mais completa com CSS
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata = {
  title: 'MeuPortalFit - Portal de Wellness para Brasileiros nos EUA',
  description: 'Descubra produtos Amazon personalizados para suas necessidades de saúde e bem-estar. Análise IA gratuita, produtos por área e suporte personalizado.',
  keywords: 'wellness, saúde, suplementos, Amazon, brasileiros EUA, IA, análise personalizada',
  openGraph: {
    title: 'MeuPortalFit - Portal de Wellness para Brasileiros nos EUA',
    description: 'Descubra produtos Amazon personalizados para suas necessidades de saúde e bem-estar.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
