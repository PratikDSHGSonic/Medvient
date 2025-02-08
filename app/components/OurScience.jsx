// components/OurScience.jsx

"use client"
import Image from 'next/image';
import { useState } from 'react';

const publications = [
    {
        logo: "https://www.tempus.com/wp-content/uploads/2021/09/Logo-3.png",
        title: "Nature Biotechnology Study Reveals that Tempus' xT Platform Increases Cancer Patients' Personalized Therapeutic Opportunities",
        description: "Extensive molecular profiling combined with clinical data identifies targeted therapies and clinical trials for a large proportion of cancer patients, and paired tumor/normal plus transcriptome sequencing outperforms tumor-only DNA panel testing."
    },
    {
        logo: "https://www.tempus.com/wp-content/uploads/2021/11/logo_cellreportswhite.png",
        title: "A Pan-cancer Organoid Platform for Precision Medicine",
        description: "Showcasing a robust pan-cancer tumor organoid (TO) platform, revealing genomic/transcriptome fidelity of TO culture from >1,000 patients. We demonstrate a neural-network-based high-throughput approach for label-free, light-microscopy-based drug assays capable of predicting patient-specific heterogeneity in drug responses with applicability across solid cancers."
    },
    {
        logo: "https://www.tempus.com/wp-content/uploads/2021/11/logo_npj-precision-oncologywhite.png",
        title: "Validation of a Liquid Biopsy Assay with Molecular and Clinical Profiling of Circulating Tumor DNA",
        description: "Actionable variants would have been missed if only solid tumor or liquid biopsy tests were performed. Thus, we believe that liquid biopsies provide value to patients when used in combination with standard tissue genotyping."
    }
];

const OurScience = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="relative min-h-screen flex">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/gradient_our_science.jpg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>

            {/* Content */}
            <div className="relative w-full max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row">
                {/* Left Section */}
                <div className="w-full md:w-1/3 pr-0 md:pr-8 mb-8 md:mb-0">
                    <h2 className="text-2xl md:text-3xl font-normal text-white mb-4 md:mb-8">
                        Our Science
                    </h2>
                    <p className="text-sm md:text-base text-white mb-6 md:mb-12 leading-relaxed">
                        Through our scientific publications and research projects, we are
                        accelerating and transforming personalized patient care.
                    </p>
                    <button className="w-full md:w-auto bg-blue-600 text-xs md:text-sm text-white px-4 md:px-6 py-2 md:py-3 rounded hover:bg-blue-700 transition-colors uppercase tracking-wider font-medium">
                        VIEW ALL PUBLICATIONS
                    </button>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-2/3">
                    {publications.map((pub, index) => (
                        <div
                            key={index}
                            className={`border border-gray-400 rounded-lg p-4 md:p-8 mb-4 transition-all duration-300 ${
                                hoveredIndex === index ? 'bg-white bg-opacity-10' : 'bg-transparent'
                            }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr_30px] md:grid-cols-[200px_1fr_50px] gap-4 md:gap-6 items-start">
                                {/* Logo Section */}
                                <div className="h-6 md:h-8">
                                    <Image
                                        src={pub.logo}
                                        alt="Publication Logo"
                                        width={150}
                                        height={32}
                                        objectFit="contain"
                                        className="max-w-[120px] sm:max-w-[150px]"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-col gap-2 md:gap-4">
                                    <h3 className="text-white text-xs font-semibold">
                                        {pub.title}
                                    </h3>
                                    <p className="text-gray-300 text-xs leading-relaxed">
                                        {pub.description}
                                    </p>
                                </div>

                                {/* Arrow Section */}
                                <div className="hidden sm:block self-start">
                                    <svg
                                        className="w-4 h-4 md:w-6 md:h-6 text-white transform rotate-45"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurScience;