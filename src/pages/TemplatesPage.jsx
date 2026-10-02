import { useNavigate } from 'react-router-dom';
import { useI18n } from '../shared/hooks/useI18n.js';
import {
  CheckCircle,
  ListChecks,
  PenLine,
  Shuffle,
  FileText,
  Sparkles,
  ArrowRight,
  BookOpen,
  Lock,
} from 'lucide-react';

const TemplatesPage = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

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
      gradient: 'from-brand-400 to-emerald-500',
      shadowColor: 'shadow-brand-500/20',
      lightBg: 'bg-brand-50',
      lightBorder: 'border-brand-100',
      lightText: 'text-brand-700',
      badgeBg: 'bg-brand-50 text-brand-700',
      btnGradient: 'from-brand-500 to-emerald-500 hover:from-brand-600 hover:to-emerald-600',
      available: true,
    },
    {
      id: 2,
      type: 'True/False',
      title: "Ha / Yo'q",
      description: "To'g'ri yoki noto'g'ri javobli savollar. Tez test uchun ideal.",
      options: ["To'g'ri", "Noto'g'ri"],
      icon: CheckCircle,
      gradient: 'from-blue-400 to-indigo-500',
      shadowColor: 'shadow-blue-500/20',
      lightBg: 'bg-blue-50',
      lightBorder: 'border-blue-100',
      lightText: 'text-blue-700',
      badgeBg: 'bg-blue-50 text-blue-700',
      btnGradient: 'from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
      available: true,
    },
    {
      id: 3,
      type: 'Fill in the Blanks',
      title: "Bo'sh joyni to'ldiring",
      description: "O'quvchilar javobni yozib to'ldiradi. Bilim chuqurligini tekshirish uchun.",
      options: ['_____'],
      icon: PenLine,
      gradient: 'from-violet-400 to-purple-500',
      shadowColor: 'shadow-violet-500/20',
      lightBg: 'bg-violet-50',
      lightBorder: 'border-violet-100',
      lightText: 'text-violet-700',
      badgeBg: 'bg-violet-50 text-violet-700',
      btnGradient: 'from-violet-500 to-purple-500',
      available: false,
    },
    {
      id: 4,
      type: 'Matching',
      title: 'Moslashtirish',
      description: "Chap ustunni o'ng ustunga moslashtiring. Terminlar va ta'riflar uchun.",
      options: ['Term → Taʼrif'],
      icon: Shuffle,
      gradient: 'from-amber-400 to-orange-500',
      shadowColor: 'shadow-amber-500/20',
      lightBg: 'bg-amber-50',
      lightBorder: 'border-amber-100',
      lightText: 'text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-700',
      btnGradient: 'from-amber-500 to-orange-500',
      available: false,
    },
    {
      id: 5,
      type: 'Short Answer',
      title: "Qisqa javob",
      description: "O'quvchilar qisqa javob yozadi. Fikrlash qobiliyatini baholash uchun.",
      options: ['Javob matni...'],
      icon: FileText,
      gradient: 'from-rose-400 to-pink-500',
      shadowColor: 'shadow-rose-500/20',
      lightBg: 'bg-rose-50',
      lightBorder: 'border-rose-100',
      lightText: 'text-rose-700',
      badgeBg: 'bg-rose-50 text-rose-700',
      btnGradient: 'from-rose-500 to-pink-500',
      available: false,
    },
    {
      id: 6,
      type: 'Mixed',
      title: 'Aralash test',
      description: "Turli turdagi savollar aralashgan test. Eng keng qamrovli baholash.",
      options: ['MCQ + Ha/Yoq + Qisqa javob'],
      icon: Sparkles,
      gradient: 'from-teal-400 to-cyan-500',
      shadowColor: 'shadow-teal-500/20',
      lightBg: 'bg-teal-50',
      lightBorder: 'border-teal-100',
      lightText: 'text-teal-700',
      badgeBg: 'bg-teal-50 text-teal-700',
      btnGradient: 'from-teal-500 to-cyan-500',
      available: false,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-brand-50/20 to-blue-50/20" />
      <div className="absolute top-20 -right-20 w-72 h-72 bg-brand-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="animate-slide-up stagger-1 inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-brand-700 text-sm font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Tayyor shablonlar
          </div>
          <h1 className="animate-slide-up stagger-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Test{' '}
            <span className="bg-gradient-to-r from-brand-500 to-emerald-500 bg-clip-text text-transparent">
              Shablonlari
            </span>
          </h1>
          <p className="animate-slide-up stagger-3 text-gray-500 max-w-lg mx-auto">
            Tayyor shablonlardan foydalanib tezda test yarating! O'zingizga mos turni tanlang.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, idx) => {
            const Icon = template.icon;

            return (
              <div
                key={template.id}
                className={`animate-slide-up stagger-${Math.min(idx + 1, 6)} group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col ${
                  template.available ? 'hover:-translate-y-2 cursor-pointer' : 'opacity-85'
                }`}
                onClick={() => template.available && handleUseTemplate(template)}
              >
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${template.gradient}`} />

                <div className="p-6 flex flex-col flex-grow">
                  {/* Coming Soon Badge */}
                  {!template.available && (
                    <div className="absolute top-5 right-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        <Lock className="w-3 h-3" />
                        Tez orada
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${template.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg ${template.shadowColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
                    {template.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4 flex-grow leading-relaxed">
                    {template.description}
                  </p>

                  {/* Type Badge */}
                  <div className="mb-5">
                    <span className={`inline-block px-3 py-1 ${template.badgeBg} text-xs font-semibold rounded-full`}>
                      {template.type}
                    </span>
                  </div>

                  {/* Action */}
                  {template.available ? (
                    <button
                      className={`w-full bg-gradient-to-r ${template.btnGradient} text-white py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.97] cursor-pointer`}
                    >
                      <span>Foydalanish</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-50 text-gray-400 py-3 rounded-2xl text-sm font-semibold cursor-not-allowed border border-gray-100"
                    >
                      Tez orada qo'shiladi
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
