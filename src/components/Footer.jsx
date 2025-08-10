import React from 'react'
import { FaBook } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-[#1e293b] text-sm">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0">
                    {/* Logo qismi */}
                    <div className="md:max-w-sm">
                        <div className="flex items-center space-x-3">
                            <FaBook className="bg-green-600 text-white w-10 h-10 p-2 rounded-lg" />
                            <h1 className="text-xl font-bold text-white">AutoQuiz</h1>
                        </div>
                        <p className="text-[#94a3b8] mt-5 leading-relaxed">
                            O‘qituvchilar uchun eng qulay test yaratish tizimi. Vaqtingizni tejang, sifatni oshiring.
                        </p>
                    </div>

                    {/* Havolalar */}
                    <div>
                        <h5 className="text-white font-semibold mb-4">Havolalar</h5>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-[#94a3b8] hover:text-white transition">Shablonlar</a></li>
                            <li><a href="#" className="text-[#94a3b8] hover:text-white transition">Test yaratish</a></li>
                            <li><a href="#" className="text-[#94a3b8] hover:text-white transition">Dashboard</a></li>
                        </ul>
                    </div>

                    {/* Bog‘lanish */}
                    <div>
                        <h5 className="text-white font-semibold mb-4">Bog‘lanish</h5>
                        <ul className="space-y-2">
                            <li ><a href="#" className="text-[#94a3b8] hover:text-white transition">info@autoquiz.uz</a></li>
                            <li ><a href="#" className="text-[#94a3b8] hover:text-white transition">+998 (94) 901-12-02</a></li>
                            <li ><a href="#" className="text-[#94a3b8] hover:text-white transition">Toshkent, O‘zbekiston</a></li>
                        </ul>
                    </div>
                </div>

                {/* Pastki chiziq */}
                <hr className="border-[#334155] my-10" />
                <p className="text-[#94a3b8] text-center">
                    © 2025 AutoQuiz. Barcha huquqlar himoyalangan.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
