import { useState } from 'react';
import { Header } from '../../app/components/Header';
import { Footer } from '../../app/components/Footer';
import { Button } from '../../app/components/ui/button';
import { useTheme } from '../../hooks/useTheme';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useNavigate } from 'react-router';
import { Trash2, Edit2, Plus, ArrowLeft } from 'lucide-react';
import {
  getAllNews,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  publishNewsArticle,
  unpublishNewsArticle,
  NewsArticle,
} from '../../utils/newsStore';

export default function AdminNews() {
  const { isDark } = useTheme();
  usePageTitle('News Management | Admin | Jayashree Foundation');
  const navigate = useNavigate();

  const [news, setNews] = useState(getAllNews());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    category: 'update' as const,
    tags: '',
    isPublished: false,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData((prev) => ({ ...prev, imageUrl: base64 }));
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = ['update', 'event', 'achievement', 'announcement'] as const;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      updateNewsArticle(editingId, {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        imageUrl: formData.imageUrl,
        category: formData.category,
        tags,
        isPublished: formData.isPublished,
      });
    } else {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      createNewsArticle({
        title: formData.title,
        description: formData.description,
        content: formData.content,
        imageUrl: formData.imageUrl,
        category: formData.category,
        tags,
        isPublished: formData.isPublished,
        author: 'admin@foundation.org',
      });
    }

    setNews(getAllNews());
    setFormData({
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      category: 'update',
      tags: '',
      isPublished: false,
    });
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (article: NewsArticle) => {
    setFormData({
      title: article.title,
      description: article.description,
      content: article.content,
      imageUrl: article.imageUrl,
      category: article.category,
      tags: article.tags.join(', '),
      isPublished: article.isPublished,
    });
    setImagePreview(article.imageUrl);
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      deleteNewsArticle(id);
      setNews(getAllNews());
    }
  };

  const handlePublish = (id: string) => {
    publishNewsArticle(id);
    setNews(getAllNews());
  };

  const handleUnpublish = (id: string) => {
    unpublishNewsArticle(id);
    setNews(getAllNews());
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      category: 'update',
      tags: '',
      isPublished: false,
    });
    setImagePreview('');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 md:px-8 pt-32 pb-12">
          <button
            onClick={() => navigate('/admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 mb-8 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>

          <div className="flex justify-between items-center mb-12">
            <h1 className={`text-4xl font-bold transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              News Management
            </h1>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            )}
          </div>

          {showForm ? (
            <div className={`rounded-2xl border p-6 md:p-8 transition-colors duration-200 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <h2 className={`text-2xl font-bold mb-6 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {editingId ? 'Edit Article' : 'Create New Article'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2`}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className={isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Description (Short Excerpt) *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Full Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Upload Image * (JPG, PNG, WebP)
                  </label>
                  <div className={`w-full px-4 py-6 rounded-lg border-2 border-dashed transition-colors ${
                    isDark
                      ? 'bg-slate-700/50 border-slate-600 hover:border-blue-500'
                      : 'bg-slate-50 border-slate-300 hover:border-blue-500'
                  } cursor-pointer flex items-center justify-center`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="news-image-upload"
                      required={!formData.imageUrl}
                    />
                    <label htmlFor="news-image-upload" className="cursor-pointer w-full text-center">
                      {imagePreview ? (
                        <div className="space-y-3">
                          <img src={imagePreview} alt="Preview" className="w-24 h-24 mx-auto rounded object-cover" />
                          <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            Click to change image
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className={`text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            📷 Click to upload or drag image
                          </p>
                          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            JPG, PNG or WebP (Max 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="tag1, tag2, tag3"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))}
                    className="w-4 h-4 rounded"
                  />
                  <label className={`text-sm font-medium transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Publish immediately
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button type="submit">{editingId ? 'Update Article' : 'Create Article'}</Button>
                  <Button type="button" onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className={`rounded-2xl border transition-colors duration-200 hidden md:block ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                  <thead className={`border-b ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Title
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Category
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Status
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Date
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {news.length > 0 ? (
                      news.map((article) => (
                        <tr
                          key={article.id}
                          className={`border-b transition-colors duration-200 ${
                            isDark
                              ? 'border-slate-700 hover:bg-slate-700/50'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <td className={`px-6 py-4 text-sm transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                            {article.title}
                          </td>
                          <td className={`px-6 py-4 text-sm transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                            <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                              {article.category}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-sm transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                article.isPublished
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {article.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-sm transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : new Date(article.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(article)}
                                className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              {article.isPublished ? (
                                <button
                                  onClick={() => handleUnpublish(article.id)}
                                  className="p-2 text-orange-600 hover:text-orange-700 transition-colors"
                                  title="Unpublish"
                                >
                                  👁️
                                </button>
                              ) : (
                                <button
                                  onClick={() => handlePublish(article.id)}
                                  className="p-2 text-green-600 hover:text-green-700 transition-colors"
                                  title="Publish"
                                >
                                  📤
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(article.id)}
                                className="p-2 text-red-600 hover:text-red-700 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className={`px-6 py-12 text-center text-sm transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                        >
                          No articles yet. Create your first article!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

              {/* Mobile Card View */}
              <div className={`md:hidden space-y-4`}>
                {news.length > 0 ? (
                  news.map((article) => (
                    <div
                      key={article.id}
                      className={`p-4 rounded-lg border transition-colors ${
                        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className={`font-semibold text-base mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {article.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="inline-block bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-medium capitalize">
                              {article.category}
                            </span>
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                article.isPublished
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {article.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {article.publishedAt
                              ? new Date(article.publishedAt).toLocaleDateString()
                              : new Date(article.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end pt-3 border-t" style={{borderColor: isDark ? '#475569' : '#e2e8f0'}}>
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-2.5 text-blue-600 hover:text-blue-700 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {article.isPublished ? (
                          <button
                            onClick={() => handleUnpublish(article.id)}
                            className="p-2.5 text-orange-600 hover:text-orange-700 transition-colors text-lg"
                            title="Unpublish"
                          >
                            👁️
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePublish(article.id)}
                            className="p-2.5 text-green-600 hover:text-green-700 transition-colors text-lg"
                            title="Publish"
                          >
                            📤
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2.5 text-red-600 hover:text-red-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={`p-6 rounded-lg text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    No articles yet. Create your first article!
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
