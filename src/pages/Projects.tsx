import { useEffect, useState } from 'react';
import { Header } from '../app/components/Header';
import { Footer } from '../app/components/Footer';
import { getProjects } from '../utils/projectStore';
import { useTheme } from '../hooks/useTheme';
import { usePageTitle } from '../hooks/usePageTitle';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl: string;
  impact: string;
}

export default function Projects() {
  const { isDark } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  usePageTitle('Projects | Jayashree Foundation');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    try {
      const allProjects = getProjects();
      setProjects(allProjects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-12">
          <div className="mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Our Projects
            </h1>
            <p className={`text-lg transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Showcasing the positive impact we've made in communities
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>No projects yet. Ask admin to add some!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`rounded-2xl border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="relative w-full h-48 bg-slate-300">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full whitespace-nowrap">
                        {project.category}
                      </span>
                      <span className={`text-xs md:text-sm transition-colors duration-200 flex-shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {new Date(project.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className={`text-lg md:text-xl font-bold mb-2 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm md:text-base line-clamp-3 transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {project.description}
                    </p>
                    {project.impact && (
                      <p className={`mt-3 text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        👥 {project.impact} lives impacted
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
