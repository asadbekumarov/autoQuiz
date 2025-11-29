import React, { useState } from 'react';
import { FaBook } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        confirm: ''
    });
    const [settings, setSettings] = useState({
        language: 'uz',
        theme: 'light',
        notifications: true
    });

    const t = (key) => {
        const dict = {
            uz: {
                home: 'Bosh sahifa', create: 'Test Yaratish', templates: 'Shablonlar', mytests: 'Mening testlarim',
                login: 'Kirish', logout: 'Chiqish', settings: 'Sozlamalar', register: 'Roʼyxatdan oʼtish', save: 'Saqlash', cancel: 'Bekor qilish'
            },
            en: {
                home: 'Home', create: 'Create Test', templates: 'Templates', mytests: 'My Tests',
                login: 'Login', logout: 'Logout', settings: 'Settings', register: 'Register', save: 'Save', cancel: 'Cancel'
            },
            ru: {
                home: 'Главная', create: 'Создать тест', templates: 'Шаблоны', mytests: 'Мои тесты',
                login: 'Войти', logout: 'Выйти', settings: 'Настройки', register: 'Регистрация', save: 'Сохранить', cancel: 'Отмена'
            }
        };
        return (dict[settings.language] || dict.uz)[key] || key;
    };

    const navItems = [
        { name: t('home'), path: '/' },
        { name: t('create'), path: '/create' },
        { name: t('templates'), path: '/templates' },
        { name: t('mytests'), path: '/my-tests' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const found = users.find(u => u.email === loginForm.email && u.password === loginForm.password);
        if (found) {
            setIsLoggedIn(true);
            setShowLoginModal(false);
            setLoginForm({ email: '', password: '' });
            localStorage.setItem('user', JSON.stringify({ email: found.email }));
        } else {
            alert('Email yoki parol notoʼgʼri');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('user');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const { email, password, confirm } = registerForm;
        if (!email || !password || !confirm) return;
        if (password !== confirm) { alert('Parollar mos emas'); return; }
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === email)) { alert('Bu email allaqachon roʼyxatdan oʼtgan'); return; }
        const updated = [...users, { email, password }];
        localStorage.setItem('users', JSON.stringify(updated));
        setShowRegisterModal(false);
        setShowLoginModal(true);
        setRegisterForm({ email: '', password: '', confirm: '' });
        alert('Roʼyxatdan oʼtish muvaffaqiyatli. Iltimos, kirishingiz mumkin.');
    };

    const applyTheme = (theme) => {
        const root = document.documentElement;
        const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const enableDark = theme === 'dark' || (theme === 'auto' && preferredDark);
        if (enableDark) root.classList.add('dark'); else root.classList.remove('dark');
    };

    const handleSettingsSave = () => {
        localStorage.setItem('settings', JSON.stringify(settings));
        applyTheme(settings.theme);
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
            const s = JSON.parse(savedSettings);
            setSettings(s);
            applyTheme(s.theme);
        }
    }, []);

    return (
        <>
            <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <FaBook className="bg-green-600 p-2 text-white w-8 h-8 rounded-lg" />
                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">AutoQuiz</h1>
                    </div>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex space-x-4 font-semibold text-gray-700 dark:text-gray-200">
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
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <CiSettings className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-green-600" />
                        </button>

                        {isLoggedIn ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
                                    <FiUser className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-700 font-medium">
                                        {JSON.parse(localStorage.getItem('user') || '{}').email || 'User'}
                                    </span>
                                </div>
                                <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 transition text-white px-3 py-2 rounded-lg text-sm">
                                    <FiLogOut className="w-4 h-4" />
                                    <span>{t('logout')}</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg"
                            >
                                {t('login')}
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
                                    {t('login')}
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
                            <h3 className="text-xl font-bold">{t('login')}</h3>
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
                                    {t('login')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowLoginModal(false)}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg transition"
                                >
                                    {t('cancel')}
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Akkauntingiz yoʼqmi? 
                                <button className="text-green-600 font-medium" onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }}>
                                    {t('register')}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Register Modal */}
            {showRegisterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">{t('register')}</h3>
                            <button onClick={() => setShowRegisterModal(false)} className="text-gray-400 hover:text-gray-600">
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
                                <input type="password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Parolni tasdiqlash</label>
                                <input type="password" value={registerForm.confirm} onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                                       className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" required />
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">{t('register')}</button>
                                <button type="button" onClick={() => setShowRegisterModal(false)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg transition">{t('cancel')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettingsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">{t('settings')}</h3>
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
                            <button onClick={handleSettingsSave} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">{t('save')}</button>
                            <button
                                onClick={() => setShowSettingsModal(false)}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg transition"
                            >
                                {t('cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
