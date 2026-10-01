import React from 'react'
import { CiClock2 } from "react-icons/ci";
import { PiLightningLight } from "react-icons/pi";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";

function WhyAutoQuiz() {
    const features = [
        {
            icon: CiClock2,
            title: 'Tez va Oson',
            desc: '5 daqiqada professional test yarating. Hech qanday murakkab sozlamalar kerak emas.',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-700',
            hoverBorder: 'hover:border-green-300',
        },
        {
            icon: PiLightningLight,
            title: 'Zamonaviy Dizayn',
            desc: "Chiroyli va professional ko'rinishga ega testlar yarating.",
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-700',
            hoverBorder: 'hover:border-blue-300',
        },
        {
            icon: AiTwotoneSafetyCertificate,
            title: 'Xavfsiz Saqlash',
            desc: "Barcha testlaringiz xavfsiz saqlanadi va istalgan vaqtda kirishingiz mumkin.",
            iconBg: 'bg-fuchsia-100',
            iconColor: 'text-fuchsia-700',
            hoverBorder: 'hover:border-fuchsia-300',
        },
    ];

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
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={i}
                                className={`bg-gray-50 p-8 rounded-2xl shadow-lg border border-transparent ${f.hoverBorder} flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default`}
                            >
                                <Icon className={`text-4xl ${f.iconColor} ${f.iconBg} p-4 rounded-full w-20 h-20 mb-6`} />
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">{f.title}</h4>
                                <p className="text-gray-600 text-center">{f.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default WhyAutoQuiz