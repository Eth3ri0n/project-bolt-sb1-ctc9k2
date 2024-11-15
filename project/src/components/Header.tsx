import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  isSidebarCollapsed: boolean;
}

export default function Header({ isDark, toggleTheme, isSidebarCollapsed }: HeaderProps) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div 
      className={`fixed top-0 z-[100] transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'left-16' : 'left-64'
      } right-0`}
    >
      <header className="w-full bg-[#00507B] text-white h-16 px-6 flex items-center justify-between shadow-md">
        {/* Logo section */}
        <div className="flex items-center">
          <img 
            src="/logo-UTTOP-blanc-horizontal-RVB.png" 
            alt="Université de Technologie" 
            className="h-10 w-auto"
          />
        </div>

        {/* Right section with language and theme toggles */}
        <div className="flex items-center space-x-6">
          {/* Language selector */}
          <div className="relative group">
            <button 
              className="px-4 py-2 rounded-md bg-[#004B6E] hover:bg-[#003855] transition-colors flex items-center space-x-2"
              aria-label="Change language"
            >
              <span>{i18n.language === 'fr' ? 'En français' : 'In English'}</span>
              <span className="text-xs opacity-75">▼</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <button
                  onClick={() => changeLanguage('fr')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  En français
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  In English
                </button>
              </div>
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[#004B6E] transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>
    </div>
  );
}