import { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from './ui/button';

interface ProjectModalProps {
  isOpen: boolean;
  isLoading: boolean;
  editingData?: any;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

export function ProjectModal({ isOpen, isLoading, editingData, onClose, onSubmit }: ProjectModalProps) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState(
    editingData || {
      title: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      impact: '',
      imageUrl: '',
    }
  );
  const [imagePreview, setImagePreview] = useState<string>(editingData?.imageUrl || '');

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      alert('Please fill all required fields');
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Blur Background */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            isDark ? 'border-slate-700' : 'border-slate-200'
          }`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {editingData ? '✏️ Edit Project' : '➕ Add New Project'}
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter project title"
              />
            </div>

            {/* Description */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Describe the project"
              />
            </div>

            {/* Category and Impact */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., Education, Healthcare, Livelihood"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Impact (Lives Affected)
                </label>
                <input
                  type="number"
                  name="impact"
                  value={formData.impact}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Number of people impacted"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Project Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
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
                  id="image-upload"
                  required={!formData.imageUrl}
                />
                <label htmlFor="image-upload" className="cursor-pointer w-full text-center">
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

            {/* Modal Footer */}
            <div className="flex gap-3 justify-end pt-6 border-t" style={{
              borderColor: isDark ? '#334155' : '#e2e8f0'
            }}>
              <button
                type="button"
                onClick={onClose}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                }`}
              >
                Cancel
              </button>
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? 'Saving...' : (editingData ? '💾 Update Project' : '➕ Add Project')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
