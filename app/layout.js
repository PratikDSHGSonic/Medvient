


// import { IBM_Plex_Sans } from 'next/font/google'
// import './globals.css'
// import Navbar from './components/layout/Navbar/Navbar'
// import SearchComponent from './components/search/SearchComponent'
// import AIPowerSection from './components/AICapsLanding/AIPowerSection'
// import TechnologySection from './components/landing/TechnologySection'
// import PressReleases from './components/PressReleases'
// import VideoHero from './components/VideoHero'
// import ExploreSection from './components/ExploreSection'
// import OurScience from './components/OurScience'
// import StatsSection from './components/StatsSection'
// import Footer from './components/Footer'


// const ibmPlexSans = IBM_Plex_Sans({
//   weight: ['400', '500', '600'],
//   subsets: ['latin'],
//   display: 'swap',
// })

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={ibmPlexSans.className}>
//       <body>
//         <div className="pt-[72px]"> {/* Add padding-top equal to navbar height */}
//           {/* Your content */}
//           <Navbar />
//         </div>

//         <SearchComponent />
//         < AIPowerSection />
//         <TechnologySection />
//         <VideoHero/>
//         <ExploreSection/>
//         <OurScience/>
//         <StatsSection/>
//         <PressReleases/>
//         <Footer/>

//         {/* {children} */}
//       </body>
//     </html>
//   )
// }




// app/layout.js

import { IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/Footer'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ibmPlexSans.className}>
      <body>
        <div className="pt-[72px]">
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  )
}