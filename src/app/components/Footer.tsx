import { Facebook, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTheme } from '../../hooks/useTheme';
import logo from '../../assets/jayashree-logo.png';

export function Footer() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;

  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/jayashree_foundation?igsh=aDQ4czhrN241cHE4' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Mail, label: 'Email', href: `mailto:${contactEmail}` },
  ];

  return (
    <footer className={`transition-colors duration-200 border-t ${
      isDark
        ? 'bg-slate-900 border-slate-800'
        : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Top Section: Company Info + Quick Links + Social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8">
          {/* Company Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Jayashree Foundation" className="w-8 h-8 object-contain" />
              <div>
                <div className={`text-sm font-semibold transition-colors duration-200 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>Jayashree Foundation</div>
                <div className={`text-xs transition-colors duration-200 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>Helping Rays And Spreading Hopes</div>
              </div>
            </div>
            <p className={`text-sm transition-colors duration-200 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Making a positive impact in communities through education, healthcare, and livelihood programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Projects', path: '/projects' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Members', path: '/members' },
                { label: 'About', path: '/about' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className={`text-sm transition-colors duration-200 ${
                      isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>Follow Us</h3>
            <div className="flex items-center gap-2 md:gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg flex items-center justify-center leading-none transition-colors duration-200 ${
                      isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle Section: Legal Links */}
        <div className={`border-t mb-8 pt-8 transition-colors duration-200 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex flex-wrap gap-6">
              <button
                onClick={() => navigate('/privacy-policy')}
                className={`text-sm transition-colors duration-200 ${
                  isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate('/terms-of-service')}
                className={`text-sm transition-colors duration-200 ${
                  isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Terms of Service
              </button>
            </div>
            <div className={`text-xs transition-colors duration-200 ${
              isDark ? 'text-slate-500' : 'text-slate-500'
            }`}>
              Version 1.0 | Last updated {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className={`text-xs transition-colors duration-200 ${
          isDark ? 'text-slate-500' : 'text-slate-600'
        }`}>
          <p>© {currentYear} Jayashree Foundation. All rights reserved.</p>
          <p className="mt-2">Registered NGO | Tax ID: XXXXX | CIN: XXXXX</p>
        </div>
      </div>
    </footer>
  );
}