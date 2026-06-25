import { Hero } from '@/widgets/hero/ui/Hero'
import { About } from '@/widgets/about/ui/About'
import { Audience } from '@/widgets/audience/ui/Audience'
import { Curriculum } from '@/widgets/curriculum/ui/Curriculum'
import { Projects } from '@/widgets/projects/ui/Projects'
import { HowItWorks } from '@/widgets/how-it-works/ui/HowItWorks'
import { Reviews } from '@/widgets/reviews/ui/Reviews'
import { Pricing } from '@/widgets/pricing/ui/Pricing'
import { Faq } from '@/widgets/faq/ui/Faq'
import { Contact } from '@/widgets/contact/ui/Contact'

export const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <Audience />
      <Curriculum />
      <Projects />
      <HowItWorks />
      <Reviews />
      <Pricing />
      <Faq />
      <Contact />
    </main>
  )
}
