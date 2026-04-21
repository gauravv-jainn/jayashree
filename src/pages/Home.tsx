import { Header } from '../app/components/Header';
import { Hero } from '../app/components/Hero';
import { RecentWorks } from '../app/components/RecentWorks';
import { Achievements } from '../app/components/Achievements';
import { LatestNews } from '../app/components/LatestNews';
import { AboutSection } from '../app/components/AboutSection';
import { LocationMap } from '../app/components/LocationMap';
import { Footer } from '../app/components/Footer';
import { useTheme } from '../hooks/useTheme';

export default function Home() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />
      <main className="flex-1">
        <Hero />
        <RecentWorks />
        <Achievements />
        <LatestNews />
        <AboutSection />
        <LocationMap />
      </main>
      <Footer />
    </div>
  );
}
