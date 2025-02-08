// 'use client';
// import React from 'react';
// import Image from 'next/image';

// const AIPowerSection = () => {
//   const capabilities = [
//     {
//       title: 'ACCELERATE',
//       description: 'the discovery of novel targets'
//     },
//     {
//       title: 'PREDICT',
//       description: 'the effectiveness of treatments'
//     },
//     {
//       title: 'IDENTIFY',
//       description: 'potentially life-saving clinical trials'
//     },
//     {
//       title: 'DIAGNOSE',
//       description: 'multiple diseases earlier'
//     }
//   ];

//   return (
//     <div className="relative h-[80vh] w-full overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0">
//         <Image
//           src="/backgroundBlue1.webp"
//           alt="Background Gradient"
//           fill
//           className="object-cover"
//           priority
//         />
//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black/50"></div>
//       </div>

//       {/* Content */}
//       <div className="relative h-full w-full">
//         <div className="container mx-auto h-full px-4 md:px-6">
//           <div className="flex h-full flex-col md:flex-row md:items-center md:justify-between">
//             {/* Left Side - Main Text */}
//             <div className="mb-3 md:mb-0 md:w-1/2 pt-20 md:pt-0">
//               <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight">
//                 With the power of AI, we now have the ability to
//               </h2>
//             </div>

//             {/* Right Side - Capabilities List */}
//             <div className="md:w-1/2">
//               <div className="space-y-2">
//                 {capabilities.map((item, index) => (
//                   <div key={index} className="mb-6">
//                     <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
//                       {item.title}
//                     </h3>
//                     <p className="text-lg md:text-xl text-gray-200">
//                       {item.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AIPowerSection;



// 'use client';
// import React from 'react';
// import Image from 'next/image';

// const AIPowerSection = () => {
//   const capabilities = [
//     {
//       title: 'ACCELERATE',
//       description: 'the discovery of novel targets'
//     },
//     {
//       title: 'PREDICT',
//       description: 'the effectiveness of treatments'
//     },
//     {
//       title: 'IDENTIFY',
//       description: 'potentially life-saving clinical trials'
//     },
//     {
//       title: 'DIAGNOSE',
//       description: 'multiple diseases earlier'
//     }
//   ];

//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0">
//         <Image
//           src="/backgroundBlue1.webp"
//           alt="Background Gradient"
//           fill
//           className="object-cover"
//           priority
//         />
//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black/30"></div>
//       </div>

//       {/* Content */}
//       <div className="relative h-full w-full flex items-center">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="flex flex-col md:flex-row items-center justify-center gap-x-20">
//             {/* Left Side - Main Text */}
//             <div className="md:w-[45%] mb-10 md:mb-0">
//               <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
//                 With the power of AI,
//                 <br />
//                 we now have the ability
//                 <br />
//                 to
//               </h2>
//             </div>

//             {/* Right Side - Capabilities List */}
//             <div className="md:w-[35%]">
//               <div className="space-y-8">
//                 {capabilities.map((item, index) => (
//                   <div key={index} className="mb-2">
//                     <h3 className="text-lg md:text-xl font-bold text-white mb-1">
//                       {item.title}
//                     </h3>
//                     <p className="text-base md:text-lg text-gray-200 font-light">
//                       {item.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AIPowerSection;






'use client';
import React from 'react';
import Image from 'next/image';

const AIPowerSection = () => {
  const capabilities = [
    {
      title: 'ACCELERATE',
      description: 'the discovery of novel targets'
    },
    {
      title: 'PREDICT',
      description: 'the effectiveness of treatments'
    },
    {
      title: 'IDENTIFY',
      description: 'potentially life-saving clinical trials'
    },
    {
      title: 'DIAGNOSE',
      description: 'multiple diseases earlier'
    }
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/backgroundBlue1.webp"
          alt="Background Gradient"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-full flex items-center">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24">
            {/* Left Side - Main Text */}
            <div className="max-w-2xl mb-12 items-end">
              <h2 className="text-4xl lg:text-4xl font-light text-white leading-tight">
                With the power of AI, we
                <br />
                now have the ability to
              </h2>
            </div>

            {/* Right Side - Capabilities List */}
            {/* <div className="space-y-12 items-center">
              {capabilities.map((item, index) => (
                <div key={index}>
                  <h3 className="text-xl lg:text-2xl font-semibold text-white tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-200 font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </div> */}
            <div className="space-y-12 max-w-2xl mx-auto">
              {capabilities.map((item, index) => (
                <div key={index}>
                  <h3 className="text-xl lg:text-2xl font-semibold text-white tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-200 font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPowerSection;