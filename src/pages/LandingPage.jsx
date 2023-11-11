import Jumbotron from "@/components/Jumbotron";
// import Navbar from "@/components/navigation/NavBar";
import AboutListCard from "@/components/AboutListCard";
import Frame from "@/components/Frame";
import Footer from "@/components/footer/Footer";
const LandingPage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Jumbotron />
      <AboutListCard />
      <Frame />
      <Footer/>
    </>
  );
};

export default LandingPage;
