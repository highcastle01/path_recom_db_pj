import Image from "next/image";
import Header  from '@/app/_component/Header';
import Footer  from '@/app/_component/Footer'
import StoreInfo from '@/app/_component/StoreInfo';

export default function Home() {
  return (
      <div>
          <Header/>
          <StoreInfo/>
          <Footer/>
      </div>
  );
}
