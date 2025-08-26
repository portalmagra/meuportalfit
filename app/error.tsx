'use client'

export default function Error({ error, reset }: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Erro!</h1>
        <p className="text-gray-600 mb-4">Algo deu errado</p>
        <button 
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  )
}