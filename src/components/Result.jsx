import React from 'react';
import { useI18n } from '../shared/hooks/useI18n.js';
import { FileText, Users, Award } from 'lucide-react';

function Result() {
  const { t } = useI18n();

  const stats = [
    {
      icon: FileText,
      value: '1,247',
      label: 'Yaratilgan testlar',
      gradient: 'from-brand-400 to-emerald-500',
      shadowColor: 'shadow-brand-500/20',
    },
    {
      icon: Users,
      value: '523',
      label: "O'qituvchilar",
      gradient: 'from-blue-400 to-indigo-500',
      shadowColor: 'shadow-blue-500/20',
    },
    {
      icon: Award,
      value: '89',
      label: 'Saqlangan andozalar',
      gradient: 'from-amber-400 to-orange-500',
      shadowColor: 'shadow-amber-500/20',
    },
  ];

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`animate-slide-up stagger-${i + 1} group bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 text-center`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg ${s.shadowColor} mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1 animate-count-up">{s.value}</p>
                <p className="text-sm text-gray-500 font-medium">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Result;