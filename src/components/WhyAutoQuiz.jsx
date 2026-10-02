import React, { useRef, useState } from 'react';
import { useI18n } from '../shared/hooks/useI18n.js';
import { Clock, Zap, Shield } from 'lucide-react';

/* ── Interactive 3D Tilt Card ── */
function Tilt3DCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px) scale(1.03)`,
      transition: 'transform 0.1s ease-out',
    });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    });
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mouse-tracking radial glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

function WhyAutoQuiz() {
  const { t } = useI18n();

  const features = [
    {
      icon: Clock,
      title: "Tez va Oson",
      desc: "5 daqiqada professional test yarating. Hech qanday murakkab sozlamalar kerak emas.",
      gradient: 'from-brand-400 to-emerald-500',
      shadowColor: 'shadow-brand-500/20',
      bgGlow: 'bg-brand-100/40',
    },
    {
      icon: Zap,
      title: "Zamonaviy Dizayn",
      desc: "Chiroyli va professional ko'rinishga ega testlar yarating.",
      gradient: 'from-blue-400 to-indigo-500',
      shadowColor: 'shadow-blue-500/20',
      bgGlow: 'bg-blue-100/40',
    },
    {
      icon: Shield,
      title: "Xavfsiz Saqlash",
      desc: "Barcha testlaringiz xavfsiz saqlanadi va istalgan vaqtda kirishingiz mumkin.",
      gradient: 'from-violet-400 to-purple-500',
      shadowColor: 'shadow-violet-500/20',
      bgGlow: 'bg-violet-100/40',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-50/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="animate-slide-up stagger-1 inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-brand-700 text-sm font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            Bizning afzalliklarimiz
          </div>
          <h2 className="animate-slide-up stagger-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Nima uchun{' '}
            <span className="bg-gradient-to-r from-brand-500 to-emerald-500 bg-clip-text text-transparent">
              AutoQuiz?
            </span>
          </h2>
          <p className="animate-slide-up stagger-3 text-gray-500 text-lg">
            Zamonaviy texnologiyalar yordamida test yaratish jarayonini soddalashtiramiz
          </p>
        </div>

        {/* Feature Cards with 3D tilt */}
        <div className="perspective-container grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Tilt3DCard
                key={i}
                className={`animate-slide-up stagger-${i + 2} group bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow duration-500 cursor-default`}
              >
                <div className="relative z-10">
                  {/* Icon with 3D depth */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg ${f.shadowColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ transform: 'translateZ(10px)' }}>
                    {f.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed" style={{ transform: 'translateZ(5px)' }}>
                    {f.desc}
                  </p>
                </div>
              </Tilt3DCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyAutoQuiz;