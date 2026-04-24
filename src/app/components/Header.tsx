import { useState } from 'react';
import { Moon, Sun, ArrowRight, Menu } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTheme } from '../../hooks/useTheme';
import { MobileMenu } from './MobileMenu';
import logo from '../../assets/jayashree-logo.png';

export function Header() {
  const navigate = useNavigate();
  const { isDark, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Projects', path: '/projects' },
    { label: 'Members', path: '/members' },
    { label: 'About', path: '/about' },
    { label: 'Join Us', path: '/join' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors duration-200 ${
      isDark
        ? 'bg-slate-900/80 border-slate-700'
        : 'bg-white/80 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img
            src={logo}
            alt="Jayashree Foundation"
            className="h-12 w-12 rounded-full object-cover border-2 border-white"
          />
          <div className="flex-1">
            <div className={`text-sm font-normal leading-5 transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>Jayashree Foundation</div>
            <div className={`text-xs font-normal leading-4 transition-colors duration-200 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>NGO</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden lg:flex items-center gap-2 lg:gap-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                isDark
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isDark
                ? 'hover:bg-slate-700 text-slate-300'
                : 'hover:bg-slate-100 text-slate-900'
            }`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <button
            onClick={toggleDarkMode}
            className={`w-10 h-10 rounded-lg shadow-sm border flex items-center justify-center transition-all duration-200 ${
              isDark
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                : 'bg-white border-slate-200 hover:bg-slate-50'
            }`}
            aria-label="Toggle dark mode"
          >
            <div className="relative w-4 h-4">
              <Sun className={`w-4 h-4 absolute inset-0 transition-all duration-200 ${
                isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100 text-slate-600'
              }`} />
              <Moon className={`w-4 h-4 absolute inset-0 transition-all duration-200 ${
                isDark ? 'opacity-100 rotate-0 scale-100 text-slate-300' : 'opacity-0 -rotate-90 scale-0'
              }`} />
            </div>
          </button>

          <button
            onClick={() => navigate('/donate')}
            className="hidden lg:flex w-24 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[10px] items-center justify-center gap-2 text-white text-sm font-normal hover:shadow-lg transition-shadow"
          >
            Donate
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}