import { Header } from '../app/components/Header';
import { Footer } from '../app/components/Footer';
import { useTheme } from '../hooks/useTheme';
import { usePageTitle } from '../hooks/usePageTitle';

export default function About() {
  const { isDark } = useTheme();
  usePageTitle('About Us | Jayashree Foundation');

  const values = [
    { title: 'Compassion', description: 'We care deeply for those we serve' },
    { title: 'Integrity', description: 'We operate with honesty and transparency' },
    { title: 'Impact', description: 'We measure success by lives changed' },
  ];

  const milestones = [
    { year: 2021, achievement: 'Foundation registered as MAH/509/2021' },
    { year: 2022, achievement: 'Reached 5,000+ lives in first year' },
    { year: 2023, achievement: 'Expanded to 3 new districts' },
    { year: 2024, achievement: 'Launched education and healthcare programs' },
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-12 space-y-12 md:space-y-16">
          {/* Mission & Vision */}
          <section>
            <h1 className={`text-4xl md:text-5xl font-bold mb-12 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              About Jayashree Foundation
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              <div className={`p-6 md:p-8 rounded-2xl border transition-colors duration-200 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'}`}>
                <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Our Mission
                </h2>
                <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  To help the destitute, orphaned, and marginalized sections of society by providing quality education,
                  healthcare, and livelihood support while spreading hope and positive change across communities.
                </p>
              </div>

              <div className={`p-6 md:p-8 rounded-2xl border transition-colors duration-200 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-green-50 border-green-100'}`}>
                <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Our Vision
                </h2>
                <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  A world where every individual has access to quality education, healthcare, and opportunities to lead
                  a dignified life, regardless of their socioeconomic background.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div>
              <h3 className={`text-2xl md:text-3xl font-bold mb-6 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Our Core Values
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className={`p-6 rounded-2xl border text-center transition-all duration-200 ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                  >
                    <h4 className={`text-lg font-bold mb-2 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {value.title}
                    </h4>
                    <p className={`transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Impact Statistics */}
          <section className={`p-6 md:p-8 rounded-2xl border transition-colors duration-200 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className={`text-2xl md:text-3xl font-bold mb-8 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Our Impact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">25K+</p>
                <p className={`text-sm md:text-base transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Lives Impacted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50+</p>
                <p className={`text-sm md:text-base transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Projects Completed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">15+</p>
                <p className={`text-sm md:text-base transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Awards & Recognition</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">3</p>
                <p className={`text-sm md:text-base transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Districts Active</p>
              </div>
            </div>
          </section>

          {/* History Timeline */}
          <section>
            <h3 className={`text-2xl md:text-3xl font-bold mb-8 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Our Journey
            </h3>
            <div className="space-y-3 md:space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.year} className={`p-4 md:p-6 rounded-2xl border flex items-center gap-4 md:gap-6 transition-colors duration-200 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="min-w-fit">
                    <p className="text-lg md:text-xl font-bold text-blue-600">{milestone.year}</p>
                  </div>
                  <div>
                    <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{milestone.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
