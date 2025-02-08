// app/page.js

import SearchComponent from './components/search/SearchComponent'
import AIPowerSection from './components/AICapsLanding/AIPowerSection'
import TechnologySection from './components/landing/TechnologySection'
import PressReleases from './components/PressReleases'
import VideoHero from './components/VideoHero'
import ExploreSection from './components/ExploreSection'
import OurScience from './components/OurScience'
import StatsSection from './components/StatsSection'

export default function Home() {
  return (
    <main>
      <SearchComponent />
      <AIPowerSection />
      <TechnologySection />
      <VideoHero />
      <ExploreSection />
      <OurScience />
      <StatsSection />
      <PressReleases />
    </main>
  )
}

export const metadata = {
  title: 'Medvient',
  description: 'Medvient',
}