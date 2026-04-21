import { useState } from 'react';
import { Header } from '../../app/components/Header';
import { Footer } from '../../app/components/Footer';
import { Button } from '../../app/components/ui/button';
import { useTheme } from '../../hooks/useTheme';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useNavigate } from 'react-router';
import { Trash2, Edit2, Plus, Trash, ArrowLeft } from 'lucide-react';
import {
  getGalleryImages,
  saveGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  deleteOldImages,
  GalleryImage,
} from '../../utils/galleryStore';

export default function AdminGallery() {
  const { isDark } = useTheme();
  usePageTitle('Gallery Management | Admin | Jayashree Foundation');
  const navigate = useNavigate();

  const [images, setImages] = useState(getGalleryImages());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    description: '',
    category: 'event' as const,
    tags: '',
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

  const categories = ['event', 'project', 'team', 'community'] as const;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      updateGalleryImage(editingId, {
        imageUrl: formData.imageUrl,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags,
      });
    } else {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      saveGalleryImage({
        imageUrl: formData.imageUrl,
        title: formData.title,
        description: formData.description,
        uploadDate: new Date().toISOString(),
        createdBy: 'admin@foundation.org',
        category: formData.category,
        tags,
      });
    }

    setImages(getGalleryImages());
    setFormData({
      imageUrl: '',
      title: '',
      description: '',
      category: 'event',
      tags: '',
    });
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (image: GalleryImage) => {
    setFormData({
      imageUrl: image.imageUrl,
      title: image.title,
      description: image.description,
      category: image.category,
      tags: image.tags.join(', '),
    });
    setImagePreview(image.imageUrl);
    setEditingId(image.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteGalleryImage(id);
      setImages(getGalleryImages());
    }
  };

  const handleCleanupOldImages = () => {
    if (confirm('Delete all images older than 1 year? This action cannot be undone.')) {
      const deletedCount = deleteOldImages();
      setImages(getGalleryImages());
      alert(`Deleted ${deletedCount} old image(s)`);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      imageUrl: '',
      title: '',
      description: '',
      category: 'event',
      tags: '',
    });
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
              Gallery Management
            </h1>
            {!showForm && (
              <div className="flex gap-3">
                <Button onClick={handleCleanupOldImages} variant="outline">
                  <Trash className="w-4 h-4 mr-2" />
                  Cleanup Old Images
                </Button>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>
            )}
          </div>

          {showForm ? (
            <div className={`rounded-2xl border p-6 md:p-8 transition-colors duration-200 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <h2 className={`text-2xl font-bold mb-6 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {editingId ? 'Edit Image' : 'Add New Image'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      id="gallery-image-upload"
                      required={!formData.imageUrl}
                    />
                    <label htmlFor="gallery-image-upload" className="cursor-pointer w-full text-center">
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
                        isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
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
                        isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2`}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  />
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
                      isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  />
                </div>

                {formData.imageUrl && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      Preview
                    </label>
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button type="submit">{editingId ? 'Update Image' : 'Add Image'}</Button>
                  <Button type="button" onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.length > 0 ? (
                images.map((image) => (
                  <div
                    key={image.id}
                    className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <p className={`text-sm font-medium transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          {image.title}
                        </p>
                        <p className={`text-xs transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {new Date(image.uploadDate).toLocaleDateString()}
                        </p>
                      </div>

                      <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                        isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {image.category}
                      </span>

                      {image.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {image.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-2 py-1 rounded-full ${
                                isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                          {image.tags.length > 2 && (
                            <span className={`text-xs px-2 py-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              +{image.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleEdit(image)}
                          className="flex-1 p-3 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                        >
                          <Edit2 className="w-4 h-4 inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="flex-1 p-3 text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4 inline mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`col-span-full text-center py-12 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <p>No images in gallery yet. Add your first image!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
