import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from '../../hooks/useTheme';
import { usePageTitle } from '../../hooks/usePageTitle';
import { Button } from '../../app/components/ui/button';
import { ProjectModal } from '../../app/components/ProjectModal';
import { saveProject, getProjects, deleteProject, updateProject } from '../../utils/projectStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminUploadProject() {
  const { isDark } = useTheme();
  usePageTitle('Upload Projects | Admin | Jayashree Foundation');
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = getProjects();
    setProjects(allProjects);
  };

  const handleAddProjectClick = () => {
    setEditingId(null);
    setEditingData(null);
    setModalOpen(true);
  };

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setEditingData({
      title: project.title,
      description: project.description,
      category: project.category,
      date: project.date.split('T')[0],
      impact: project.impact,
      imageUrl: project.imageUrl,
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this project?')) {
      deleteProject(id);
      loadProjects();
    }
  };

  const handleSubmit = async (formData: any) => {
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
      } else {
        saveProject({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          date: formData.date || new Date().toISOString(),
          imageUrl: formData.imageUrl,
          impact: formData.impact,
        });
      }

      setModalOpen(false);

      // Show loading screen
      const loadingScreen = document.createElement('div');
      loadingScreen.className = `fixed inset-0 flex items-center justify-center bg-black/50 z-50`;
      loadingScreen.innerHTML = `
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p class="text-white text-lg font-medium">${editingId ? 'Updating' : 'Creating'} project...</p>
        </div>
      `;
      document.body.appendChild(loadingScreen);

      // Redirect after 1.5 seconds
      setTimeout(() => {
        loadingScreen.remove();
        navigate('/projects');
      }, 1500);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
      setUploading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setEditingData(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 pb-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className={`text-4xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            📋 Manage Projects
          </h1>
          <p className={`text-lg transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Add, edit, and manage your foundation's projects
          </p>
        </div>

        {/* Add Project Button */}
        <div className="mb-12">
          <Button
            onClick={handleAddProjectClick}
            size="lg"
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </Button>
        </div>

        {/* Projects List */}
        <div className={`rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          {projects.length === 0 ? (
            <div className="p-12 text-center">
              <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                No projects yet. Click "Add New Project" to create one!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`border-b ${isDark ? 'border-slate-700 bg-slate-700/50' : 'border-slate-200 bg-slate-50'}`}>
                  <tr>
                    <th className={`px-6 py-4 text-left font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      Title
                    </th>
                    <th className={`px-6 py-4 text-left font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      Category
                    </th>
                    <th className={`px-6 py-4 text-left font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      Date
                    </th>
                    <th className={`px-6 py-4 text-left font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      Impact
                    </th>
                    <th className={`px-6 py-4 text-left font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr
                      key={project.id}
                      className={`border-b transition-colors ${
                        isDark
                          ? 'border-slate-700 hover:bg-slate-700/50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <td className={`px-6 py-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {project.description.substring(0, 50)}...
                          </p>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {project.category}
                      </td>
                      <td className={`px-6 py-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {new Date(project.date).toLocaleDateString()}
                      </td>
                      <td className={`px-6 py-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {project.impact} people
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={modalOpen}
        isLoading={uploading}
        editingData={editingData}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
