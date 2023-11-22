import Jumbotron from "@/components/jumbotron/Jumbotron";
import Navbar from "@/components/navigation/navbar/NavBar";
import Card from "@/components/card/Card";
import Frame from "@/components/frame/Frame";
import Footer from "@/components/footer/Footer";
import Question from "@/components/question/question";
import Download from "@/components/download/Download";
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Jumbotron />
      <Card />
      <Frame />
      <Question/>
      <Download/>
      <Footer/>
    </>
  );
};

export default LandingPage;
