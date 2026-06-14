import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
import Program from '@/components/Program';
import PPDBInfo from '@/components/PPDBInfo';
import RegistrationForm from '@/components/RegistrationForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Profile />
      <Program />
      <PPDBInfo />
      <RegistrationForm />
      <Contact />
      <Footer />
    </div>
  );
}
