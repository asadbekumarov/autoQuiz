import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ListChecks, CheckCircle, PenLine, ArrowRight } from 'lucide-react'

function Templates() {
    const navigate = useNavigate();

    const templates = [
        {
            title: 'Multiple Choice Test',
            desc: 'A/B/C/D variantli savollar',
            icon: ListChecks,
            color: 'green',
            img: 'https://images.pexels.com/photos/6238020/pexels-photo-6238020.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
        },
        {
            title: "Ha / Yo'q Test",
            desc: "To'g'ri yoki noto'g'ri javoblar",
            icon: CheckCircle,
            color: 'blue',
            img: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
        },
        {
            title: "Bo'sh joy to'ldirish",
            desc: "Javobni yozib to'ldirish",
            icon: PenLine,
            color: 'purple',
            img: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
        },
    ];

    const colorMap = {
        green: 'bg-green-600 hover:bg-green-700',
        blue: 'bg-blue-600 hover:bg-blue-700',
        purple: 'bg-purple-600 hover:bg-purple-700',
    };

    return (
        <section className='bg-gray-50 py-16'>
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        Test Shablonlari
                    </h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Tayyor shablonlardan foydalanib daqiqalar ichida professional test yarating
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {templates.map((tpl, idx) => {
                        const Icon = tpl.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                            >
                                <img
                                    src={tpl.img}
                                    alt={tpl.title}
                                    className="w-full h-44 object-cover"
                                    loading="lazy"
                                    decoding="async"
                                    width="600"
                                    height="400"
                                />
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon className={`w-5 h-5 text-${tpl.color}-600`} />
                                        <h4 className="text-lg font-bold text-gray-800">{tpl.title}</h4>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4">{tpl.desc}</p>
                                    <button
                                        onClick={() => navigate('/templates')}
                                        className={`w-full ${colorMap[tpl.color]} text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer`}
                                    >
                                        <span>Tanlash</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Templates
