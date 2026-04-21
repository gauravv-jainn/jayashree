import { Calendar } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function RecentWorks() {
  const { isDark } = useTheme();

  const works = [
    {
      title: "Community Food Distribution",
      description: "Distributed meals to 1,200 families affected by seasonal unemployment in rural areas.",
      date: "February 2026",
      category: "Relief",
      image: "https://images.unsplash.com/photo-1759411354058-9e429834f92f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwY2hhcml0eXxlbnwxfHx8fDE3NzQ1MDEwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Free Medical Health Camp",
      description: "Organized comprehensive health checkups and free medicines for 800+ patients in underserved communities.",
      date: "January 2026",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1766299892549-b56b257d1ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGNsaW5pY3xlbnwxfHx8fDE3NzQ0NDI2NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Green Earth Tree Plantation",
      description: "Planted 5,000 saplings with volunteers and local communities to combat climate change.",
      date: "December 2025",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1757525473930-0b82237e55ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZhcm1pbmclMjBzdXN0YWluYWJsZXxlbnwxfHx8fDE3NzQ1NTEyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Education for All Initiative",
      description: "Provided quality education materials and tutoring to over 500 underprivileged children across 12 villages.",
      date: "March 2026",
      category: "Education",
      image: "https://images.unsplash.com/photo-1761666507437-9fb5a6ef7b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJpbmclMjBoZWxwfGVufDF8fHx8MTc3NDU1MTI4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section className={`px-4 md:px-8 py-12 md:py-20 transition-colors duration-200 ${
      isDark ? 'bg-slate-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-medium leading-9 mb-4 transition-colors duration-200 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>Our Recent Works</h2>
          <p className={`text-base font-normal leading-6 max-w-[655px] mx-auto transition-colors duration-200 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Discover the latest initiatives and projects making a real difference in communities across the country
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {works.map((work, index) => (
            <div
              key={index}
              className={`rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-200 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                />
                <div className={`absolute top-3 left-3 rounded-full px-3 py-1 transition-colors duration-200 ${
                  isDark
                    ? 'bg-slate-700 text-slate-200'
                    : 'bg-white/90 text-slate-900'
                }`}>
                  <span className="text-xs font-medium">{work.category}</span>
                </div>
              </div>

              <div className="px-5 pt-5 pb-6 space-y-2">
                <div className={`flex items-center gap-2 text-xs font-normal transition-colors duration-200 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Calendar className="w-3.5 h-3.5" />
                  {work.date}
                </div>
                <h3 className={`text-lg font-medium leading-7 transition-colors duration-200 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>{work.title}</h3>
                <p className={`text-sm font-normal leading-6 transition-colors duration-200 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}