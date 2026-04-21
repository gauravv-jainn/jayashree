import { Users, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useNavigate } from 'react-router';
import heroImage from '../../assets/hero-image.png';

export function Hero() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <section className={`pt-32 px-4 md:px-8 transition-colors duration-200 ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-800/30 to-slate-900/40'
        : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[300px] md:min-h-[500px]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 transition-colors duration-200 ${
              isDark ? 'bg-blue-900/40' : 'bg-blue-100'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 transition-colors duration-200 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <span className={`text-xs font-medium transition-colors duration-200 ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}>Making a Difference Together</span>
            </div>

            <div>
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-medium leading-[48px] transition-colors duration-200 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Empowering Communities Through{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Compassion
                </span>
              </h1>
            </div>

            <p className={`text-sm sm:text-base md:text-lg font-normal leading-7 max-w-[491px] transition-colors duration-200 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Join us in creating lasting change. Jayshree Foundation brings together passionate volunteers to serve communities, provide education, healthcare, and hope to those who need it most.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/join')} className="h-12 px-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center gap-2 text-white text-base font-medium hover:shadow-lg hover:shadow-blue-600/30 transition-all">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/about')} className={`h-12 px-6 rounded-2xl border text-base font-medium transition-colors duration-200 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'
              }`}>
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-white/0 rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={heroImage}
                alt="Community gathering"
                className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover"
              />
            </div>

            {/* Floating Badge */}
            <div className={`absolute left-2 md:-left-6 bottom-6 md:bottom-12 rounded-2xl shadow-xl border px-4 py-4 w-44 md:w-48 transition-colors duration-200 ${
              isDark
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 px-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[10px] flex justify-center items-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className={`text-2xl font-normal leading-8 transition-colors duration-200 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>500+</div>
                  <div className={`text-xs font-normal leading-4 transition-colors duration-200 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>Active Volunteers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}