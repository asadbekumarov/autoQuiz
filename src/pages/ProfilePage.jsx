import React, { useState, useEffect } from 'react';
import { User, ChevronRight, Globe, Info, LogOut, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  // Mock user data or get from localStorage
  const [user, setUser] = useState({
    name: "Asadbek",
    phone: "+998 90 123 45 67",
    bonus: 1000
  });

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.email) {
        // If we have a real user, we might want to use their data
        // For now, sticking to the requested format mock or deriving from email
        setUser(prev => ({
          ...prev,
          name: storedUser.name || storedUser.email.split('@')[0] || "Asadbek"
        }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Profile Card Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-gray-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
          <p className="text-gray-500 font-medium mb-3">{user.phone}</p>
          <div className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-semibold">
            Bonus: {user.bonus.toLocaleString()} so'm
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            
            {/* Language */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700">Til tanlash</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* About */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                  <Info className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700">Ilova haqida</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Logout */}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 group-hover:text-red-600">
                  <LogOut className="w-5 h-5" />
                </div>
                <span className="font-medium text-red-500 group-hover:text-red-600">Hisobdan chiqish</span>
              </div>
              <ChevronRight className="w-5 h-5 text-red-300 group-hover:text-red-400" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
