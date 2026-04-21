import { useEffect, useState } from 'react';
import { Header } from '../app/components/Header';
import { Footer } from '../app/components/Footer';
import { getGalleryImages } from '../utils/galleryStore';
import { useTheme } from '../hooks/useTheme';
import { usePageTitle } from '../hooks/usePageTitle';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  uploadDate: string;
  category: string;
  tags: string[];
}

export default function Gallery() {
  const { isDark } = useTheme();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  usePageTitle('Gallery | Jayashree Foundation');

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = () => {
    try {
      const images = getGalleryImages();
      setGalleryImages(images);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-12">
          <div className="mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Gallery
            </h1>
            <p className={`text-lg transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Photo memories from our events and activities
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>Loading gallery...</p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-12">
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>No gallery images yet. Ask admin to add some!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className={`rounded-2xl border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="relative w-full h-48 bg-slate-300">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-xs font-semibold bg-green-600 text-white px-3 py-1 rounded-full whitespace-nowrap capitalize">
                        {image.category}
                      </span>
                      <span className={`text-xs md:text-sm transition-colors duration-200 flex-shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {new Date(image.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className={`text-lg md:text-xl font-bold mb-2 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {image.title}
                    </h3>
                    <p className={`text-sm md:text-base line-clamp-3 transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {image.description}
                    </p>
                    {image.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {image.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-2 py-1 rounded-full ${
                              isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
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
