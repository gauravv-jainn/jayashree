import { useState, useEffect } from 'react';
import { Header } from '../../app/components/Header';
import { Footer } from '../../app/components/Footer';
import { Button } from '../../app/components/ui/button';
import { useNavigate } from 'react-router';
import { useTheme } from '../../hooks/useTheme';
import { usePageTitle } from '../../hooks/usePageTitle';
import { Trash2, Edit2, Plus, ArrowLeft } from 'lucide-react';
import { getMembers, saveMember, deleteMember, updateMember } from '../../utils/memberStore';

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  email?: string;
  linkedIn?: string;
}

export default function AdminMembers() {
  const { isDark } = useTheme();
  usePageTitle('Manage Members | Admin | Jayashree Foundation');
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    email: '',
    linkedIn: '',
    photoUrl: '',
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData((prev) => ({ ...prev, photoUrl: base64 }));
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    try {
      const allMembers = getMembers();
      setMembers(allMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.photoUrl) {
      setMessage('❌ Please fill required fields');
      return;
    }
    setUploading(true);

    try {
      if (editingId) {
        updateMember(editingId, {
          name: formData.name,
          role: formData.role,
          bio: formData.bio,
          email: formData.email,
          linkedIn: formData.linkedIn,
          photoUrl: formData.photoUrl,
        });
        setMessage('✅ Member updated successfully!');
      } else {
        saveMember({
          name: formData.name,
          role: formData.role,
          bio: formData.bio,
          email: formData.email,
          linkedIn: formData.linkedIn,
          photoUrl: formData.photoUrl,
        });
        setMessage('✅ Member added successfully!');
      }

      setFormData({
        name: '',
        role: '',
        bio: '',
        email: '',
        linkedIn: '',
        photoUrl: '',
      });
      setImagePreview('');
      setEditingId(null);
      setShowForm(false);
      fetchMembers();
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('❌ Error saving member');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (member: Member) => {
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      email: member.email || '',
      linkedIn: member.linkedIn || '',
      photoUrl: member.photoUrl,
    });
    setImagePreview(member.photoUrl);
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this member?')) {
      deleteMember(id);
      fetchMembers();
      setMessage('✅ Member deleted!');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      bio: '',
      email: '',
      linkedIn: '',
      photoUrl: '',
    });
    setImagePreview('');
    setShowForm(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header isDark={isDark} toggleDarkMode={toggleDarkMode} />

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
            Manage Members
          </h1>
          <Button onClick={() => (editingId ? cancelEdit() : setShowForm(!showForm))} size="lg">
            {showForm ? '✕ Cancel' : '+ Add Member'}
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6 mb-12 p-8 rounded-lg bg-blue-50 dark:bg-slate-800">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {editingId ? '✏️ Edit Member' : '➕ Add New Member'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Role *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                  }`}
                  placeholder="e.g., Director, Coordinator"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                }`}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                Upload Photo * (JPG, PNG, WebP)
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
                  id="member-image-upload"
                  required={!formData.photoUrl}
                />
                <label htmlFor="member-image-upload" className="cursor-pointer w-full text-center">
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img src={imagePreview} alt="Preview" className="w-24 h-24 mx-auto rounded-full object-cover" />
                      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Click to change photo
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className={`text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        📷 Click to upload or drag photo
                      </p>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        JPG, PNG or WebP (Max 5MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
              <p className={`mt-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                💡 Get free photos from unsplash.com
              </p>
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            <Button type="submit" disabled={uploading} size="lg" className="w-full">
              {uploading ? 'Saving...' : (editingId ? '💾 Update Member' : '➕ Add Member')}
            </Button>
          </form>
        )}

        {/* Members List */}
        <div className={`rounded-lg p-8 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Team Members ({members.length})
          </h3>
          {loading ? (
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Loading...</p>
          ) : members.length === 0 ? (
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              No members yet. Click "Add Member" to get started!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => (
                <div key={member.id} className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-white border border-slate-200'}`}>
                  <img src={member.photoUrl} alt={member.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                  <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{member.name}</h4>
                  <p className="text-sm text-blue-500 font-semibold">{member.role}</p>
                  <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{member.bio}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex-1 text-sm bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-3 rounded font-medium transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="flex-1 text-sm bg-red-500 hover:bg-red-600 text-white py-2.5 px-3 rounded font-medium transition-colors"
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

      <Footer isDark={isDark} />
    </div>
  );
}
