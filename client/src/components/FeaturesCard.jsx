import InspirationalQuotesCard from './cards/InspirationalQuotesCard';
import AIAssistantCard from './cards/AIAssistantCard';
import GetTherapistCard from './cards/GetTherapistCard';
import EducationalResourcesCard from './cards/EducationalResourcesCard';
import PersonalizedRecoveryCard from './cards/PersonalizedRecoveryCard';
import HabitTrackerCard from './cards/HabitTrackerCard';
import DashboardCard from './cards/DashboardCard';
import CommunitySupportCard from './cards/CommunitySupportCard';
import CrisisSupportCard from './cards/CrisisSupportCard';
// import CalendarIntegrationCard from './cards/CalendarIntegrationCard';
// import AchievementsCard from './cards/AchievementsCard';
import FeatureCard from './FeatureCard';

const FeaturesCard= () => {
  return (
    <div className="max-w-7xl mx-auto py-16  px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Comprehensive Support for Your Recovery
        </h1>
        <p className="text-lg">
          Our recovery app offers a wide range of features to support you throughout your addiction recovery journey.
        </p>
      </div>
      
      {/* Main Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <FeatureCard>
          <AIAssistantCard />
        </FeatureCard>
         <FeatureCard>
          <GetTherapistCard />
        </FeatureCard>
       <FeatureCard>
          <EducationalResourcesCard />
        </FeatureCard>
         <FeatureCard>
          <PersonalizedRecoveryCard />
        </FeatureCard>
        <FeatureCard>
          <HabitTrackerCard />
        </FeatureCard>
        <FeatureCard>
          <InspirationalQuotesCard />
        </FeatureCard> 
      </div>

      {/* Upcoming Features Section */}
      <div className="text-center bg-gray-100 py-8 my-12 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Upcoming Features
        </h2>
        <p className="text-base text-black">
          Stay tuned for these exciting new features coming soon to our recovery app.
        </p>
      </div>

      {/* Upcoming Features List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard>
          <DashboardCard />
        </FeatureCard>
        <FeatureCard>
          <CommunitySupportCard />
        </FeatureCard>
        <FeatureCard>
          <CrisisSupportCard />
        </FeatureCard>
      </div>
    </div>
  );
};

export default FeaturesCard;
