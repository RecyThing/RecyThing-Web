import { DownloadSection, ExplorationSection, FeatureSection, Footer, HeroSection, QuestionSection } from "@/components/sections";
import { NavBar } from "@/components/navigation";

const LandingPage = () => {
	return (
		<div className="overflow-x-hidden">
			<NavBar />
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
