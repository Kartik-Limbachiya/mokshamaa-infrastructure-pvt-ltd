"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LocationFilter, type LocationSelection } from "@/components/location-filter"
import { CategorySelector } from "@/components/category-selector"
import { VisionSection, MissionSection, AboutUsSection } from "@/components/vision-mission-sections"
import { InquiryForm } from "@/components/inquiry-form"
import { WarningSection } from "@/components/warning-section"
import { EmploymentSection } from "@/components/employment-section"
import { FileText, Users, Building, Heart, TrendingUp } from "lucide-react"

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      )
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

function PremiumHeroSection() {
  const [animationPhase, setAnimationPhase] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const handleVideoEnd = () => {
    setAnimationPhase(1)
    setTimeout(() => {
      setAnimationPhase(2)
      setShowContent(true)
    }, 2000)
  }

  return (
    <section className="relative h-screen overflow-hidden hero-gradient">
      {/* Cinematic Video Background */}
      {animationPhase === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-80"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1456412730-640_adpp_is.mp4_1757221870114-npAZC9W8xoCAoGJnnzoHvJorXhWvUE.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* 3D Logo Animation */}
      {animationPhase >= 1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-background">
          <div
            className={`transform transition-all duration-2000 ease-out floating ${
              animationPhase >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <div className="relative">
              <img
                src="/sewas-logo.png"
                alt="800 SEWAS City - THE JAINISM OF UNIVERSE"
                className={`${isMobile ? "h-40 w-auto" : "h-56 w-auto"} drop-shadow-2xl`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl -z-10" />
            </div>
          </div>
        </div>
      )}

      {/* Premium Content Overlay with Glassmorphism */}
      {showContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background/95 via-background/50 to-transparent">
          <div className="text-center space-y-6 animate-fade-in-up px-4 max-w-4xl">
            {/* Glassmorphism Card */}
            <div className="glass-card rounded-2xl p-8 space-y-6">
              <div className="space-y-4">
                <h1 className="font-black text-5xl sm:text-6xl md:text-8xl gradient-text text-balance">
                  800 SEWAS City
                </h1>
                <p className="text-2xl md:text-3xl font-bold text-primary">THE JAINISM OF UNIVERSE</p>
                <p className="text-xl md:text-2xl text-secondary font-semibold">सूर्य-पृथ्वी-हवा-पानी-आकाश</p>
                <p className="text-lg md:text-xl text-muted-foreground">Sun-Earth-Water-Air-Sky</p>
              </div>

              {/* Premium Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="glass-card rounded-xl p-4 premium-hover">
                  <div className="text-3xl font-bold text-primary">800</div>
                  <div className="text-sm text-muted-foreground">Cities</div>
                </div>
                <div className="glass-card rounded-xl p-4 premium-hover">
                  <div className="text-3xl font-bold text-secondary">29</div>
                  <div className="text-sm text-muted-foreground">States</div>
                </div>
                <div className="glass-card rounded-xl p-4 premium-hover">
                  <div className="text-3xl font-bold text-accent">7</div>
                  <div className="text-sm text-muted-foreground">Union Territories</div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-4 mt-4">
                <p className="text-primary font-semibold text-sm md:text-base">
                  Project by: 800 SEWAS INFRASTRUCTURE PRIVATE LIMITED
                </p>
                <p className="text-secondary text-xs md:text-sm mt-1">CMD: MR. ASHWIN R. SHAH</p>
              </div>
            </div>

            {/* Interactive Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { name: "Home", icon: Building, target: "home" },
                { name: "Vision", icon: TrendingUp, target: "vision" },
                { name: "Mission", icon: Heart, target: "mission" },
                { name: "About Us", icon: Users, target: "about-us" },
              ].map(({ name, icon: Icon, target }) => (
                <Button
                  key={name}
                  size="lg"
                  className="
                    relative overflow-hidden transition-all duration-300 ease-out
                    bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg 
                    hover:from-amber-600 hover:to-orange-700 hover:shadow-xl
                    transform hover:scale-105 hover:-translate-y-1
                  "
                  onClick={() => {
                    const element = document.getElementById(target)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Elements */}
      {showContent && (
        <>
          <div className="absolute top-20 left-10 floating opacity-20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </div>
          <div className="absolute bottom-20 right-10 floating opacity-20" style={{ animationDelay: "1s" }}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-primary" />
          </div>
        </>
      )}

      {/* Company Logo in Corner */}
      {showContent && (
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <img src="/sewas-logo.png" alt="800 SEWAS City" className="h-12 md:h-16 w-auto premium-shadow rounded-lg" />
        </div>
      )}
    </section>
  )
}

function StatisticsSection() {
  const [counters, setCounters] = useState({ years: 0, families: 0, universities: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          // Animate counters
          const duration = 2000
          const steps = 60
          const stepDuration = duration / steps

          let step = 0
          const timer = setInterval(() => {
            step++
            const progress = step / steps
            setCounters({
              years: Math.floor(6 * progress),
              families: Math.floor(10000 * progress),
              universities: Math.floor(180 * progress),
            })

            if (step >= steps) clearInterval(timer)
          }, stepDuration)
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">Our Achievements</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building communities and creating opportunities across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl p-8 text-center premium-hover counter-animation">
            <div className="text-6xl font-black text-primary mb-4">{counters.years}+</div>
            <div className="text-xl font-semibold text-foreground mb-2">Years</div>
            <div className="text-muted-foreground">of Excellence</div>
          </div>

          <div className="glass-card rounded-2xl p-8 text-center premium-hover counter-animation">
            <div className="text-6xl font-black text-secondary mb-4">{counters.families.toLocaleString()}+</div>
            <div className="text-xl font-semibold text-foreground mb-2">Families</div>
            <div className="text-muted-foreground">Served</div>
          </div>

          <div className="glass-card rounded-2xl p-8 text-center premium-hover counter-animation">
            <div className="text-6xl font-black text-accent mb-4">{counters.universities}+</div>
            <div className="text-xl font-semibold text-foreground mb-2">Universities</div>
            <div className="text-muted-foreground">Partnerships</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Page Component
export default function HomePage() {
  const [locationSelection, setLocationSelection] = useState<LocationSelection>({
    state: "",
    city: "",
    areas: [],
  })
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const isMobile = useIsMobile()

  // Load selection from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const state = params.get("state") || ""
    const city = params.get("city") || ""

    setLocationSelection({ state, city, areas: [] })
  }, [])

  const handleCategoryChange = (category: string, subcategory: string, options: any) => {
    console.log("Category selection:", { category, subcategory, options })
    setSelectedCategory(category)
  }

  const handleInquirySubmit = (formData: any) => {
    console.log("Inquiry submitted:", formData)
    // In a real app, this would send data to the backend
    setShowInquiryForm(false)
  }

  return (
    <main className="min-h-screen">
      <PremiumHeroSection />

      <StatisticsSection />

      <section id="home" className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black gradient-text">Service Categories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Select your location from 800 cities across 29 states and 7 union territories. Explore our comprehensive
              services across Religious, Residential, Commercial, Education, Medical, and Social categories.
            </p>
          </div>

          {/* Location Filter */}
          <LocationFilter onSelectionChange={setLocationSelection} />

          <WarningSection />

          {/* Category Selector */}
          <CategorySelector locationSelection={locationSelection} onCategoryChange={handleCategoryChange} />

          <EmploymentSection />

          {/* Inquiry Form Toggle */}
          {locationSelection.state && locationSelection.city && (
            <div className="text-center">
              <Button
                size={isMobile ? "default" : "lg"}
                onClick={() => setShowInquiryForm(!showInquiryForm)}
                className="flex items-center gap-2 w-full md:w-auto"
              >
                <FileText className="h-4 md:h-5 w-4 md:w-5" />
                {showInquiryForm ? "Hide Inquiry Form" : "Submit Service Inquiry"}
              </Button>
            </div>
          )}

          {/* Inquiry Form */}
          {showInquiryForm && (
            <InquiryForm
              locationSelection={locationSelection}
              selectedCategory={selectedCategory as any}
              onSubmit={handleInquirySubmit}
            />
          )}

          {/* Selection Summary */}
          {locationSelection.state && (
            <Card className="bg-muted/50">
              <CardContent className="p-4 md:p-6">
                <h4 className="font-semibold mb-3 text-sm md:text-base">Your Location Selection</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-sm">
                  <div className="flex flex-col md:block">
                    <span className="font-medium">State:</span>
                    <span className="md:ml-1">{locationSelection.state}</span>
                  </div>
                  <div className="flex flex-col md:block">
                    <span className="font-medium">City:</span>
                    <span className="md:ml-1">{locationSelection.city || "Not selected"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section id="vision">
        <VisionSection />
      </section>

      <section id="mission">
        <MissionSection />
      </section>

      <section id="about-us">
        <AboutUsSection />
      </section>
    </main>
  )
}
