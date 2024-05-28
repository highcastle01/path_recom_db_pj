import Image from "next/image";
import Header  from '@/app/_component/Header';
import Footer  from '@/app/_component/Footer'
import Signup from '@/app/_component/Signup';
import Success from '@/app/_component/Success';

export default function Home() {
  return (
      <div>
          <Header/>
          <Success/>
          <Footer/>
      </div>
  );
}
