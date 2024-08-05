import { Footer } from "@/components/navigation/footer/footer";
import { Navbar } from "@/components/navigation/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
