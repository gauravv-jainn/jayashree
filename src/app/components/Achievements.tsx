import { Users, Award, Heart, Building2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function Achievements() {
  const { isDark } = useTheme();

  const achievements = [
    {
      icon: Users,
      value: "25,000+",
      label: "Lives Impacted",
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      icon: Award,
      value: "15+",
      label: "Awards Won",
      gradient: "from-violet-600 to-purple-600",
    },
    {
      icon: Heart,
      value: "500+",
      label: "Active Volunteers",
      gradient: "from-orange-500 to-rose-600",
    },
    {
      icon: Building2,
      value: "200+",
      label: "Projects Completed",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className={`px-4 md:px-8 py-12 md:py-20 transition-colors duration-200 ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-800/30 to-slate-900/40'
        : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-medium leading-9 mb-4 transition-colors duration-200 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>Our Achievements</h2>
          <p className={`text-base font-normal leading-6 transition-colors duration-200 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Milestones that reflect our commitment to creating positive change
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className={`rounded-2xl border p-6 md:p-8 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${achievement.gradient} rounded-2xl shadow-lg flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-3xl font-normal leading-9 mb-2 transition-colors duration-200 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {achievement.value}
                </div>
                <div className={`text-base font-normal leading-6 transition-colors duration-200 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {achievement.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}