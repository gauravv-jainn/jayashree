import { useEffect, useState } from 'react';
import { Header } from '../app/components/Header';
import { Footer } from '../app/components/Footer';
import { getPublishedNews, NewsArticle } from '../utils/newsStore';
import { useTheme } from '../hooks/useTheme';
import { usePageTitle } from '../hooks/usePageTitle';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

export default function News() {
  const { isDark } = useTheme();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  usePageTitle('News | Jayashree Foundation');

  useEffect(() => {
    const allNews = getPublishedNews();
    setNews(allNews);
    setLoading(false);
  }, []);

  const categories: NewsArticle['category'][] = ['update', 'event', 'achievement', 'announcement'];
  const filteredNews = selectedCategory
    ? news.filter(article => article.category === selectedCategory)
    : news;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-32 pb-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Latest News & Updates
            </h1>
            <p className={`text-lg transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Stay informed about our latest initiatives and community impact
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium capitalize transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* News List */}
          {loading ? (
            <div className="text-center py-12">
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>Loading news...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>No articles in this category</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNews.map((article) => (
                <div
                  key={article.id}
                  className={`rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-lg ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    {/* Image */}
                    {article.imageUrl && (
                      <div className="md:col-span-1">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-48 md:h-full object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className={article.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}>
                      {/* Meta */}
                      <div className="flex items-center gap-4 mb-3 flex-wrap">
                        <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full capitalize">
                          {article.category}
                        </span>
                        <div className={`flex items-center gap-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          <Calendar className="w-4 h-4" />
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-2xl font-bold mb-3 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-base mb-4 transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {article.description}
                      </p>

                      {/* Tags */}
                      {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors duration-200 ${
                                isDark
                                  ? 'bg-slate-700 text-slate-300'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More */}
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Read Full Article
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
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
