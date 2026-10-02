import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListChecks, CheckCircle, PenLine, ArrowRight, BookOpen } from 'lucide-react';
import { useI18n } from '../shared/hooks/useI18n.js';

function Templates() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const templates = [
    {
      title: 'Multiple Choice Test',
      desc: "A/B/C/D variantli savollar",
      icon: ListChecks,
      gradient: 'from-brand-400 to-emerald-500',
      shadowColor: 'shadow-brand-500/20',
      lightBg: 'bg-brand-50',
      lightText: 'text-brand-700',
    },
    {
      title: "Ha / Yo'q Test",
      desc: "To'g'ri yoki noto'g'ri javoblar",
      icon: CheckCircle,
      gradient: 'from-blue-400 to-indigo-500',
      shadowColor: 'shadow-blue-500/20',
      lightBg: 'bg-blue-50',
      lightText: 'text-blue-700',
    },
    {
      title: "Bo'sh joy to'ldirish",
      desc: "Javobni yozib to'ldirish",
      icon: PenLine,
      gradient: 'from-violet-400 to-purple-500',
      shadowColor: 'shadow-violet-500/20',
      lightBg: 'bg-violet-50',
      lightText: 'text-violet-700',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="animate-slide-up stagger-1 inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-brand-700 text-sm font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Tayyor shablonlar
          </div>
          <h2 className="animate-slide-up stagger-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Test{' '}
            <span className="bg-gradient-to-r from-brand-500 to-emerald-500 bg-clip-text text-transparent">
              Shablonlari
            </span>
          </h2>
          <p className="animate-slide-up stagger-3 text-gray-500 text-lg">
            Tayyor shablonlardan foydalanib daqiqalar ichida professional test yarating
          </p>
        </div>

        {/* Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {templates.map((tpl, idx) => {
            const Icon = tpl.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate('/templates')}
                className={`animate-slide-up stagger-${idx + 2} group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${tpl.gradient}`} />

                <div className="p-7">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${tpl.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg ${tpl.shadowColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{tpl.desc}</p>

                  {/* CTA */}
                  <div className={`inline-flex items-center gap-1.5 ${tpl.lightText} text-sm font-semibold group-hover:gap-3 transition-all`}>
                    Ko'rish
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Templates;
