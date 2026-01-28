import React from 'react'
import { useNavigate } from 'react-router-dom'

function Templates() {
    const navigate = useNavigate();

    return (
        <section className='bg-gray-50 flex items-center justify-center'>
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-between p-4">
                <div>
                    <h2 className="text-3xl text-center font-bold text-gray-800 mb-4">
                        Test Shablonlari
                    </h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Multiple Choice (A/B/C/D) test shablonidan foydalaning
                    </p>
                    <div className="flex justify-center px-4 py-12 max-w-7xl mx-auto">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden max-w-sm">
                            <img
                                src="https://images.pexels.com/photos/6238020/pexels-photo-6238020.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                                alt="Multiple Choice Test"
                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                loading="lazy"
                                decoding="async"
                                fetchpriority="low"
                                width="600"
                                height="400"
                            />
                            <div className="p-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">Multiple Choice Test</h4>
                                <p className="text-gray-600 mb-4">A/B/C/D variantli savollar</p>
                                <button
                                    onClick={() => navigate('/templates')}
                                    className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors w-full"
                                >
                                    Tanlash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Templates
