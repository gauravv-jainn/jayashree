import { useEffect, useState } from 'react';
import { Header } from '../../app/components/Header';
import { Footer } from '../../app/components/Footer';
import { Button } from '../../app/components/ui/button';
import { useNavigate } from 'react-router';
import { useTheme } from '../../hooks/useTheme';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useAuth } from '../../context/AuthContext';
import { getProjects } from '../../utils/projectStore';
import { getMembers } from '../../utils/memberStore';
import { getSubmissions } from '../../utils/formSubmissionsStore';
import { ArrowRight, Images, Users, FileText, Image } from 'lucide-react';
import logo from '../../assets/jayashree-logo.png';

export default function AdminDashboard() {
  const { isDark } = useTheme();
  usePageTitle('Admin Dashboard | Jayashree Foundation');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projects: 0,
    members: 0,
    applications: 0,
  });

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = () => {
    try {
      const projects = getProjects();
      const members = getMembers();
      const submissions = getSubmissions();
      setStats({
        projects: projects.length,
        members: members.length,
        applications: submissions.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-12">
          {/* Header Section */}
          <div className="mb-12 flex items-center gap-6">
            <img
              src={logo}
              alt="Jayashree Foundation"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg flex-shrink-0"
            />
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-2 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Admin Dashboard
              </h1>
              <p className={`text-base transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Manage your foundation's content and operations
              </p>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {/* Projects Card */}
            <div className={`p-6 rounded-xl border transition-all duration-200 ${
              isDark
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            } hover:shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-blue-900/30' : 'bg-blue-100'
                }`}>
                  <Images className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className={`text-sm transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Projects
              </p>
              <p className={`text-3xl font-bold mt-2 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {stats.projects}
              </p>
            </div>

            {/* Members Card */}
            <div className={`p-6 rounded-xl border transition-all duration-200 ${
              isDark
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            } hover:shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-orange-900/30' : 'bg-orange-100'
                }`}>
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className={`text-sm transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Team Members
              </p>
              <p className={`text-3xl font-bold mt-2 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {stats.members}
              </p>
            </div>

            {/* News Card */}
            <div className={`p-6 rounded-xl border transition-all duration-200 ${
              isDark
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            } hover:shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-purple-900/30' : 'bg-purple-100'
                }`}>
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className={`text-sm transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Applications
              </p>
              <p className={`text-3xl font-bold mt-2 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {stats.applications}
              </p>
            </div>

            {/* Gallery Card */}
            <div className={`p-6 rounded-xl border transition-all duration-200 ${
              isDark
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            } hover:shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-green-900/30' : 'bg-green-100'
                }`}>
                  <Image className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className={`text-sm transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Gallery
              </p>
              <p className={`text-3xl font-bold mt-2 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                0
              </p>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Manage Projects */}
            <button
              onClick={() => navigate('/admin/upload-project')}
              className={`p-8 rounded-xl border text-left transition-all duration-200 group ${
                isDark
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-bold transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    📸 Upload Projects
                  </h3>
                  <p className={`text-sm mt-1 transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Add, edit, and manage projects with images and impact metrics
                  </p>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              </div>
            </button>

            {/* Manage News */}
            <button
              onClick={() => navigate('/admin/news')}
              className={`p-8 rounded-xl border text-left transition-all duration-200 group ${
                isDark
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-purple-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-bold transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    📰 News Management
                  </h3>
                  <p className={`text-sm mt-1 transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Create, publish, and manage news articles and updates
                  </p>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              </div>
            </button>

            {/* Manage Gallery */}
            <button
              onClick={() => navigate('/admin/gallery')}
              className={`p-8 rounded-xl border text-left transition-all duration-200 group ${
                isDark
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-green-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-bold transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    🖼️ Gallery Management
                  </h3>
                  <p className={`text-sm mt-1 transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Upload and organize photos from events and activities
                  </p>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              </div>
            </button>

            {/* Manage Members */}
            <button
              onClick={() => navigate('/admin/members')}
              className={`p-8 rounded-xl border text-left transition-all duration-200 group ${
                isDark
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-orange-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-bold transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    👥 Team Members
                  </h3>
                  <p className={`text-sm mt-1 transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Add, edit, and manage team member profiles
                  </p>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              </div>
            </button>

            {/* View Applications */}
            <button
              onClick={() => navigate('/admin/applications')}
              className={`p-8 rounded-xl border text-left transition-all duration-200 group ${
                isDark
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-red-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-bold transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    📋 View Applications
                  </h3>
                  <p className={`text-sm mt-1 transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Review and manage NGO membership and volunteer applications
                  </p>
                </div>
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              </div>
            </button>
          </div>

          {/* Logout Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="px-8 py-2"
            >
              Logout
            </Button>
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
