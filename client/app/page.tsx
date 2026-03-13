import HeroSection from '@/components/HeroSection'
import EventCategories from '@/components/EventCategories'
import FeaturedPlanners from '@/components/FeaturedPlanners'
import PortfolioShowcase from '@/components/PortfolioShowcase'
import EventShop from '@/components/EventShop'
import SectionWrapper from '@/components/SectionWrapper'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SectionWrapper>
        <EventCategories />
      </SectionWrapper>
      <SectionWrapper>
        <FeaturedPlanners />
      </SectionWrapper>
      <SectionWrapper>
        <PortfolioShowcase />
      </SectionWrapper>
      <SectionWrapper>
        <EventShop />
      </SectionWrapper>
    </main>
  )
}