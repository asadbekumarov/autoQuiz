// src/pages/TemplatesPage.jsx
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  ListChecks, 
  PenLine, 
  Shuffle, 
  FileText, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';

const TemplatesPage = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (template) => {
    localStorage.setItem('templateToUse', JSON.stringify(template));
    navigate('/create');
  };

  const templates = [
    {
      id: 1,
      type: 'Multiple Choice',
      title: 'Multiple Choice',
      description: "A/B/C/D variantli savollar. Har bir savolda bitta to'g'ri javob.",
      options: ['Variant A', 'Variant B', 'Variant C', 'Variant D'],
      icon: ListChecks,
      color: 'green',
      available: true,
    },
    {
      id: 2,
      type: 'True/False',
      title: "Ha / Yo'q",
      description: "To'g'ri yoki noto'g'ri javobli savollar. Tez test uchun ideal.",
      options: ["To'g'ri", "Noto'g'ri"],
      icon: CheckCircle,
      color: 'blue',
      available: true,
    },
    {
      id: 3,
      type: 'Fill in the Blanks',
      title: "Bo'sh joyni to'ldiring",
      description: "O'quvchilar javobni yozib to'ldiradi. Bilim chuqurligini tekshirish uchun.",
      options: ['_____'],
      icon: PenLine,
      color: 'purple',
      available: false,
    },
    {
      id: 4,
      type: 'Matching',
      title: 'Moslashtirish',
      description: "Chap ustunni o'ng ustunga moslashtiring. Terminlar va ta'riflar uchun.",
      options: ['Term → Taʼrif'],
      icon: Shuffle,
      color: 'amber',
      available: false,
    },
    {
      id: 5,
      type: 'Short Answer',
      title: "Qisqa javob",
      description: "O'quvchilar qisqa javob yozadi. Fikrlash qobiliyatini baholash uchun.",
      options: ['Javob matni...'],
      icon: FileText,
      color: 'rose',
      available: false,
    },
    {
      id: 6,
      type: 'Mixed',
      title: 'Aralash test',
      description: "Turli turdagi savollar aralashgan test. Eng keng qamrovli baholash.",
      options: ['MCQ + Ha/Yoq + Qisqa javob'],
      icon: Sparkles,
      color: 'teal',
      available: false,
    },
  ];

  const colorMap = {
    green: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      border: 'border-green-200',
      btnBg: 'bg-green-600 hover:bg-green-700',
      badge: 'bg-green-100 text-green-700',
    },
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      border: 'border-blue-200',
      btnBg: 'bg-blue-600 hover:bg-blue-700',
      badge: 'bg-blue-100 text-blue-700',
    },
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
      border: 'border-purple-200',
      btnBg: 'bg-purple-600 hover:bg-purple-700',
      badge: 'bg-purple-100 text-purple-700',
    },
    amber: {
      bg: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      iconText: 'text-amber-600',
      border: 'border-amber-200',
      btnBg: 'bg-amber-600 hover:bg-amber-700',
      badge: 'bg-amber-100 text-amber-700',
    },
    rose: {
      bg: 'bg-rose-50',
      iconBg: 'bg-rose-100',
      iconText: 'text-rose-600',
      border: 'border-rose-200',
      btnBg: 'bg-rose-600 hover:bg-rose-700',
      badge: 'bg-rose-100 text-rose-700',
    },
    teal: {
      bg: 'bg-teal-50',
      iconBg: 'bg-teal-100',
      iconText: 'text-teal-600',
      border: 'border-teal-200',
      btnBg: 'bg-teal-600 hover:bg-teal-700',
      badge: 'bg-teal-100 text-teal-700',
    },
  };

  return (
    <div className="bg-gradient-to-br from-green-50/50 via-gray-50 to-blue-50/30 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            Tayyor shablonlar
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Test Shablonlari
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Tayyor shablonlardan foydalanib tezda test yarating! O'zingizga mos turni tanlang.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => {
            const colors = colorMap[template.color];
            const Icon = template.icon;

            return (
              <div
                key={template.id}
                className={`relative bg-white rounded-2xl border ${colors.border} p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 ${
                  template.available ? 'cursor-pointer' : 'opacity-80'
                }`}
                onClick={() => template.available && handleUseTemplate(template)}
              >
                {/* Coming Soon Badge */}
                {!template.available && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">
                      Tez orada
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${colors.iconText}`} />
                </div>

                {/* Content */}
                <h2 className="text-lg font-bold text-gray-900 mb-1.5">{template.title}</h2>
                <p className="text-gray-500 text-sm mb-4 flex-grow leading-relaxed">{template.description}</p>

                {/* Type Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 ${colors.badge} text-xs font-semibold rounded-full`}>
                    {template.type}
                  </span>
                </div>

                {/* Action */}
                {template.available ? (
                  <button
                    className={`w-full ${colors.btnBg} text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer`}
                  >
                    <span>Foydalanish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed"
                  >
                    Tez orada qo'shiladi
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
