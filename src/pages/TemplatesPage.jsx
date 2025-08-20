// src/pages/TemplatesPage.js
import React from 'react';
import { FiDownload, FiBookOpen, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TemplatesPage = () => {
    const navigate = useNavigate();

    // Shablonlar
    const templates = [
        {
            id: 1,
            title: 'Matematika: Algebra',
            subject: 'Matematika',
            level: 'O\'rta',
            questionsCount: 5,
            color: 'bg-blue-500',
            icon: '🧮',
            questions: [
                { text: '2x + 3 = 7. x ni toping?', answers: ['x = 2', 'x = 3', 'x = 4', 'x = 1'] },
                { text: 'Kvadrat tenglama: x² - 5x + 6 = 0 ning ildizlari?', answers: ['2 va 3', '1 va 6', '4 va 1', '5 va 0'] },
                { text: '3² + 4² = ?', answers: ['25', '14', '9', '16'] },
                { text: 'Doira yuzini hisoblash formulasini toping?', answers: ['S = πr²', 'S = 2πr', 'S = r²', 'S = 2r'] },
                { text: 'To‘g‘ri burchakli uchburchakda Pifagor teoremasi qanday ifodalanadi?', answers: ['c² = a² + b²', 'a + b = c', 'a² - b² = c²', 'a + b² = c'] },
            ],
        },
        {
            id: 2,
            title: 'Biologiya: Hujayra tuzilishi',
            subject: 'Biologiya',
            level: 'Oliy',
            questionsCount: 4,
            color: 'bg-green-500',
            icon: '🔬',
            questions: [
                { text: 'Hujayraning nafas olish markazi?', answers: ['Mitoxondriya', 'Lizosoma', 'Ribosoma', 'Yadro'] },
                { text: 'Fotosintez qayerda amalga oshadi?', answers: ['Xloroplast', 'Mitoxondriya', 'Golji apparati', 'Endoplazmatik tarmoq'] },
                { text: 'DNK qayerda saqlanadi?', answers: ['Yadro', 'Ribosoma', 'Membrana', 'Sitoplazma'] },
                { text: 'Hujayra qobig‘i nima bilan qoplangan?', answers: ['Sellyuloza', 'Kilatka', 'Xitin', 'Lipid'] },
            ],
        },
        {
            id: 3,
            title: 'Tarix: O‘zbekiston mustaqilligi',
            subject: 'Tarix',
            level: 'Boshlang‘ich',
            questionsCount: 3,
            color: 'bg-red-500',
            icon: '📜',
            questions: [
                { text: 'O‘zbekiston mustaqilligini qachon e’lon qildi?', answers: ['1991-yil 31-avgust', '1990-yil 27-dekabr', '1992-yil 1-yanvar', '1989-yil 15-iyun'] },
                { text: 'Mustaqillik Konstitutsiyasiga qachon ega bo‘ldi?', answers: ['1992-yil', '1991-yil', '1995-yil', '2000-yil'] },
                { text: 'O‘zbekiston Respublikasi bayrog‘ida qanday ranglar mavjud?', answers: ['Ko‘k, oq, yashil, sariq', 'Qizil, sariq, oq', 'Ko‘k, qizil, yashil', 'Sariq, yashil, qora'] },
            ],
        },
        {
            id: 4,
            title: 'Ingliz tili: Beginner Level',
            subject: 'Ingliz tili',
            level: 'Boshlang‘ich',
            questionsCount: 4,
            color: 'bg-purple-500',
            icon: '🇬🇧',
            questions: [
                { text: '“Apple” so‘zining ma’nosini toping?', answers: ['Olma', 'Banan', 'Uzum', 'Anor'] },
                { text: '“Good morning” nimani anglatadi?', answers: ['Xayrli tong', 'Xayrli kech', 'Salom', 'Xayrli kun'] },
                { text: '“I am from Uzbekistan” tarjimasi?', answers: ['Men O‘zbekistondanman', 'Men o‘qiyapman', 'Men ishlayapman', 'Men yaxshiman'] },
                { text: '“Book” so‘zi qaysi so‘zga sinonim?', answers: ['Kitob', 'Ruchka', 'Doska', 'Stol'] },
            ],
        },
    ];

    const handleUseTemplate = (template) => {
        // Shablonni localga saqlash orqali CreateTest sahifasiga o'tkazish
        localStorage.setItem('templateToUse', JSON.stringify(template));
        navigate('/create');
    };

    return (
        <div className="bg-green-50 min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">🎨 Test Shablonlari</h1>
                <p className="text-center text-gray-600 mb-8">Tayyor shablonlardan foydalanib tezda test yarating!</p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 flex flex-col"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 ${template.color} text-white rounded-lg`}>
                                    {template.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{template.title}</h2>
                                    <p className="text-sm text-gray-500">{template.subject} • {template.level} daraja</p>
                                </div>
                            </div>

                            <div className="mb-4 text-sm text-gray-600">
                                <FiBookOpen className="inline w-4 h-4 mr-1" />
                                {template.questionsCount} ta savol
                            </div>

                            <ul className="space-y-1 text-sm text-gray-700 mb-4 pl-5 list-disc">
                                {template.questions.slice(0, 3).map((q, i) => (
                                    <li key={i}>{q.text.length > 60 ? q.text.slice(0, 60) + '...' : q.text}</li>
                                ))}
                                {template.questions.length > 3 && <li className="text-gray-500">+{template.questions.length - 3} boshqa savol</li>}
                            </ul>

                            <button
                                onClick={() => handleUseTemplate(template)}
                                className="mt-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                            >
                                <FiDownload className="w-4 h-4" /> Shablonni ishlatish
                            </button>
                        </div>
                    ))}
                </div>

                {/* Maslahat */}
                <div className="mt-10 text-center text-gray-500">
                    <p className="flex items-center justify-center gap-2">
                        <FiCheckCircle className="w-5 h-5 text-green-500" />
                        Shablonni ishlatish — test yaratishni 2 marta tezlashtiradi!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TemplatesPage;