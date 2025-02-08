// // app/components/layout/Navbar/NavDropdown.js
// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const NavDropdown = ({ link }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div 
//       className="relative group"
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       <div className="relative">
//         <Link
//           href={link.path}
//           className="text-[14px] font-medium text-gray-800 hover:text-gray-900 tracking-wide py-7 inline-block"
//         >
//           {link.title}
//         </Link>
//         {isOpen && (
//           <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>
//         )}
//       </div>

  
//       {link.dropdownItems && isOpen && (
//         <div className="fixed left-0 right-0 top-[72px] bg-white border-t border-b border-gray-200">
//           <div className="max-w-full ml-10 flex">
//              {/* Left Section - Menu Items  */}
//             <div className="w-[75%] py-8">
//               <div className="max-w-full">
//                 {link.dropdownItems.map((item) => (
//                   <Link
//                     key={item.path}
//                     href={item.path}
//                     className="block text-[15px] text-gray-600 hover:text-blue-600 font-normal py-2.5"
//                   >
//                     {item.title}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Right Section - Promo Content */}
//             <div className="w-[25%] bg-gray-50">
//               <div className="flex flex-col p-8">
//                 {link.promoContent && (
//                   <>
//                     <div className="relative w-full aspect-[4/3] mb-4">
//                       <Image
//                         src={link.promoContent.image}
//                         alt="Assay visualization"
//                         fill
//                         style={{ objectFit: 'cover' }}
//                         className="rounded-lg"
//                         priority
//                       />
//                     </div>
//                     <div className="flex flex-col gap-3">
//                       <h3 className="text-[14px] font-bold text-gray-900 tracking-wide">
//                         {link.promoContent.title}
//                       </h3>
//                       <p className="text-[14px] text-gray-600 leading-relaxed font-normal">
//                         {link.promoContent.description}
//                       </p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavDropdown;





'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavDropdown = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const height = menuRef.current.offsetHeight;
      setMenuHeight(height);
    }
  }, [isOpen]);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="relative">
        <Link
          href={link.path}
          className="text-sm font-medium text-gray-800 hover:text-gray-900 tracking-wide py-7 inline-block"
        >
          {link.title}
        </Link>
        {isOpen && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>
        )}
      </div>

      {/* Mega Menu Dropdown */}
      {link.dropdownItems && isOpen && (
        <div className="fixed left-0 right-0 top-[72px] bg-white border-t border-b border-gray-200">
          <div className="max-w-full ml-10 flex">
            {/* Left Section - Menu Items */}
            <div 
              ref={menuRef}
              className="w-[75%] py-8"
            >
              <div className="max-w-full">
                {link.dropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="block text-sm text-gray-600 hover:text-blue-600 font-normal py-2.5"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section - Promo Content */}
            <div 
              className="w-[25%] bg-gray-50"
              style={{ height: menuHeight ? `${menuHeight}px` : 'auto' }}
            >
              <div className="h-full p-8 flex flex-col">
                {link.promoContent && (
                  <>
                    <div className="relative flex-1 mb-4">
                      <Image
                        src={link.promoContent.image}
                        alt="Assay visualization"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                        priority
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-bold text-gray-900 tracking-wide">
                        {link.promoContent.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-normal">
                        {link.promoContent.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;