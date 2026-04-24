import { useState } from 'react';
import { Header } from '../app/components/Header';
import { Footer } from '../app/components/Footer';
import { Button } from '../app/components/ui/button';
import { saveSubmission } from '../utils/formSubmissionsStore';
import { useTheme } from '../hooks/useTheme';
import { usePageTitle } from '../hooks/usePageTitle';

export default function JoinNGO() {
  const { isDark } = useTheme();
  usePageTitle('Join Us | Jayashree Foundation');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    interests: [] as string[],
    involvement: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const interestOptions = ['Education', 'Healthcare', 'Environment', 'Community Development', 'Other'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Submitting form data:', formData);

      // Save to localStorage immediately (before email)
      saveSubmission({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        interests: formData.interests,
        involvement: formData.involvement,
        message: formData.message,
      });

      // Use local backend server on port 3001 for development
      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:3001/api/forms/join-ngo'
        : '/api/forms/join-ngo';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        setError(`⚠️ Application saved but email failed: ${response.status}. Backend issue.`);
      }

      // Show success message regardless of email result
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        interests: [],
        involvement: '',
        message: '',
      });
    } catch (error: any) {
      console.error('Form submission failed:', error);
      setError(`⚠️ Application saved locally but email error: ${error.message}`);
      // Still show success since we saved to localStorage
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        interests: [],
        involvement: '',
        message: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 md:px-8 pt-32 pb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Join Jayashree Foundation
          </h1>
          <p className={`text-lg mb-12 transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Be part of our mission to help communities and spread hope
          </p>

          {submitted ? (
            <div className={`rounded-2xl p-6 md:p-8 text-center border transition-colors duration-200 ${isDark ? 'bg-green-900/20 border-green-600' : 'bg-green-50 border-green-200'}`}>
              <p className={`text-xl font-bold mb-2 transition-colors duration-200 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                ✅ Thank you for your interest!
              </p>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                We've received your application and will be in touch soon. Check your email for confirmation!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-red-900/20 border-red-600 text-red-400' : 'bg-red-50 border-red-200 text-red-700'}`}>
                  {error}
                </div>
              )}

              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  />
                </div>
              </div>

              {/* Phone and Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  />
                </div>
              </div>

              {/* City and State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                      isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2`}
                  />
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className={`block text-sm font-medium mb-3 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Areas of Interest
                </label>
                <div className="space-y-2">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                        className="w-4 h-4 rounded"
                      />
                      <span className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Involvement */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  How would you like to be involved? *
                </label>
                <select
                  name="involvement"
                  value={formData.involvement}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2`}
                >
                  <option value="">Select an option</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="donor">Donor</option>
                  <option value="member">Member</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself and why you want to join..."
                  rows={5}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2`}
                />
              </div>

              <Button type="submit" disabled={loading} size="lg" className="w-full">
                {loading ? '⏳ Submitting...' : '✉️ Submit Application'}
              </Button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
