import Image from "next/image";
import Header  from '@/app/_component/Header';
import Footer  from '@/app/_component/Footer'
import UpdateStore from '@/app/_component/UpdateStore';

export default function Home() {
  return (
    <div>
      <Header/>
      <UpdateStore/>
      <Footer/>
    </div>
  );
}