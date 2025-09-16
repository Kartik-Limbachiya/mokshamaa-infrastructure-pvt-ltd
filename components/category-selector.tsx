"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Home,
  Store,
  GraduationCap,
  Heart,
  Users,
  Filter,
  Shield,
  TrendingUp,
  Award,
  Building,
  Sparkles,
  Zap,
  DollarSign,
  Cross,
  ShoppingBag,
  Truck,
} from "lucide-react"
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
      { icon: Building2, text: "SEWAS Jain Temple" },
      { icon: Home, text: "SEWAS Jain Upashray" },
      { icon: Building2, text: "SEWAS Jain Sthanak" },
      { icon: Users, text: "84 Gacch and 4 Sampradaya support" },
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
      { icon: Home, text: "2 BHK: 540 sq ft Super Built-up Area" },
      { icon: Home, text: "3 BHK: 720 sq ft Super Built-up Area" },
      { icon: Zap, text: "100% Solar System - No Electricity Bills" },
      { icon: DollarSign, text: "0% Down Payment, 100% Bank Loan" },
      { icon: TrendingUp, text: "60/120/240 Monthly EMI Options" },
      { icon: Shield, text: "20-Year Rental Guarantee" },
      { icon: Home, text: "Fully Furnished with Electronics & Utensils" },
      { icon: Shield, text: "Family Insurance ₹10 Lakh to ₹1 Crore" },
      { icon: ShoppingBag, text: "6-Month Ration Supply Included" },
    ],
    buildingStructure: {
      "Per Floor": "32 Homes",
      "Per Building": "8 Floors = 256 Homes",
      "Per Complex": "4 Buildings = 1,024 Homes",
    },
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
      { icon: ShoppingBag, text: "SEWAS Jain Mall with Swadeshi Items" },
      { icon: DollarSign, text: "50% Discount on Swadeshi Products" },
      { icon: Building, text: "Business Centers & Office Spaces" },
      { icon: Truck, text: "Transportation to Local Markets" },
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
      { icon: GraduationCap, text: "180 International University Tie-ups & Branches" },
      { icon: Award, text: "Paperless Admission Process" },
      { icon: Home, text: "Hostel Facilities Available" },
      { icon: DollarSign, text: "Scholarship Programs" },
      { icon: ShoppingBag, text: "6-Month Ration with Documentation" },
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
      { icon: Cross, text: "SEWAS Jain Hospital" },
      { icon: Heart, text: "SEWAS Jain Animal Hospital" },
      { icon: Cross, text: "Ayurvedic, Homeopathic, Allopathic treatments" },
      { icon: Heart, text: "Panchakarma and Yoga facilities" },
      { icon: DollarSign, text: "All treatments at minimum rates" },
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
      { icon: Building, text: "SEWAS Jain Social Hall" },
      { icon: Award, text: "Event Management Services" },
      { icon: Users, text: "Community Gathering Spaces" },
      { icon: Sparkles, text: "Social, Religious & National Events" },
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
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 mb-8">
    <h3 className="text-2xl font-bold text-green-800 mb-6 text-center flex items-center justify-center gap-2">
      <TrendingUp className="h-6 w-6" />
      Financial Benefits
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Shield, title: "0% Down Payment", color: "text-green-600" },
        { icon: TrendingUp, title: "100% Bank Loan", color: "text-blue-600" },
        { icon: Award, title: "20 Year Guarantee", color: "text-orange-600" },
        { icon: Building, title: "70+40 Banks", color: "text-purple-600" },
      ].map((benefit, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <benefit.icon className={`h-8 w-8 ${benefit.color} mb-2`} />
          <div className="font-bold text-gray-800">{benefit.title}</div>
        </div>
      ))}
    </div>
  </div>
)

const BankingPartners = () => (
  <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200 mb-8 shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/30"></div>
    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-indigo-300/20 rounded-full blur-3xl"></div>

    <CardHeader className="relative z-10">
      <CardTitle className="text-center text-2xl bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
        <Building className="w-6 h-6 text-blue-600" />
        Banking Partners
      </CardTitle>
    </CardHeader>
    <CardContent className="relative z-10">
      <div className="text-center space-y-4">
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          70 Banks + 40 Finance Companies
        </div>
        <p className="text-lg text-blue-700 font-medium">Private, National, International partnerships</p>
        <p className="text-blue-600 bg-white/60 backdrop-blur-sm rounded-lg p-3 inline-block">
          All providing loans to Jain community members
        </p>
      </div>
    </CardContent>
  </Card>
)

