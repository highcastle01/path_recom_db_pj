import Image from "next/image";
import Header  from '@/app/_component/Header';
import Footer  from '@/app/_component/Footer'
import AddStore from '@/app/_component/AddStore';

export default function Home() {
  return (
    <div>
      <Header/>
      <AddStore/>
      <Footer/>
    </div>
  );
}