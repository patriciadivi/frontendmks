import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Products } from "@/components/Products";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-between">
     <NavBar />

     <Products />

     <Footer />
    </main>
  );
}
