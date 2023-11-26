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
	return (
		<>
			<NavBar />
			<HeroSection />
			<FeatureSection />
			<ExplorationSection />
			<QuestionSection />
			<DownloadSection />
			<Footer />
		</>
	);
};

export default LandingPage;
