"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Home, Store, GraduationCap, Heart, Users, ChevronRight, Filter } from "lucide-react"
import type { LocationSelection } from "@/components/location-filter"

interface CategorySelectorProps {
  locationSelection: LocationSelection
  onCategoryChange?: (category: string, subcategory: string, options: any) => void
}

export type ServiceCategory = "Religious" | "Residential" | "Commercial" | "Education" | "Medical" | "Social"

const categoryIcons = {
  Religious: Building2,
  Residential: Home,
  Commercial: Store,
  Education: GraduationCap,
  Medical: Heart,
  Social: Users,
}

const categoryData = {
  Religious: {
    description: "84 गच्छ एवं 4 संप्रदाय के जैन आलय उपाश्रय स्थानक",
    features: [
      "🛕 SEWAS Jain Temple",
      "🏠 SEWAS Jain Upashray",
      "📿 SEWAS Jain Sthanak",
      "🙏 84 Gacch and 4 Sampradaya support",
    ],
    subcategories: {
      "Religious Facility": {
        type: "select",
        options: ["Jain Temple", "Jain Upashray", "Jain Sthanak", "Prayer Hall"],
      },
      "Sect Preference": {
        type: "select",
        options: ["Shwetambar", "Digambar", "Sthanakvasi", "Terapanth"],
      },
    },
  },
  Residential: {
    description: "Complete housing solutions with all facilities included",
    features: [
      "🏠 2 BHK: 540 sq ft Super Built-up Area",
      "🏠 3 BHK: 720 sq ft Super Built-up Area",
      "⚡ 100% Solar System - No Electricity Bills",
      "💰 0% Down Payment, 100% Bank Loan",
      "🎯 60/120/240 Monthly EMI Options",
      "🔒 20-Year Rental Guarantee",
      "🛏️ Fully Furnished with Electronics & Utensils",
      "🛡️ Family Insurance ₹10 Lakh to ₹1 Crore",
      "🚛 6-Month Ration Supply Included",
    ],
    buildingStructure: {
      "Per Floor": "32 Homes",
      "Per Building": "8 Floors = 256 Homes",
      "Per Complex": "4 Buildings = 1,024 Homes",
    },
    marqueeText: "अपने परिवार के सिर्फ कपड़े लेकर ही मोक्षमा सिटी के घर में मंगल प्रवेश कीजिये",
    subcategories: {
      "Property Type": {
        type: "select",
        options: ["2BHK (540 sqft)", "3BHK (720 sqft)"],
      },
      "EMI Options": {
        type: "select",
        options: ["₹60/month", "₹120/month", "₹240/month"],
      },
      Facilities: {
        type: "checkbox",
        options: [
          "Fully Furnished",
          "Electronics Included",
          "Utensils Provided",
          "6-Month Ration",
          "Solar System",
          "Insurance Coverage",
        ],
      },
    },
  },
  Commercial: {
    description: "Business and commercial spaces with Swadeshi focus",
    features: [
      "🛒 SEWAS Jain Mall with Swadeshi Items",
      "💰 50% Discount on Swadeshi Products",
      "🏢 Business Centers & Office Spaces",
      "🚚 Transportation to Local Markets",
    ],
    subcategories: {
      "Commercial Space": {
        type: "select",
        options: ["SEWAS Jain Mall", "Business Center", "Office Space", "Showroom"],
      },
      "Special Offers": {
        type: "checkbox",
        options: ["50% Discount on Swadeshi Items", "Made in India Products", "Local Market Access"],
      },
    },
  },
  Education: {
    description: "Educational institutions and services with international partnerships",
    features: [
      "🎓 180 International University Tie-ups & Branches",
      "📄 Paperless Admission Process",
      "🏠 Hostel Facilities Available",
      "💰 Scholarship Programs",
      "📚 6-Month Ration with Documentation",
    ],
    subcategories: {
      "University Partnerships": {
        type: "select",
        options: ["International University Programs", "Domestic University", "Skill Development Center"],
      },
      "Special Benefits": {
        type: "checkbox",
        options: ["180 International Tie-ups", "Paperless Admission", "Scholarship Available", "Hostel Facility"],
      },
    },
  },
  Medical: {
    description: "Comprehensive healthcare with traditional and modern treatments",
    features: [
      "🏥 SEWAS Jain Hospital",
      "🐄 SEWAS Jain Animal Hospital",
      "💊 Ayurvedic, Homeopathic, Allopathic treatments",
      "🧘 Panchakarma and Yoga facilities",
      "💰 All treatments at minimum rates",
    ],
    subcategories: {
      "Treatment Type": {
        type: "checkbox",
        options: ["Ayurvedic", "Homeopathic", "Allopathic", "Panchakarma", "Yoga"],
      },
      "Facility Type": {
        type: "select",
        options: ["Human Hospital", "Animal Hospital", "Both"],
      },
    },
  },
  Social: {
    description: "Community spaces for social, religious and national events",
    features: [
      "🏛️ SEWAS Jain Social Hall",
      "🎉 Event Management Services",
      "👥 Community Gathering Spaces",
      "🎊 Social, Religious & National Events",
    ],
    subcategories: {
      "Facility Type": {
        type: "select",
        options: ["Social Hall", "Community Center", "Event Space"],
      },
      "Event Types": {
        type: "checkbox",
        options: ["Social Events", "Religious Ceremonies", "National Celebrations", "Community Gatherings"],
      },
    },
  },
}