const TimelineSection = () => (
  <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 border-orange-200 mb-8 shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-red-100/30"></div>
    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-200/40 to-amber-300/30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-red-200/40 to-orange-300/30 rounded-full blur-2xl"></div>

    <CardContent className="relative z-10 p-8 text-center">
      <div className="mb-6">
        <Badge className="bg-orange-100 text-orange-800 border-orange-300 mb-3">
          <Sparkles className="w-3 h-3 mr-1" />
          Project Timeline
        </Badge>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent">
          Development Schedule
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="text-2xl font-bold text-orange-600 mb-2">Dec 31, 2025</div>
          <div className="text-orange-700 font-medium">Online Booking Deadline</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="text-2xl font-bold text-red-600 mb-2">24-30 Months</div>
          <div className="text-red-700 font-medium">Completion per City</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="text-2xl font-bold text-orange-600 mb-2">Dec 31, 2030</div>
          <div className="text-orange-700 font-medium">Full Project Completion</div>
        </div>
      </div>

      <p className="text-orange-700 mt-6 bg-white/60 backdrop-blur-sm rounded-lg p-4 font-medium">
        Complete life facilities from birth to death • Book directly where you want to live
      </p>
    </CardContent>
  </Card>
)

export function CategorySelector({ locationSelection, onCategoryChange }: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null)
  const [categorySelections, setCategorySelections] = useState<Record<string, any>>({})
  const [hoveredCard, setHoveredCard] = useState<ServiceCategory | null>(null)

  const handleCategorySelect = (category: ServiceCategory) => {
    setSelectedCategory(category)
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

  const categoryImages = {
    Religious: "https://www.easemytrip.com/travel/img/khajuraho.jpg",
    Residential: "https://i.ibb.co/gb7qfYFL/Screenshot-2025-09-16-121548.png",
    Commercial: "https://kmhp.in/wp-content/uploads/2020/05/Commercial-Building.jpg",
    Education: "https://images.shiksha.com/mediadata/images/1539689597phpsD5n8S_g.jpg",
    Medical:
      "https://media.istockphoto.com/id/181553727/photo/outpatient-surgery-center.jpg?s=612x612&w=0&k=20&c=TSOFoFo6VWkBLtmvTgcsngxYmn3I677ilQxhoAbzfnE=",
    Social: "https://sewas800.city/image/services/social.png",
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-amber-200/30 to-orange-300/20 rounded-full blur-2xl"></div>

        <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-300 relative z-10">
          <Sparkles className="w-3 h-3 mr-1" />
          Premium Services
        </Badge>

        <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative z-10">
          Choose Your Service
        </h3>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto relative z-10">
          {isLocationSelected
            ? `Select a category to explore premium services in ${locationSelection.city}, ${locationSelection.state}`
            : "Please select your location first to view available services"}
        </p>
      </div>

      {isLocationSelected && <FinancialBenefits />}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {(Object.keys(categoryData) as ServiceCategory[]).map((category, index) => {
          const Icon = categoryIcons[category]
          const isSelected = selectedCategory === category
          const isDisabled = !isLocationSelected
          const isHovered = hoveredCard === category

          const gradients = {
            Religious: "from-orange-500 to-amber-600",
            Residential: "from-blue-500 to-indigo-600",
            Commercial: "from-green-500 to-emerald-600",
            Education: "from-purple-500 to-violet-600",
            Medical: "from-red-500 to-pink-600",
            Social: "from-teal-500 to-cyan-600",
          }

          return (
            <div
              key={category}
              className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white cursor-pointer ${
                isSelected ? "ring-2 ring-amber-400 shadow-2xl scale-105" : ""
              } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${
                isHovered ? "scale-105 shadow-2xl" : "hover:scale-102"
              }`}
              onClick={() => !isDisabled && handleCategorySelect(category)}
              onMouseEnter={() => setHoveredCard(category)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={categoryImages[category] || "/placeholder.svg"}
                  alt={category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Category Icon in top-right */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category}</h3>
                <p className="text-gray-600 text-sm mb-4">{categoryData[category].description}</p>

                {/* Features with Icons */}
                <div className="grid grid-cols-2 gap-2">
                  {categoryData[category].features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-xs">
                      <feature.icon className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="truncate">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {isSelected && (
                  <Badge className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Selected
                  </Badge>
                )}
              </div>
            </div>
          )
        })}
      </div>

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
                      <feature.icon className="h-4 w-4 text-gray-500" />
                      <span>{feature.text}</span>
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
