import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight, Mail, Send, Heart } from "lucide-react";
import { useI18n } from "../shared/hooks/useI18n.js";

function Footer() {
  const navigate = useNavigate();
  const { t } = useI18n();

  const links = [
    { name: t("templates"), path: "/templates" },
    { name: t("create"), path: "/create" },
    { name: t("mytests"), path: "/my-tests" },
    { name: t("about"), path: "/about" },
  ];

  return (
    <footer className="relative bg-gray-900 overflow-hidden">
      {/* Gradient top edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute bottom-0 -left-20 w-60 h-60 bg-brand-500/5 rounded-full blur-3xl" />
      <div className="absolute top-0 -right-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <div className="py-12 border-b border-white/10">
          <div className="bg-gradient-to-r from-brand-600 to-emerald-600 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-glow-lg">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Birinchi testingizni yarating
              </h3>
              <p className="text-brand-100 text-sm sm:text-base">
                Professional test yaratish atigi 5 daqiqa davom etadi
              </p>
            </div>
            <button
              onClick={() => navigate('/create')}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-brand-700 font-bold text-sm rounded-2xl hover:bg-brand-50 shadow-xl transition-all active:scale-[0.97] cursor-pointer flex-shrink-0"
            >
              Boshlash
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-gradient-to-br from-brand-500 to-emerald-600 p-2 rounded-xl text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Auto<span className="text-brand-400">Quiz</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              O'qituvchilar uchun eng qulay test yaratish tizimi. Vaqtingizni
              tejang, sifatni oshiring.
            </p>
          </div>

          {/* Links */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Havolalar
            </h5>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Bog'lanish
            </h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@autoquiz.uz"
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-gray-600" />
                  support@autoquiz.uz
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/autoquiz_uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-gray-600" />
                  @autoquiz_uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs font-medium">
            © {new Date().getFullYear()} AutoQuiz. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            <Heart className="w-3 h-3 text-red-400 fill-current" />
            bilan yaratilgan
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
