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
import { FileText } from "lucide-react"

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

// Hero Section Component with Video Animation
function HeroSection() {
  const [animationPhase, setAnimationPhase] = useState(0) // 0: video, 1: logo animation, 2: content
  const [showContent, setShowContent] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
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
    <section className="relative h-screen bg-gradient-to-b from-background to-muted overflow-hidden">
      {/* Video Animation */}
      {animationPhase === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
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
        </div>
      )}

      {/* Logo Animation */}
      {animationPhase >= 1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
          <div
            ref={logoRef}
            className={`transform transition-all duration-2000 ease-out ${
              animationPhase >= 1 ? "translate-z-0 scale-100 opacity-100" : "translate-z-[-100px] scale-50 opacity-0"
            }`}
            style={{
              transform: animationPhase >= 1 ? "translateZ(0) scale(1)" : "translateZ(-100px) scale(0.5)",
              animation: animationPhase >= 1 ? "logoEmerge 2s ease-out forwards" : "none",
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pYTRYhbQSLFBFjd47Ala9PcKvvLDEs.png"
              alt="Mokshamaa Infrastructure Limited"
              className={`${isMobile ? "h-32 w-auto" : "h-48 w-auto"} drop-shadow-2xl`}
            />
          </div>
        </div>
      )}

      {/* Content Overlay */}
      {showContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-20 bg-gradient-to-t from-background/90 to-transparent">
          <div className="text-center space-y-4 md:space-y-6 animate-fade-in-up px-4">
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-foreground text-balance">
                MOKSHAMAA CITY 800
              </h1>
              <p className="text-xl md:text-2xl text-orange-600 font-semibold text-pretty">THE JAINISM OF UNIVERSE</p>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty font-medium">सूर्य-पृथ्वी-हवा-पानी-आकाश</p>
              <p className="text-sm md:text-base text-muted-foreground text-pretty">Sun-Earth-Water-Air-Sky</p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                <p className="text-orange-800 font-semibold text-sm md:text-base">
                  800 Cities • 29 States • 7 Union Territories
                </p>
                <p className="text-orange-700 text-xs md:text-sm mt-1">
                  Project by: MOKSHAMAA INFRASTRUCTURE PRIVATE LIMITED
                </p>
                <p className="text-orange-600 text-xs md:text-sm">CMD: MR. ASHWIN R. SHAH</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-2 md:gap-4 mt-6 md:mt-8 max-w-sm md:max-w-none mx-auto">
              {["Home", "Vision", "Mission", "About Us"].map((tab) => (
                <Button
                  key={tab}
                  variant={tab === "Home" ? "default" : "outline"}
                  size={isMobile ? "default" : "lg"}
                  className="min-w-20 md:min-w-24 text-sm md:text-base"
                  onClick={() => {
                    const element = document.getElementById(tab.toLowerCase().replace(" ", "-"))
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Company Logo in Corner (only show after animation) */}
      {showContent && (
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pYTRYhbQSLFBFjd47Ala9PcKvvLDEs.png"
            alt="Mokshamaa Infrastructure Limited"
            className="h-12 md:h-16 w-auto"
            loading="eager"
          />
        </div>
      )}

      <style jsx>{`
        @keyframes logoEmerge {
          0% {
            transform: translateZ(-100px) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: translateZ(-50px) scale(0.75);
            opacity: 0.7;
          }
          100% {
            transform: translateZ(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
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
      <HeroSection />

      <section id="home" className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          <div className="text-center space-y-3 md:space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-balance">Home - Service Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base text-pretty leading-relaxed">
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

      <VisionSection />
      <MissionSection />
      <AboutUsSection />
    </main>
  )
}
