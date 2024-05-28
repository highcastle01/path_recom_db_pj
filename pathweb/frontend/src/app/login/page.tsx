import Image from "next/image";
import Header  from '@/app/_component/Header';
import Footer  from '@/app/_component/Footer'
import Login from '@/app/_component/Login';

export default function Home() {
  return (
      <div>
          <Header/>
          <Login/>
          <Footer/>
      </div>
  );
}