const FinancialBenefits = () => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
    <h4 className="font-bold text-green-800 mb-4 text-lg">💰 Financial Benefits</h4>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div className="bg-white p-3 rounded border">
        <div className="font-bold text-green-700">0%</div>
        <div className="text-green-600">Down Payment</div>
      </div>
      <div className="bg-white p-3 rounded border">
        <div className="font-bold text-green-700">100%</div>
        <div className="text-green-600">Bank Loan</div>
      </div>
      <div className="bg-white p-3 rounded border">
        <div className="font-bold text-green-700">20 Years</div>
        <div className="text-green-600">Rental Guarantee</div>
      </div>
      <div className="bg-white p-3 rounded border">
        <div className="font-bold text-green-700">70+40</div>
        <div className="text-green-600">Banks & Finance</div>
      </div>
    </div>
  </div>
)

const BankingPartners = () => (
  <Card className="bg-blue-50 border-blue-200 mb-6">
    <CardHeader>
      <CardTitle className="text-blue-800">🏦 Banking Partners</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center space-y-3">
        <div className="text-3xl font-bold text-blue-700">70 Banks + 40 Finance Companies</div>
        <p className="text-blue-600">Private, National, International partnerships</p>
        <p className="text-sm text-blue-500">All providing loans to Jain community members</p>
      </div>
    </CardContent>
  </Card>
)

const TimelineSection = () => (
  <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 mb-6">
    <CardContent className="p-6 text-center">
      <h3 className="text-2xl font-bold text-orange-700 mb-4">⏰ Project Timeline</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-xl font-bold text-orange-600">Dec 31, 2025</div>
          <div className="text-sm text-orange-700">Online Booking Deadline</div>
        </div>
        <div>
          <div className="text-xl font-bold text-red-600">24-30 Months</div>
          <div className="text-sm text-red-700">Completion per City</div>
        </div>
        <div>
          <div className="text-xl font-bold text-orange-600">Dec 31, 2030</div>
          <div className="text-sm text-orange-700">Full Project Completion</div>
        </div>
      </div>
      <p className="text-sm text-orange-600 mt-4">
        Complete life facilities from birth to death • Book directly where you want to live
      </p>
    </CardContent>
  </Card>
)

