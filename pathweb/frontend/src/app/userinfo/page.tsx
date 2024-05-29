import Image from "next/image";
import Header  from '@/app/_component/Header';
import Footer  from '@/app/_component/Footer'
import Signup from '@/app/_component/Signup';
import Success from '@/app/_component/Success';
import UserInfo from '@/app/_component/userInfo';

export default function Home() {
  return (
      <div>
          <Header/>
          <UserInfo/>
          <Footer/>
      </div>
  );
}
