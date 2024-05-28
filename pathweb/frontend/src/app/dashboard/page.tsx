import Image from "next/image";
import Header  from '@/app/_component/Header';
import Footer  from '@/app/_component/Footer'
import Dashboard from '@/app/_component/Dashboard';

export default function Home() {
  return (
    <div>
      <Header/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}