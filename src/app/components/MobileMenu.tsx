import { X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTheme } from '../../hooks/useTheme';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Projects', path: '/projects' },
  { label: 'Members', path: '/members' },
  { label: 'About', path: '/about' },
  { label: 'Join Us', path: '/join' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] transition-opacity duration-200 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        } ${isDark ? 'bg-black' : 'bg-black'}`}
        onClick={onClose}
      />

      {/* Slide-in Menu */}
      <div
        className={`fixed z-[9999] w-72 transition-all duration-300 ease-in-out overflow-y-auto ${
          isDark ? 'bg-slate-800' : 'bg-white'
        } shadow-2xl`}
        style={{
          top: '64px',
          bottom: 0,
          left: 0,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Close Button */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>Menu</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-slate-700 text-slate-200'
                : 'hover:bg-slate-100 text-slate-900'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium text-base transition-all duration-200 ${
                isDark
                  ? 'text-slate-100 hover:bg-slate-700 active:bg-slate-600'
                  : 'text-slate-900 hover:bg-slate-100 active:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Donate Button */}
        <div className="p-2 mt-4 border-t">
          <button
            onClick={() => handleNavigate('/donate')}
            className="w-full px-4 py-3 rounded-lg font-semibold text-base text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 active:scale-95"
          >
            💝 Donate Now
          </button>
        </div>
      </div>
    </>
  );
}
