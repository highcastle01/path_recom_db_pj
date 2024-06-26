import Image from "next/image";
import Header  from './_component/Header';
import MainContent  from './_component/MainContent';
import Footer  from './_component/Footer';
import SearchContent from '@/app/_component/SearchContent';

export default function Home() {
  return (
      <div>
          <Header/>
          <MainContent />
          <Footer/>
      </div>
  );
}
