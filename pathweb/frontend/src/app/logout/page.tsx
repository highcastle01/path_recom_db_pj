import Image from "next/image";
import Header  from '@/app/_component/Header';
import Footer  from '@/app/_component/Footer'
import Signup from '@/app/_component/Signup';
import Success from '@/app/_component/Success';
import Logout from '@/app/_component/Logout';

export default function Home() {
  return (
      <div>
          <Header/>
          <Logout/>
          <Footer/>
      </div>
  );
}
