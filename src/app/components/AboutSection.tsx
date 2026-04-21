import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function AboutSection() {
  const { isDark } = useTheme();

  return (
    <section className={`px-4 md:px-8 py-12 md:py-20 transition-colors duration-200 ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-800/30 to-slate-900/40'
        : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8 pt-0 lg:pt-14">
            <h2 className={`text-3xl md:text-4xl font-medium leading-9 transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              About Jayashree Foundation
            </h2>

            <p className={`text-base font-normal leading-6 transition-colors duration-200 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Founded in 2015, Jayashree Foundation is a non-profit organization dedicated to transforming lives through community service, education, healthcare, and environmental initiatives. We believe in the power of collective action and the difference passionate individuals can make.
            </p>

            <p className={`text-base font-normal leading-6 transition-colors duration-200 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Our mission is to create sustainable change by empowering communities, supporting underprivileged families, and mobilizing volunteers who share our vision of a better tomorrow.
            </p>

            <p className={`text-base font-normal leading-6 transition-colors duration-200 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              With a dedicated team of volunteers and partners across India, we continue to expand our reach and impact, touching thousands of lives every year.
            </p>
          </div>

          {/* Right Contact Card */}
          <div className={`rounded-2xl shadow-xl border p-6 md:p-8 transition-all duration-200 ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          }`}>
            <h3 className={`text-xl font-medium leading-7 mb-8 transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Get In Touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 px-2.5 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                  isDark ? 'bg-blue-900/40' : 'bg-blue-100'
                }`}>
                  <MapPin className={`w-5 h-5 transition-colors duration-200 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <div className={`text-sm font-medium leading-5 mb-1 transition-colors duration-200 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>Address</div>
                  <div className={`text-sm font-normal leading-5 transition-colors duration-200 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    Room no-17, Plot No-46, Sahyadri CHS<br />
                    Sector 16A, Nerul, Navi Mumbai, Maharashtra 400706
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 px-2.5 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                  isDark ? 'bg-blue-900/40' : 'bg-blue-100'
                }`}>
                  <Phone className={`w-5 h-5 transition-colors duration-200 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <div className={`text-sm font-medium leading-5 mb-1 transition-colors duration-200 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>Phone</div>
                  <div className={`text-sm font-normal leading-5 transition-colors duration-200 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>+91 93210 06900</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 px-2.5 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                  isDark ? 'bg-blue-900/40' : 'bg-blue-100'
                }`}>
                  <Mail className={`w-5 h-5 transition-colors duration-200 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <div className={`text-sm font-medium leading-5 mb-1 transition-colors duration-200 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>Email</div>
                  <div className={`text-sm font-normal leading-5 transition-colors duration-200 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>info.jayashreefoundation@gmail.com</div>
                </div>
              </div>
            </div>

            <div className={`pt-6 mt-6 border-t transition-colors duration-200 ${
              isDark ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <div className={`text-sm font-medium leading-5 mb-4 transition-colors duration-200 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Follow Us</div>
              <div className="flex gap-3">
                <a href="#" className={`w-12 h-12 px-2.5 rounded-[10px] flex items-center justify-center transition-all duration-200 ${
                  isDark
                    ? 'bg-blue-900/40 hover:bg-blue-900/60'
                    : 'bg-blue-100 hover:bg-blue-200'
                }`}>
                  <Facebook className={`w-5 h-5 transition-colors duration-200 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </a>
                <a href="#" className={`w-12 h-12 px-2.5 rounded-[10px] flex items-center justify-center transition-all duration-200 ${
                  isDark
                    ? 'bg-blue-900/40 hover:bg-blue-900/60'
                    : 'bg-blue-100 hover:bg-blue-200'
                }`}>
                  <Twitter className={`w-5 h-5 transition-colors duration-200 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </a>
                <a href="https://www.instagram.com/jayashree_foundation?igsh=aDQ4czhrN241cHE4" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 px-2.5 rounded-[10px] flex items-center justify-center transition-all duration-200 ${
                  isDark
                    ? 'bg-blue-900/40 hover:bg-blue-900/60'
                    : 'bg-blue-100 hover:bg-blue-200'
                }`}>
                  <Instagram className={`w-5 h-5 transition-colors duration-200 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </a>
                <a href="#" className={`w-12 h-12 px-2.5 rounded-[10px] flex items-center justify-center transition-all duration-200 ${
                  isDark
                    ? 'bg-blue-900/40 hover:bg-blue-900/60'
                    : 'bg-blue-100 hover:bg-blue-200'
                }`}>
                  <Linkedin className={`w-5 h-5 transition-colors duration-200 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}