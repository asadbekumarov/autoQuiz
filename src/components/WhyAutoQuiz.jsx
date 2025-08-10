import React from 'react'
import { CiClock2 } from "react-icons/ci";
import { PiLightningLight } from "react-icons/pi";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";

function WhyAutoQuiz() {
    return (
        <section>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center my-8">
                    Nima uchun AutoQuiz?
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Zamonaviy texnologiyalar yordamida test yaratish jarayonini soddalashtiramiz
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-16 max-w-7xl mx-auto">
                    {/* 1 - Tez va Oson */}
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-lg flex flex-col items-center hover:shadow-xl transition duration-300">
                        <CiClock2 className="text-4xl text-green-700 bg-green-100 p-4 rounded-full w-20 h-20 mb-6" />
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Tez va Oson</h4>
                        <p className="text-gray-600 text-center">
                            5 daqiqada professional test yarating. Hech qanday murakkab sozlamalar kerak emas.
                        </p>
                    </div>

                    {/* 2 - Zamonaviy Dizayn */}
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-lg flex flex-col items-center hover:shadow-xl transition duration-300">
                        <PiLightningLight className="text-4xl text-blue-700 bg-blue-100 p-4 rounded-full w-20 h-20 mb-6" />
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Zamonaviy Dizayn</h4>
                        <p className="text-gray-600 text-center">
                            Chiroyli va professional ko‘rinishga ega testlar yarating.
                        </p>
                    </div>

                    {/* 3 - Xavfsiz Saqlash */}
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-lg flex flex-col items-center hover:shadow-xl transition duration-300">
                        <AiTwotoneSafetyCertificate className="text-4xl text-fuchsia-700 bg-fuchsia-100 p-4 rounded-full w-20 h-20 mb-6" />
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Xavfsiz Saqlash</h4>
                        <p className="text-gray-600 text-center">
                            Barcha testlaringiz xavfsiz saqlanadi va istalgan vaqtda kirishingiz mumkin.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default WhyAutoQuiz