export function CategorySelector({ locationSelection, onCategoryChange }: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null)
  const [categorySelections, setCategorySelections] = useState<Record<string, any>>({})

  const handleCategorySelect = (category: ServiceCategory) => {
    setSelectedCategory(category)
    // Reset selections when switching categories
    setCategorySelections({})
  }

  const handleSubcategoryChange = (subcategory: string, value: any) => {
    const newSelections = {
      ...categorySelections,
      [subcategory]: value,
    }
    setCategorySelections(newSelections)

    if (onCategoryChange && selectedCategory) {
      onCategoryChange(selectedCategory, subcategory, newSelections)
    }
  }

  const handleCheckboxChange = (subcategory: string, option: string, checked: boolean) => {
    const currentValues = categorySelections[subcategory] || []
    const newValues = checked ? [...currentValues, option] : currentValues.filter((v: string) => v !== option)

    handleSubcategoryChange(subcategory, newValues)
  }

  const isLocationSelected = locationSelection.state && locationSelection.city

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-serif font-bold">Service Categories</h3>
        <p className="text-muted-foreground">
          {isLocationSelected
            ? `Select a category to explore services in ${locationSelection.city}, ${locationSelection.state}`
            : "Please select your location first to view available services"}
        </p>
      </div>

      {/* Financial Benefits section */}
      {isLocationSelected && <FinancialBenefits />}

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {(Object.keys(categoryData) as ServiceCategory[]).map((category) => {
          const Icon = categoryIcons[category]
          const isSelected = selectedCategory === category
          const isDisabled = !isLocationSelected

          return (
            <Card
              key={category}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md hover:scale-105"
              } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !isDisabled && handleCategorySelect(category)}
            >
              <CardContent className="p-4 text-center space-y-3">
                <div
                  className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">{category}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{categoryData[category].description}</p>
                </div>
                {isSelected && (
                  <Badge variant="default" className="text-xs">
                    Selected
                  </Badge>
                )}
                {!isDisabled && !isSelected && <ChevronRight className="h-4 w-4 mx-auto text-muted-foreground" />}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Marquee text for Residential category */}
      {selectedCategory === "Residential" && (
        <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-6 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-text text-orange-800 font-bold text-lg">
              🏠 अपने परिवार के सिर्फ कपड़े लेकर ही मोक्षमा सिटी के घर में मंगल प्रवेश कीजिये 🏠
            </div>
          </div>
        </div>
      )}

      {/* Category Details */}
      {selectedCategory && isLocationSelected && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const Icon = categoryIcons[selectedCategory]
                return <Icon className="h-5 w-5" />
              })()}
              {selectedCategory} Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features display for selected category */}
            {categoryData[selectedCategory].features && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <h6 className="font-medium text-sm mb-3">Key Features:</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {categoryData[selectedCategory].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Object.entries(categoryData[selectedCategory].subcategories).map(([subcategory, config]) => (
              <div key={subcategory} className="space-y-3">
                <h5 className="font-medium text-sm">{subcategory}</h5>

                {config.type === "select" && (
                  <Select
                    value={categorySelections[subcategory] || ""}
                    onValueChange={(value) => handleSubcategoryChange(subcategory, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Choose ${subcategory}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {config.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {config.type === "checkbox" && (
                  <div className="grid grid-cols-2 gap-3">
                    {config.options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${subcategory}-${option}`}
                          checked={(categorySelections[subcategory] || []).includes(option)}
                          onCheckedChange={(checked) => handleCheckboxChange(subcategory, option, checked as boolean)}
                        />
                        <label
                          htmlFor={`${subcategory}-${option}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Selection Summary */}
            {Object.keys(categorySelections).length > 0 && (
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h6 className="font-medium text-sm flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Your {selectedCategory} Selection
                </h6>
                {Object.entries(categorySelections).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="font-medium">{key}:</span>{" "}
                    {Array.isArray(value)
                      ? value.length > 0
                        ? value.join(", ")
                        : "None selected"
                      : value || "Not selected"}
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1">Find {selectedCategory} Services</Button>
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                Back to Categories
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Banking Partners and Timeline sections */}
      {isLocationSelected && (
        <>
          <BankingPartners />
          <TimelineSection />
        </>
      )}

      {/* Help Text */}
      {!isLocationSelected && (
        <Card className="bg-muted/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Select your state and city above to explore available services in your area. Our services are tailored
              specifically for Jain communities across India.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
