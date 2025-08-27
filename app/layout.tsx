// CLAUDE: Layout principal - versão mais completa com CSS
import './globals.css'

export const metadata = {
  title: 'MeuPortalFit',
  description: 'Quiz personalizado para brasileiros nos EUA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
