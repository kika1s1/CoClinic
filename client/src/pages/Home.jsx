// import { useEffect, useState } from "react";
import FeaturesCard from "../components/FeaturesCard";
import logo from "../assets/coclinic.png"
// import { unSetProfile } from "../features/user/userSlice";
// import { useDispatch } from "react-redux";
const Home = () => {
  // const dispatch = useDispatch
  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  // const handleUnsetProfile = ()=>{
  //   dispatch(unSetProfile())
  // }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="absolute inset-0 bg-cover bg-center blur-lg" style={{ backgroundImage: `url(${logo})` }}></div>
        <div className="relative z-10 mx-auto grid grid-cols-1 md:grid-cols-2 p-8 md:p-12">
          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="font-bold text-4xl md:text-6xl text-sky-600">
              {/* The text will be populated by the useEffect hook */}
              Your CoClinic
            </h1>
            <p className="text-lg text-gray-700 mt-4">
              The platform focuses on enhancing the patient experience by offering multiple avenues for interaction, including direct communication with doctors and AI-based chatbots for preliminary consultations.
            </p>
            <div className="mt-6 flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-4">
              <button
                className="bg-sky-400 text-black font-semibold py-2 px-6 rounded w-full md:w-auto hover:bg-sky-500"
                onClick={() => (window.location.href = "/signup")} // Redirect using JavaScript
              >
                Get Started
              </button>

              {/* "Learn More" button */}
              <button
                className="border border-sky-400 font-semibold py-2 px-6 rounded w-full md:w-auto hover:bg-sky-500"
                onClick={handleLearnMoreClick}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div  className="relative z-10 mt-8">
        <FeaturesCard />
        </div>
    </>
  );
};

export default Home;
