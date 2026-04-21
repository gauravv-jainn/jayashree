import { Header } from '../app/components/Header';
import { Footer } from '../app/components/Footer';
import { useTheme } from '../hooks/useTheme';
import { usePageTitle } from '../hooks/usePageTitle';

export default function PrivacyPolicy() {
  const { isDark } = useTheme();
  usePageTitle('Privacy Policy | Jayashree Foundation');

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Privacy Policy
          </h1>
          <p className={`text-base transition-colors duration-200 mb-12 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className={`prose ${isDark ? 'prose-invert' : ''} max-w-none space-y-8`}>
            {/* Introduction */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                1. Introduction
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Jayashree Foundation ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2. Information We Collect
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'} mb-4`}>
                We may collect information about you in a variety of ways:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Information provided through forms and applications</li>
                <li>Usage data and analytics</li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </section>

            {/* Use of Information */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                3. How We Use Your Information
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'} mb-4`}>
                We use the information we collect for the following purposes:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li>To process your requests and applications</li>
                <li>To send you updates and communications</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                4. Data Security
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                5. Your Rights
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'} mb-4`}>
                You have the right to:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                6. Contact Us
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                If you have any questions about this Privacy Policy, please contact us at contact@jayashreefoundation.org
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
