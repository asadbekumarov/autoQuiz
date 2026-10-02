import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, FileText, Users, Zap, CheckCircle, BookOpen, PenLine } from 'lucide-react';
import { useI18n } from '../shared/hooks/useI18n.js';

/* ── Interactive 3D Tilt Card ── */
function TiltCard({ children, className = '', intensity = 15 }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

/* ── Floating 3D Particles ── */
function FloatingParticles() {
  const particles = [
    { size: 'w-3 h-3', color: 'bg-brand-300', top: '15%', left: '10%', delay: '0s', duration: '4s' },
    { size: 'w-2 h-2', color: 'bg-emerald-300', top: '25%', right: '15%', delay: '1s', duration: '5s' },
    { size: 'w-4 h-4', color: 'bg-blue-200', bottom: '30%', left: '20%', delay: '2s', duration: '6s' },
    { size: 'w-2.5 h-2.5', color: 'bg-amber-300', top: '60%', right: '25%', delay: '0.5s', duration: '4.5s' },
    { size: 'w-1.5 h-1.5', color: 'bg-violet-300', top: '40%', left: '5%', delay: '1.5s', duration: '5.5s' },
    { size: 'w-3 h-3', color: 'bg-teal-200', bottom: '20%', right: '10%', delay: '3s', duration: '7s' },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.size} ${p.color} rounded-full animate-particle opacity-40 blur-[1px]`}
          style={{
            top: p.top, left: p.left, right: p.right, bottom: p.bottom,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </>
  );
}

function Hero() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-brand-50/30 to-emerald-50/40" />

      {/* Decorative Blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-100/20 to-emerald-100/20 rounded-full blur-3xl" />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="animate-slide-up stagger-1 inline-flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-100 rounded-full text-brand-700 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI bilan test yaratish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>

            {/* Heading */}
            <h1 className="animate-slide-up stagger-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Testlarni yaratish
              <br />
              endi{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-brand-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-gradient">
                  5 daqiqada!
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#10b981"/>
                      <stop offset="100%" stopColor="#14b8a6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-slide-up stagger-3 mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Excel, Word o'rniga zamonaviy va qulay tizim. Professional testlarni bir necha daqiqada yarating va chop eting.
            </p>

            {/* CTA Buttons */}
            <div className="animate-slide-up stagger-4 mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => navigate('/create')}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-brand-500 to-emerald-500 hover:from-brand-600 hover:to-emerald-600 text-white text-base font-semibold rounded-2xl shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-300 active:scale-[0.97] cursor-pointer overflow-hidden"
              >
                <span className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Boshlash
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => navigate('/templates')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-gray-50 text-gray-700 text-base font-semibold rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.97] cursor-pointer"
              >
                <FileText className="w-5 h-5 text-gray-400" />
                Shablonlarni ko'rish
              </button>
            </div>

            {/* Social Proof */}
            <div className="animate-slide-up stagger-5 mt-10 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['bg-brand-400', 'bg-blue-400', 'bg-purple-400', 'bg-orange-400'].map((bg, i) => (
                    <div key={i} className={`w-8 h-8 ${bg} rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">500+</p>
                  <p className="text-xs text-gray-400">O'qituvchilar</p>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
                <span className="text-sm font-bold text-gray-900 ml-1">4.9</span>
              </div>
            </div>
          </div>

          {/* ── Right Side — 3D Animated Test Card ── */}
          <div className="hidden lg:block perspective-container">
            <div className="relative">
              {/* Main 3D Test Card — Levitating */}
              <TiltCard className="relative z-10" intensity={12}>
                <div className="animate-levitate glass rounded-3xl p-1 shadow-2xl border border-white/40">
                  {/* Test Preview Card */}
                  <div className="bg-white rounded-[20px] overflow-hidden">
                    {/* Header stripe */}
                    <div className="h-2 bg-gradient-to-r from-brand-400 via-emerald-400 to-teal-400" />

                    <div className="p-6">
                      {/* Test Header */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">Fizika — 9-sinf</p>
                            <p className="text-[10px] text-gray-400 font-medium">1-chorak nazorat ishi</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-brand-50 text-brand-600 text-[10px] font-bold rounded-full">
                          5 savol
                        </span>
                      </div>

                      {/* Question Preview */}
                      <div className="space-y-3">
                        {/* Question 1 */}
                        <div className="animate-card-entrance bg-gray-50/80 rounded-2xl p-4 border border-gray-100" style={{ animationDelay: '0.3s', opacity: 0 }}>
                          <p className="text-xs font-bold text-gray-800 mb-2.5">
                            1. Nyutonning ikkinchi qonuni qanday ifodalanadi?
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {['F = ma', 'E = mc²', 'P = mv', 'W = Fd'].map((ans, j) => (
                              <div
                                key={j}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-medium transition-all ${
                                  j === 0
                                    ? 'bg-brand-50 text-brand-700 border border-brand-200 shadow-sm'
                                    : 'bg-white text-gray-500 border border-gray-100'
                                }`}
                              >
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                  j === 0
                                    ? 'bg-brand-500 text-white'
                                    : 'bg-gray-100 text-gray-400'
                                }`}>
                                  {String.fromCharCode(65 + j)}
                                </span>
                                {ans}
                                {j === 0 && <CheckCircle className="w-3.5 h-3.5 ml-auto text-brand-500" />}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Question 2 — Partially visible */}
                        <div className="animate-card-entrance bg-gray-50/80 rounded-2xl p-4 border border-gray-100" style={{ animationDelay: '0.6s', opacity: 0 }}>
                          <p className="text-xs font-bold text-gray-800 mb-2.5">
                            2. Erkin tushish tezlanishi qancha?
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {['9.8 m/s²', '10 m/s²', '3×10⁸ m/s', '6.67 N'].map((ans, j) => (
                              <div
                                key={j}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-medium ${
                                  j === 0
                                    ? 'bg-brand-50 text-brand-700 border border-brand-200 shadow-sm'
                                    : 'bg-white text-gray-500 border border-gray-100'
                                }`}
                              >
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                  j === 0 ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-400'
                                }`}>
                                  {String.fromCharCode(65 + j)}
                                </span>
                                {ans}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Actions */}
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-[40%] bg-gradient-to-r from-brand-400 to-emerald-400 rounded-full" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">2/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* ── Floating 3D Accent Cards ── */}

              {/* AI Badge — Top Right */}
              <div className="absolute -top-4 -right-6 z-20 animate-float-3d" style={{ animationDelay: '1s' }}>
                <div className="glass rounded-2xl px-4 py-3 shadow-xl border border-white/50 flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-800">AI Generator</p>
                    <p className="text-[9px] text-gray-400 font-medium">5 savol tayyor</p>
                  </div>
                </div>
              </div>

              {/* Stats Card — Bottom Left */}
              <div className="absolute -bottom-6 -left-8 z-20 animate-swing-3d">
                <div className="glass rounded-2xl px-5 py-4 shadow-xl border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-brand-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xl font-extrabold text-gray-900">1,247</p>
                      <p className="text-[10px] text-gray-400 font-medium">Yaratilgan testlar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Users Card — Bottom Right */}
              <div className="absolute -bottom-3 -right-4 z-20 animate-depth-pulse" style={{ animationDelay: '2s' }}>
                <div className="glass rounded-2xl px-4 py-3 shadow-xl border border-white/50 flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-gray-900">523</p>
                    <p className="text-[9px] text-gray-400 font-medium">Faol foydalanuvchilar</p>
                  </div>
                </div>
              </div>

              {/* Checkmark — Top Left */}
              <div className="absolute -top-2 -left-4 z-20 animate-orbit-x" style={{ animationDelay: '0.5s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-500/30 animate-pulse-glow">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;