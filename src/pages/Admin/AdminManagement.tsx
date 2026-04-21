import { useState } from 'react';
import { Header } from '../../app/components/Header';
import { Footer } from '../../app/components/Footer';
import { Button } from '../../app/components/ui/button';
import { useTheme } from '../../hooks/useTheme';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { Trash2, Edit2, Plus, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  Admin,
} from '../../utils/adminStore';

export default function AdminManagement() {
  const { isDark } = useTheme();
  const { admin: currentAdmin } = useAuth();
  const navigate = useNavigate();
  usePageTitle('Admin Management | Jayashree Foundation');

  const [admins, setAdmins] = useState(getAllAdmins());
  const [showForm, setShowForm] = useState(false);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    role: 'admin' as const,
  });

  // Only super_admin can manage admins
  if (currentAdmin?.role !== 'super_admin') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className={`text-2xl font-bold transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Access Denied
            </h1>
            <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Only super admins can manage admin accounts.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEmail) {
      updateAdmin(editingEmail, {
        fullName: formData.fullName,
        role: formData.role,
      });
    } else {
      createAdmin(formData.email, formData.fullName, formData.role);
    }

    setAdmins(getAllAdmins());
    setFormData({ email: '', fullName: '', role: 'admin' });
    setEditingEmail(null);
    setShowForm(false);
  };

  const handleEdit = (admin: Admin) => {
    setFormData({
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role,
    });
    setEditingEmail(admin.email);
    setShowForm(true);
  };

  const handleDelete = (email: string) => {
    if (currentAdmin?.email === email) {
      alert('You cannot delete your own account');
      return;
    }
    if (confirm(`Are you sure you want to delete ${email}?`)) {
      deleteAdmin(email);
      setAdmins(getAllAdmins());
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEmail(null);
    setFormData({ email: '', fullName: '', role: 'admin' });
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
              Admin Management
            </h1>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
            )}
          </div>

          {showForm ? (
            <div className={`rounded-2xl border p-6 md:p-8 transition-colors duration-200 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <h2 className={`text-2xl font-bold mb-6 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {editingEmail ? 'Edit Admin' : 'Add New Admin'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={!!editingEmail}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2 disabled:opacity-50`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <Button type="submit">{editingEmail ? 'Update Admin' : 'Add Admin'}</Button>
                  <Button type="button" onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className={`rounded-2xl border transition-colors duration-200 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`border-b ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Email
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Name
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Role
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Status
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Last Login
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.length > 0 ? (
                      admins.map((admin) => (
                        <tr
                          key={admin.email}
                          className={`border-b transition-colors duration-200 ${
                            isDark
                              ? 'border-slate-700 hover:bg-slate-700/50'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <td className={`px-6 py-4 text-sm transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                            {admin.email}
                          </td>
                          <td className={`px-6 py-4 text-sm transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                            {admin.fullName}
                          </td>
                          <td className={`px-6 py-4 text-sm transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                            <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                              {admin.role.replace('_', ' ')}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-sm transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                admin.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {admin.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-sm transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                            {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                              {currentAdmin?.email !== admin.email && (
                                <>
                                  <button
                                    onClick={() => handleEdit(admin)}
                                    className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                                    title="Edit"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(admin.email)}
                                    className="p-2 text-red-600 hover:text-red-700 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className={`px-6 py-12 text-center text-sm transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                        >
                          No admins yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
