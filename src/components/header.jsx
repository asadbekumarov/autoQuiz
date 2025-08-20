import React, { useState } from 'react';
import { FaBook } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const [settings, setSettings] = useState({
        language: 'uz',
        theme: 'light',
        notifications: true
    });

    const navItems = [
        { name: 'Bosh sahifa', path: '/' },
        { name: 'Test Yaratish', path: '/create' },
        { name: 'Shablonlar', path: '/templates' },
        { name: 'Mening testlarim', path: '/my-tests' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple login logic - in a real app, you'd validate against a backend
        if (loginForm.email && loginForm.password) {
            setIsLoggedIn(true);
            setShowLoginModal(false);
            setLoginForm({ email: '', password: '' });
            // Save user info to localStorage
            localStorage.setItem('user', JSON.stringify({ email: loginForm.email }));
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('user');
    };

    const handleSettingsSave = () => {
        localStorage.setItem('settings', JSON.stringify(settings));
        setShowSettingsModal(false);
    };

    // Check if user is logged in on component mount
    React.useEffect(() => {
        const user = localStorage.getItem('user');
        const savedSettings = localStorage.getItem('settings');

        if (user) {
            setIsLoggedIn(true);
        }

        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    return (
        <>
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
                        <button
                            onClick={() => setShowSettingsModal(true)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <CiSettings className="w-6 h-6 text-gray-600 hover:text-green-600" />
                        </button>

                        {isLoggedIn ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
                                    <FiUser className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-700 font-medium">
                                        {JSON.parse(localStorage.getItem('user') || '{}').email || 'User'}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 transition text-white px-3 py-2 rounded-lg text-sm"
                                >
                                    <FiLogOut className="w-4 h-4" />
                                    <span>Chiqish</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg"
                            >
                                Kirish
                            </button>
                        )}
                    </div>

                    {/* Mobil menyu tugmasi */}
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
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
                    <div className="md:hidden px-4 pb-4 bg-white border-t">
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
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.name}
                                </NavLink>
                            ))}

                            {isLoggedIn ? (
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-lg">
                                        <FiUser className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-green-700 font-medium">
                                            {JSON.parse(localStorage.getItem('user') || '{}').email || 'User'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg text-sm"
                                    >
                                        <FiLogOut className="w-4 h-4" />
                                        <span>Chiqish</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setShowLoginModal(true);
                                        setMenuOpen(false);
                                    }}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mt-2"
                                >
                                    Kirish
                                </button>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Tizimga kirish</h3>
                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={loginForm.email}
                                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                    placeholder="Email manzilingizni kiriting"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Parol
                                </label>
                                <input
                                    type="password"
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                    placeholder="Parolingizni kiriting"
                                    required
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                                >
                                    Kirish
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowLoginModal(false)}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg transition"
                                >
                                    Bekor qilish
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Demo uchun istalgan email va parolni kiriting
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettingsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Sozlamalar</h3>
                            <button
                                onClick={() => setShowSettingsModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Til
                                </label>
                                <select
                                    value={settings.language}
                                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                >
                                    <option value="uz">O'zbekcha</option>
                                    <option value="en">English</option>
                                    <option value="ru">Русский</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mavzu
                                </label>
                                <select
                                    value={settings.theme}
                                    onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                                >
                                    <option value="light">Yorug'</option>
                                    <option value="dark">Qorong'i</option>
                                    <option value="auto">Avtomatik</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">
                                    Bildirishnomalar
                                </label>
                                <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                                    className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleSettingsSave}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                            >
                                Saqlash
                            </button>
                            <button
                                onClick={() => setShowSettingsModal(false)}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg transition"
                            >
                                Bekor qilish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;