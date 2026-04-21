import { useState } from 'react';
import { Header } from '../app/components/Header';
import { Footer } from '../app/components/Footer';
import { Button } from '../app/components/ui/button';
import { useTheme } from '../hooks/useTheme';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Donate() {
  const { isDark } = useTheme();
  const [donationType, setDonationType] = useState<'one-time' | 'recurring'>('one-time');
  const [amount, setAmount] = useState(500);
  usePageTitle('Donate | Jayashree Foundation');

  const handleDonate = () => {
    // PhonePay integration will go here
    console.log(`Processing ${donationType} donation of ₹${amount}`);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-center transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Support Our Mission
          </h1>
          <p className={`text-lg mb-12 text-center transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Your donation makes a real difference in our communities
          </p>

          <div className={`rounded-2xl shadow-lg p-6 md:p-8 border transition-colors duration-200 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="space-y-6">
              {/* Donation Type */}
              <div>
                <label className={`block text-sm font-medium mb-3 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Donation Type
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDonationType('one-time')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      donationType === 'one-time'
                        ? 'bg-blue-600 text-white'
                        : isDark
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    onClick={() => setDonationType('recurring')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      donationType === 'recurring'
                        ? 'bg-blue-600 text-white'
                        : isDark
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className={`block text-sm font-medium mb-3 transition-colors duration-200 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Amount (₹ INR)
                </label>
                <div className="flex gap-3 flex-wrap mb-4">
                  {[250, 500, 1000, 5000].map((value) => (
                    <button
                      key={value}
                      onClick={() => setAmount(value)}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        amount === value
                          ? 'bg-blue-600 text-white'
                          : isDark
                            ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      ₹{value}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    isDark ? 'bg-slate-700 border-slate-600 text-white focus:ring-blue-500' : 'bg-white border-slate-300 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2`}
                  placeholder="Custom amount"
                />
              </div>

              <Button onClick={handleDonate} size="lg" className="w-full">
                Donate ₹{amount}
              </Button>
            </div>
          </div>

          <div className={`mt-12 p-6 md:p-8 rounded-2xl border transition-colors duration-200 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className={`font-bold mb-3 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Your Impact
            </h3>
            <ul className={`space-y-2 transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• ₹250 provides school supplies for a child</li>
              <li>• ₹500 supports a student's monthly education</li>
              <li>• ₹2,000 helps a family access healthcare</li>
              <li>• ₹10,000 funds a complete community project</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
