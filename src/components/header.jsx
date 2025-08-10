// import React from 'react'
// import { FaBook } from "react-icons/fa";
// import { CiSettings } from "react-icons/ci";

// function Header() {
//     return (
//         <header className="">
//             <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
//                 <div className="flex items-center space-x-2">
//                     <FaBook className="bg-green-600 p-2 text-white w-8 h-8 rounded-lg" />
//                     <h1 className="text-xl font-bold text-gray-900">AutoQuiz</h1>
//                 </div>
//                 <ul className='flex space-x-4 text-gray-700'>
//                     <li className='hover:text-green-600 hover:bg-green-50 active:bg-green-50 p-2 rounded-lg cursor-pointer font-semibold'>Bosh sahifa</li>
//                     <li className='hover:text-green-600 hover:bg-green-50 active:bg-green-50 p-2 rounded-lg cursor-pointer font-semibold'>Test Yaratish</li>
//                     <li className='hover:text-green-600 hover:bg-green-50 active:bg-green-50 p-2 rounded-lg cursor-pointer font-semibold'>Shablonlar</li>
//                     <li className='hover:text-green-600 hover:bg-green-50 active:bg-green-50 p-2 rounded-lg cursor-pointer font-semibold'>Mening testlarim</li>
//                 </ul>
//                 <div className='flex items-center space-x-4'>
//                     <CiSettings className='text-gray-600 w-6 h-6' />
//                     <button className='bg-green-600 text-white px-4 py-2 rounded-lg'>Kirish</button>
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Header
import React, { useState } from 'react';
import { FaBook } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navItems = [
        { name: 'Bosh sahifa', path: '/' },
        { name: 'Test Yaratish', path: '/create' },
        { name: 'Shablonlar', path: '/templates' },
        { name: 'Mening testlarim', path: '/my-tests' },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <FaBook className="bg-green-600 p-2 text-white w-8 h-8 rounded-lg" />
                    <h1 className="text-xl font-bold text-gray-900">AutoQuiz</h1>
                </div>

                {/* Desktop nav */}
                <nav className="hidden md:flex space-x-4 font-semibold text-gray-700">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? 'text-green-600 bg-green-100'
                                    : 'hover:text-green-600 hover:bg-green-50'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Sozlamalar va Kirish */}
                <div className="hidden md:flex items-center space-x-4">
                    <CiSettings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-green-600" />
                    <button className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg">
                        Kirish
                    </button>
                </div>

                {/* Mobil menyu tugmasi */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? (
                            <FiX className="w-6 h-6 text-gray-700" />
                        ) : (
                            <FiMenu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobil menyu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4">
                    <nav className="flex flex-col space-y-2 font-semibold text-gray-700">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg ${isActive
                                        ? 'text-green-600 bg-green-100'
                                        : 'hover:text-green-600 hover:bg-green-50'
                                    }`
                                }
                                onClick={() => setMenuOpen(false)} // menyuni yopadi
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                            Kirish
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
