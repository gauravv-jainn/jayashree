import { useState, useEffect } from 'react';
import { Header } from '../../app/components/Header';
import { Footer } from '../../app/components/Footer';
import { Button } from '../../app/components/ui/button';
import { useNavigate } from 'react-router';
import { useTheme } from '../../hooks/useTheme';
import { usePageTitle } from '../../hooks/usePageTitle';
import { ArrowLeft } from 'lucide-react';
import { saveProject, getProjects, deleteProject, updateProject } from '../../utils/projectStore';

export default function AdminUploadProject() {
  const { isDark } = useTheme();
  usePageTitle('Upload Projects | Admin | Jayashree Foundation');
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    impact: '',
    imageUrl: '',
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

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

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = getProjects();
    setProjects(allProjects);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      setMessage('❌ Please fill all required fields');
      return;
    }

    setUploading(true);

    try {
      if (editingId) {
        updateProject(editingId, {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          date: formData.date || new Date().toISOString(),
          imageUrl: formData.imageUrl,
          impact: formData.impact,
        });
        setMessage('✅ Project updated successfully!');
      } else {
        saveProject({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          date: formData.date || new Date().toISOString(),
          imageUrl: formData.imageUrl,
          impact: formData.impact,
        });
        setMessage('✅ Project added successfully!');
      }

      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
          impact: '',
          imageUrl: '',
        });
        setImagePreview('');
        setEditingId(null);
        setMessage('');
        loadProjects();
      }, 2000);
    } catch (error) {
      setMessage('❌ Error saving project');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      date: project.date.split('T')[0],
      impact: project.impact,
      imageUrl: project.imageUrl,
    });
    setImagePreview(project.imageUrl);
    setEditingId(project.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this project?')) {
      deleteProject(id);
      loadProjects();
      setMessage('✅ Project deleted!');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      impact: '',
      imageUrl: '',
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

          <h1 className={`text-4xl font-bold mb-12 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {editingId ? '✏️ Edit Project' : '➕ Add New Project'}
          </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select category</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="livelihood">Livelihood</option>
                <option value="community">Community Development</option>
              </select>
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

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <Button type="submit" disabled={uploading} size="lg" className="w-full">
            {uploading ? 'Saving...' : (editingId ? '💾 Update Project' : '➕ Add Project')}
          </Button>
        </form>

        {/* Projects List */}
        <div className={`mt-12 p-8 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            📋 All Projects ({projects.length})
          </h2>

          {projects.length === 0 ? (
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              No projects yet. Create your first project above!
            </p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 rounded-lg border flex justify-between items-start ${
                    isDark
                      ? 'bg-slate-700 border-slate-600'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {project.description.substring(0, 100)}...
                    </p>
                    <div className="flex gap-4 mt-2 text-xs">
                      <span className="text-blue-500">{project.category}</span>
                      <span className="text-gray-500">{new Date(project.date).toLocaleDateString()}</span>
                      <span className="text-green-500">{project.impact} impacted</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
