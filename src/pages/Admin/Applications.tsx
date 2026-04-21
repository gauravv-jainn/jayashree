import { useState, useEffect } from 'react';
import { Header } from '../../app/components/Header';
import { Footer } from '../../app/components/Footer';
import { Button } from '../../app/components/ui/button';
import { useNavigate } from 'react-router';
import { useTheme } from '../../hooks/useTheme';
import { usePageTitle } from '../../hooks/usePageTitle';
import { ArrowLeft } from 'lucide-react';
import { getSubmissions, deleteSubmission } from '../../utils/formSubmissionsStore';
import { useAuth } from '../../context/AuthContext';

export default function AdminApplications() {
  const { isDark } = useTheme();
  usePageTitle('Applications | Admin | Jayashree Foundation');
  const { logout } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const data = getSubmissions();
    setSubmissions(data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this application?')) {
      deleteSubmission(id);
      loadSubmissions();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
            📋 Form Submissions
          </h1>

          {submissions.length === 0 ? (
            <div
              className={`p-8 rounded-lg text-center ${
                isDark ? 'bg-slate-800' : 'bg-slate-50 border border-slate-200'
              }`}
            >
              <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                No applications yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`p-6 rounded-lg border ${
                    isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {submission.fullName}
                      </h3>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleDelete(submission.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>

                  <div
                    className={`grid md:grid-cols-2 gap-6 text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p>{submission.email}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <p>{submission.phone}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Location</p>
                      <p>
                        {submission.address}, {submission.city}, {submission.state}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Interest Type</p>
                      <p className="capitalize">{submission.involvement}</p>
                    </div>
                    {submission.interests.length > 0 && (
                      <div className="md:col-span-2">
                        <p className="font-semibold mb-1">Areas of Interest</p>
                        <p>{submission.interests.join(', ')}</p>
                      </div>
                    )}
                    {submission.message && (
                      <div className="md:col-span-2">
                        <p className="font-semibold mb-1">Message</p>
                        <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {submission.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
