import HeroSection from "@/sections/HeroSection";
import ProblemSection from "@/sections/ProblemSection";
import CapabilitiesSection from "@/sections/CapabilitiesSection";
import ArchitectureSection from "@/sections/ArchitectureSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import WorkflowSection from "@/sections/WorkflowSection";
import ScreenshotsSection from "@/sections/ScreenshotsSection";
import PerformanceSection from "@/sections/PerformanceSection";
import SecuritySection from "@/sections/SecuritySection";
import EnterpriseSection from "@/sections/EnterpriseSection";
import DeveloperExperienceSection from "@/sections/DeveloperExperienceSection";
import ApiSection from "@/sections/ApiSection";
import DocumentationSection from "@/sections/DocumentationSection";
import RoadmapSection from "@/sections/RoadmapSection";
import FaqSection from "@/sections/FaqSection";
import CtaSection from "@/sections/CtaSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ProblemSection />
      <CapabilitiesSection />
      <ArchitectureSection />
      <HowItWorksSection />
      <WorkflowSection />
      <ScreenshotsSection />
      <PerformanceSection />
      <SecuritySection />
      <EnterpriseSection />
      <DeveloperExperienceSection />
      <ApiSection />
      <DocumentationSection />
      <RoadmapSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
