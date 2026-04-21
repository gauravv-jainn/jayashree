import { Header } from '../app/components/Header';
import { Footer } from '../app/components/Footer';
import { useTheme } from '../hooks/useTheme';
import { usePageTitle } from '../hooks/usePageTitle';

export default function TermsOfService() {
  const { isDark } = useTheme();
  usePageTitle('Terms of Service | Jayashree Foundation');

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Terms of Service
          </h1>
          <p className={`text-base transition-colors duration-200 mb-12 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className={`prose ${isDark ? 'prose-invert' : ''} max-w-none space-y-8`}>
            {/* Agreement */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                1. Agreement to Terms
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* Use License */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2. Use License
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'} mb-4`}>
                Permission is granted to temporarily download one copy of the materials (information or software) on Jayashree Foundation's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                3. Disclaimer
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                The materials on Jayashree Foundation's website are provided on an 'as is' basis. Jayashree Foundation makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            {/* Limitations */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                4. Limitations
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                In no event shall Jayashree Foundation or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Jayashree Foundation's website, even if Jayashree Foundation or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            {/* Accuracy of Materials */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                5. Accuracy of Materials
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                The materials appearing on Jayashree Foundation's website could include technical, typographical, or photographic errors. Jayashree Foundation does not warrant that any of the materials on its website are accurate, complete, or current. Jayashree Foundation may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                6. Modifications
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Jayashree Foundation may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                7. Governing Law
              </h2>
              <p className={`transition-colors duration-200 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
