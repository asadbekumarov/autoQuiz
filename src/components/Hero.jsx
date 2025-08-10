import React from 'react'

function Hero() {
    return (
        <main className='bg-green-50 flex items-center justify-center'>
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                <div className="mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
                    <h1 className="font-extrabold text-4xl leading-tight text-gray-800">
                        Testlarni yaratish endi <span className="text-green-600">5 daqiqada!</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600">
                        Excel, Word o‘rniga zamonaviy va qulay tizim. Professional testlarni bir necha daqiqada yarating va chop eting.
                    </p>
                    <button className="mt-8 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-md">
                        Boshlash
                    </button>
                </div>

            </div >
        </main >
    )
}

export default Hero