import Image from "next/image";
import Header  from '@/app/_component/Header';
import Footer  from '@/app/_component/Footer'
import SearchContent from '@/app/_component/SearchContent';

export default function Home() {
  return (
      <div>
          <Header/>
          <SearchContent/>
          <Footer/>
      </div>
  );
}
