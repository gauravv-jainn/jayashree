import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { getRecentNews } from '../../utils/newsStore';
import { useNavigate } from 'react-router';

export function LatestNews() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const news = getRecentNews(3);

  return (
    <section className={`px-4 md:px-8 py-12 md:py-20 transition-colors duration-200 ${
      isDark ? 'bg-slate-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-medium leading-9 mb-4 transition-colors duration-200 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>Latest News</h2>
          <p className={`text-base font-normal leading-6 transition-colors duration-200 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Stay updated with our latest activities and media coverage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {news.length > 0 ? (
            news.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-200 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {item.imageUrl && (
                  <div className="h-56 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium bg-blue-600 text-white px-2 py-1 rounded-full capitalize">{item.category}</span>
                    <span className={`text-xs font-normal transition-colors duration-200 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ''}</span>
                  </div>

                  <h3 className={`text-lg font-medium leading-7 transition-colors duration-200 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-sm font-normal leading-6 transition-colors duration-200 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {item.description}
                  </p>

                  <button
                    onClick={() => navigate('/news')}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={`text-center py-12 col-span-full ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <p>No news articles yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}