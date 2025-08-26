export default function Testimonials() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            O que nossos usuários estão falando
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-soft">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    👩‍💼
                  </div>
                  <div>
                    <div className="font-semibold">Maria Santos</div>
                    <div className="text-sm text-gray-600">Dallas, TX</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Encontrei exatamente o que precisava. O quiz é incrível!"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {'★'.repeat(5)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
