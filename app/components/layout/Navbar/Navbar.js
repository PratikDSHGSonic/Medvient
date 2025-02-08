// // app/components/layout/Navbar/Navbar.js
// 'use client';
// import Link from 'next/link';
// import NavDropdown from './NavDropdown';
// import { NAV_LINKS, AUTH_LINKS } from '../../../utils/constants/navigation';

// const Navbar = () => {
//   return (
//     <header className="w-full border-b border-gray-200 bg-white">
//       <nav className="max-w-full mx-auto px-6 h-[72px] flex items-center justify-between">
//         {/* Logo with left alignment */}
//         <div className="flex items-center space-x-12">
//           <Link href="/" className="flex items-center">
//             <span className="text-2xl font-bold tracking-tighter">TEMPUS</span>
//           </Link>
          
//           {/* Main Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             {NAV_LINKS.map((link) => (
//               <NavDropdown key={link.path} link={link} />
//             ))}
//           </div>
//         </div>

//         {/* Auth Buttons */}
//         <div className="hidden lg:flex items-center">
//           {AUTH_LINKS.map((link) => (
//             <Link
//               key={link.path}
//               href={link.path}
//               className={`px-4 py-[6px] text-[14px] font-medium rounded
//                 ${
//                   link.variant === 'primary'
//                     ? 'bg-blue-600 text-white hover:bg-blue-700'
//                     : 'border border-gray-300 text-gray-800 hover:bg-gray-50'
//                 }`}
//             >
//               {link.title}
//             </Link>
//           ))}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;





// app/components/layout/Navbar/Navbar.js
'use client';
import Link from 'next/link';
import NavDropdown from './NavDropdown';
import { NAV_LINKS, AUTH_LINKS } from '../../../utils/constants/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`w-full fixed top-0 left-0 right-0 transition-all duration-300 z-50
        ${scrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm' 
          : 'bg-white border-b border-gray-200'
        }`}
    >
      <nav className="max-w-full mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo with left alignment */}
        <div className="flex items-center space-x-12">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tighter">Medvient</span>
          </Link>
          
          {/* Main Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavDropdown key={link.path} link={link} />
            ))}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {AUTH_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-4 py-[6px] text-[14px] font-medium rounded
                ${
                  link.variant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 text-gray-800 hover:bg-gray-50'
                }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;