import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Book,
  Zap,
  Shield,
  Clock,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Printer,
  Layers,
  Star,
} from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-green-50 text-green-600',
      title: "Tez va Oson",
      desc: "Atigi 5 daqiqada professional test yarating. Hech qanday murakkab sozlamalar kerak emas.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-blue-50 text-blue-600',
      title: "Zamonaviy Shablon",
      desc: "A/B/C/D ko\u02BBrinishidagi chiroyli Multiple Choice shablonlari tayyor \u2014 faqat savollaringizni kiriting.",
    },
    {
      icon: <Printer className="w-6 h-6" />,
      color: 'bg-orange-50 text-orange-600',
      title: "Chop Etish",
      desc: "Yaratilgan testni bir tugma bosish orqali PDF sifatida yuklab oling yoki to\u02BBg\u02BBridan-to\u02BBg\u02BBri chop eting.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-purple-50 text-purple-600',
      title: "Xavfsiz Saqlash",
      desc: "Barcha testlaringiz hisobingizda saqlanadi va istalgan vaqtda qayta foydalanishingiz mumkin.",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      color: 'bg-teal-50 text-teal-600',
      title: "Tayyor Shablonlar",
      desc: "Oldindan tayyorlangan shablonlardan foydalaning \u2014 vaqtingizni tejang, sifatni oshiring.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      color: 'bg-yellow-50 text-yellow-600',
      title: "Professional Natija",
      desc: "Excel yoki Wordga ehtiyoj yo\u02BBq. Har bir test toza, professional va chop etishga tayyor holda chiqadi.",
    },
  ];

  const steps = [
    {
      number: '01',
      title: "Shablonni tanlang",
      desc: "O\u02BBzingizga ma\u02BCluq bo\u02BBlgan yoki tayyor test shablonlaridan birini tanlang.",
    },
    {
      number: '02',
      title: "Test yarating",
      desc: "Savolingizni kiriting, A/B/C/D variantlarni to\u02BBldiing va to\u02BBg\u02BBri javobni belgilang.",
    },
    {
      number: '03',
      title: "Chop eting yoki saqlang",
      desc: "Testni PDF sifatida yuklab oling yoki keyinroq foydalanish uchun saqlang.",
    },
  ];

  const stats = [
    { icon: <FileText className="w-8 h-8" />, value: '1,247', label: "Yaratilgan testlar" },
    { icon: <Users className="w-8 h-8" />, value: '523', label: "Faol o\u02BBqituvchilar" },
    { icon: <CheckCircle className="w-8 h-8" />, value: '89', label: "Tayyor shablonlar" },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Book className="w-4 h-4" />
            AutoQuiz haqida
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            O&#x02BB;qituvchilar uchun{' '}
            <span className="text-green-600">aqlli test</span> yaratish platformasi
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            AutoQuiz &#x2014; o&#x02BB;qituvchilarga professional testlarni tez, oson va sifatli yaratishga
            yordam beradigan zamonaviy vosita. Excel va Wordga xayrlashing &#x2014; hamma narsa bir joyda!
          </p>
          <button
            onClick={() => navigate('/create')}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-7 rounded-xl shadow-md transition-colors duration-300"
          >
            Test yaratishni boshlash
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 px-4 border-y border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                  {s.icon}
                </div>
                <p className="text-4xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Nima uchun AutoQuiz?</h2>
            <p className="text-gray-500 text-lg">
              Zamonaviy texnologiyalar yordamida test yaratish jarayonini soddalashtiramiz
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4"
              >
                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Qanday ishlaydi?</h2>
            <p className="text-gray-500 text-lg">Faqat 3 ta qadam &#x2014; va testingiz tayyor!</p>
          </div>
          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center text-lg font-extrabold shadow-md">
                  {step.number}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
