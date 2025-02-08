

// app/components/PressReleases.js
"use client"
import Link from 'next/link';

const PressReleases = () => {
  const pressReleases = [
    {
      title: "Tempus Announces Real World Data Collaboration with BioNTech",
      description: "Tempus announced a multi-year collaboration with BioNTech that leverages its robust multimodal datasets, analytical support, computational biology expertise to BioNTech across its comprehensive research and development oncology pipeline.",
      background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))"
    },
    {
      title: "Tempus Launches Beta Version of olivia, its AI-enabled Personal Health Concierge App for Patients",
      description: "Tempus announced the beta launch of a patient-facing app, olivia, an AI-enabled personal health concierge to empower patients and their caregivers to holistically organize, manage, and proactively take control of their own health data.",
      background: "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.1))"
    },
    {
      title: "Tempus Receives U.S. FDA 510(k) Clearance for Tempus ECG-AF, an AI-based Algorithm that Identifies Patients at Increased Risk of AFib",
      description: "Tempus received 510(k) clearance from the FDA for its Tempus ECG-AF device that uses AI to help identify patients who may be at increased risk of atrial fibrillation/flutter (AF), the first FDA clearance for an AF indication in the category known as cardiovascular machine learning-based notification software.",
      background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))"
    }
  ];

  return (
    <div 
      className="relative bg-cover bg-center bg-no-repeat w-full"
      style={{
        backgroundImage: "url('/gradient_our_science.jpg')",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {pressReleases.map((press, index) => (
          <article
            key={index}
            className="flex flex-col min-h-[600px] lg:h-screen p-6 sm:p-8 md:p-10 lg:p-12 backdrop-blur-sm"
            style={{ 
              background: press.background,
            }}
          >
            {/* Top section for heading */}
            <div className="pt-8 sm:pt-12 lg:pt-16">
              <h2 className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold leading-tight">
                {press.title}
              </h2>
            </div>

            {/* Middle section for content */}
            <div className="flex-grow flex items-center py-8 sm:py-10 lg:py-12">
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed opacity-80">
                {press.description}
              </p>
            </div>

            {/* Bottom section for button */}
            <div className="pb-8 sm:pb-12 lg:pb-16">
              <button className="bg-[#1960E6] text-white font-bold py-2 sm:py-2 px-4 sm:px-6 text-sm sm:text-base w-fit hover:bg-blue-700 transition-colors">
                READ PRESS RELEASE
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PressReleases;