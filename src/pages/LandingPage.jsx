import { NavBar } from "@/components/navigation";
import {
	DownloadSection,
	ExplorationSection,
	FeatureSection,
	Footer,
	HeroSection,
	QuestionSection,
} from "@/components/sections";


const LandingPage = () => {


	return(
		<div className="overflow-x-hidden">
			<NavBar/>
			<HeroSection />
			<FeatureSection />
			<ExplorationSection />
			<QuestionSection />
			<DownloadSection />
			<Footer />
		</div>
	);
};

export default LandingPage;
