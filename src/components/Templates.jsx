import React from 'react'

function Templates() {
    return (
        <section className='bg-gray-50 flex items-center justify-center'>
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                <div>
                    <h2 className="text-3xl text-center font-bold text-gray-800 mb-4">
                        Tayyor Shablonlar
                    </h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Turli fanlar uchun maxsus tayyorlangan shablonlardan foydalaning
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-12 max-w-7xl mx-auto">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                            <img
                                src="https://images.pexels.com/photos/6238020/pexels-photo-6238020.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                                alt="Matematika testi"
                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="p-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Matematika testi</h4>
                                <p className="text-gray-600 mb-4">Algebra va geometriya savollar uchun</p>
                                <a href="#" className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                                    Tanlash
                                </a>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                            <img
                                src="https://images.pexels.com/photos/6238020/pexels-photo-6238020.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                                alt="Ona tili testi"
                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="p-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Ona tili testi</h4>
                                <p className="text-gray-600 mb-4">O‘zbek tili grammatika va imlo</p>
                                <a href="#" className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                                    Tanlash
                                </a>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                            <img
                                src="https://images.pexels.com/photos/6238020/pexels-photo-6238020.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                                alt="Tarix testi"
                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="p-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Tarix testi</h4>
                                <p className="text-gray-600 mb-4">O‘zbekiston tarixi va jahon tarixi</p>
                                <a href="#" className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                                    Tanlash
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Templates