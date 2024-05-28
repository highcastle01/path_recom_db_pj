import Image from "next/image";
import Header  from '@/app/_component/Header';
import Footer  from '@/app/_component/Footer'
import Signup from '@/app/_component/Signup';

export default function Home() {
  return (
      <div>
          <Header/>
          <Signup/>
          <Footer/>
      </div>
  );
}
