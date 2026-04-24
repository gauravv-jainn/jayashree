import { useEffect, useState } from 'react';
import { Header } from '../app/components/Header';
import { Footer } from '../app/components/Footer';
import { getMembers } from '../utils/memberStore';
import { useTheme } from '../hooks/useTheme';
import { usePageTitle } from '../hooks/usePageTitle';

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  email?: string;
  linkedIn?: string;
}

export default function Members() {
  const { isDark } = useTheme();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  usePageTitle('Our Team | Jayashree Foundation');

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    try {
      const allMembers = getMembers();
      setMembers(allMembers);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-32 pb-12">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Team
          </h1>
          <p className={`text-lg transition-colors duration-200 mb-12 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Meet the dedicated members of Jayashree Foundation
          </p>

          {loading ? (
            <div className="text-center py-12">
              <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>Loading team members...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12">
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>No team members yet. Ask admin to add some!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className={`rounded-2xl border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex justify-center pt-6 pb-2">
                    <div className="relative w-32 h-32">
                      {member.photoUrl && (
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full border-4 border-blue-500"
                        />
                      )}
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className={`text-lg md:text-xl font-bold mb-1 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600 mb-3">{member.role}</p>
                    <p className={`mb-4 text-sm md:text-base transition-colors duration-200 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {member.bio}
                    </p>
                    <div className="flex gap-3">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                        >
                          Email
                        </a>
                      )}
                      {member.linkedIn && (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
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
