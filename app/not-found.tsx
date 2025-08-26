import Link from 'next/link'

// =============================================================================
// 404 NOT FOUND PAGE COMPONENT
// =============================================================================
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon/Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        {/* Error Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h2>

        {/* Error Description */}
        <p className="text-lg text-gray-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Voltar ao Início
          </Link>
          
          <Link
            href="/quiz"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Fazer Quiz
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Páginas populares:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/" className="text-primary-600 hover:text-primary-500">
              Home
            </Link>
            <Link href="/quiz" className="text-primary-600 hover:text-primary-500">
              Quiz
            </Link>
            <Link href="/sobre" className="text-primary-600 hover:text-primary-500">
              Sobre
            </Link>
            <Link href="/contato" className="text-primary-600 hover:text-primary-500">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}