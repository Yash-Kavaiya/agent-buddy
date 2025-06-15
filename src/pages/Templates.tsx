
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, Eye, DollarSign } from "lucide-react";

const Templates = () => {
  const templates = [
    {
      name: "Customer Support Bot",
      description: "Complete customer service automation with ticket routing, FAQ handling, and escalation management.",
      category: "Support",
      intents: 25,
      entities: 15,
      price: 2999,
      rating: 4.8,
      downloads: 1240,
      features: ["Multi-language support", "Ticket routing", "FAQ automation", "Escalation handling", "Knowledge base integration", "Analytics dashboard"]
    },
    {
      name: "E-commerce Assistant",
      description: "Comprehensive shopping bot with product search, order tracking, payment processing, and customer recommendations.",
      category: "E-commerce",
      intents: 35,
      entities: 20,
      price: 4999,
      rating: 4.9,
      downloads: 2150,
      features: ["Product catalog integration", "Order management", "Payment processing", "Inventory tracking", "Recommendation engine", "Cart abandonment recovery"]
    },
    {
      name: "Healthcare Appointment Bot",
      description: "Medical appointment scheduling with doctor availability, patient records, and insurance verification.",
      category: "Healthcare",
      intents: 28,
      entities: 18,
      price: 12999,
      rating: 4.7,
      downloads: 890,
      features: ["Appointment scheduling", "Doctor availability", "Patient records", "Insurance verification", "Reminder notifications", "HIPAA compliance"]
    },
    {
      name: "Banking & Finance Assistant",
      description: "Secure financial services bot with account management, transaction history, and fraud detection.",
      category: "Finance",
      intents: 40,
      entities: 25,
      price: 25999,
      rating: 4.8,
      downloads: 756,
      features: ["Account management", "Transaction tracking", "Fraud detection", "Investment advice", "Loan processing", "Security authentication"]
    },
    {
      name: "Restaurant Ordering System",
      description: "Complete food ordering platform with menu management, delivery tracking, and payment integration.",
      category: "Food & Beverage",
      intents: 30,
      entities: 22,
      price: 3999,
      rating: 4.6,
      downloads: 1580,
      features: ["Menu management", "Order tracking", "Delivery integration", "Payment processing", "Loyalty program", "Nutritional information"]
    },
    {
      name: "Real Estate Assistant",
      description: "Property search and management bot with virtual tours, mortgage calculations, and agent connections.",
      category: "Real Estate",
      intents: 32,
      entities: 19,
      price: 8999,
      rating: 4.5,
      downloads: 432,
      features: ["Property search", "Virtual tours", "Mortgage calculator", "Agent matching", "Market analysis", "Document management"]
    },
    {
      name: "HR Recruitment Bot",
      description: "Automated hiring assistant with candidate screening, interview scheduling, and application tracking.",
      category: "Human Resources",
      intents: 26,
      entities: 16,
      price: 6999,
      rating: 4.7,
      downloads: 678,
      features: ["Candidate screening", "Interview scheduling", "Application tracking", "Resume parsing", "Skills assessment", "Onboarding automation"]
    },
    {
      name: "Travel & Tourism Guide",
      description: "Comprehensive travel assistant with booking management, itinerary planning, and local recommendations.",
      category: "Travel",
      intents: 38,
      entities: 24,
      price: 5999,
      rating: 4.8,
      downloads: 1120,
      features: ["Booking management", "Itinerary planning", "Local recommendations", "Weather updates", "Currency conversion", "Emergency assistance"]
    },
    {
      name: "Educational Learning Bot",
      description: "Interactive learning platform with course management, progress tracking, and personalized tutoring.",
      category: "Education",
      intents: 33,
      entities: 21,
      price: 7999,
      rating: 4.9,
      downloads: 1890,
      features: ["Course management", "Progress tracking", "Personalized tutoring", "Assessment tools", "Resource library", "Parent notifications"]
    },
    {
      name: "Insurance Claims Assistant",
      description: "Streamlined claims processing with document collection, damage assessment, and settlement tracking.",
      category: "Insurance",
      intents: 29,
      entities: 17,
      price: 15999,
      rating: 4.6,
      downloads: 543,
      features: ["Claims processing", "Document collection", "Damage assessment", "Settlement tracking", "Policy information", "Fraud detection"]
    },
    {
      name: "Automotive Service Bot",
      description: "Complete car service management with maintenance scheduling, parts ordering, and warranty tracking.",
      category: "Automotive",
      intents: 27,
      entities: 18,
      price: 4999,
      rating: 4.7,
      downloads: 687,
      features: ["Service scheduling", "Parts ordering", "Warranty tracking", "Vehicle history", "Maintenance reminders", "Cost estimation"]
    },
    {
      name: "Legal Consultation Assistant",
      description: "Legal guidance bot with case management, document preparation, and attorney matching services.",
      category: "Legal",
      intents: 31,
      entities: 20,
      price: 35999,
      rating: 4.5,
      downloads: 298,
      features: ["Case management", "Document preparation", "Attorney matching", "Legal research", "Billing tracking", "Confidentiality protection"]
    },
    {
      name: "Fitness & Wellness Coach",
      description: "Personal training bot with workout planning, nutrition tracking, and health monitoring.",
      category: "Health & Fitness",
      intents: 24,
      entities: 15,
      price: 2499,
      rating: 4.8,
      downloads: 1450,
      features: ["Workout planning", "Nutrition tracking", "Health monitoring", "Goal setting", "Progress analytics", "Motivation system"]
    },
    {
      name: "Property Management Bot",
      description: "Comprehensive property management with tenant communication, maintenance requests, and rent collection.",
      category: "Property Management",
      intents: 34,
      entities: 23,
      price: 9999,
      rating: 4.6,
      downloads: 521,
      features: ["Tenant communication", "Maintenance requests", "Rent collection", "Lease management", "Inspection scheduling", "Financial reporting"]
    },
    {
      name: "Event Planning Assistant",
      description: "Complete event management with vendor coordination, guest management, and timeline tracking.",
      category: "Events",
      intents: 28,
      entities: 19,
      price: 3999,
      rating: 4.7,
      downloads: 834,
      features: ["Vendor coordination", "Guest management", "Timeline tracking", "Budget management", "RSVP handling", "Venue booking"]
    },
    {
      name: "Logistics & Shipping Bot",
      description: "Supply chain management with shipment tracking, inventory control, and delivery optimization.",
      category: "Logistics",
      intents: 36,
      entities: 26,
      price: 18999,
      rating: 4.5,
      downloads: 445,
      features: ["Shipment tracking", "Inventory control", "Delivery optimization", "Route planning", "Carrier management", "Cost analysis"]
    },
    {
      name: "Retail Store Assistant",
      description: "In-store customer service with product information, stock checking, and sales assistance.",
      category: "Retail",
      intents: 22,
      entities: 14,
      price: 1999,
      rating: 4.6,
      downloads: 1320,
      features: ["Product information", "Stock checking", "Sales assistance", "Price comparison", "Loyalty program", "Store locator"]
    },
    {
      name: "Telecommunications Support",
      description: "Telecom customer service with plan management, billing inquiries, and technical troubleshooting.",
      category: "Telecommunications",
      intents: 37,
      entities: 24,
      price: 14999,
      rating: 4.4,
      downloads: 612,
      features: ["Plan management", "Billing inquiries", "Technical support", "Service activation", "Network diagnostics", "Usage monitoring"]
    },
    {
      name: "Manufacturing Quality Bot",
      description: "Quality control assistant with defect reporting, compliance checking, and production monitoring.",
      category: "Manufacturing",
      intents: 30,
      entities: 21,
      price: 22999,
      rating: 4.7,
      downloads: 387,
      features: ["Defect reporting", "Compliance checking", "Production monitoring", "Equipment maintenance", "Safety protocols", "Quality metrics"]
    },
    {
      name: "Energy & Utilities Assistant",
      description: "Utility management with consumption tracking, billing support, and outage reporting.",
      category: "Utilities",
      intents: 25,
      entities: 16,
      price: 11999,
      rating: 4.5,
      downloads: 456,
      features: ["Consumption tracking", "Billing support", "Outage reporting", "Service requests", "Energy efficiency", "Payment processing"]
    },
    {
      name: "Agriculture Management Bot",
      description: "Farm management assistant with crop monitoring, weather alerts, and supply chain coordination.",
      category: "Agriculture",
      intents: 26,
      entities: 18,
      price: 13999,
      rating: 4.6,
      downloads: 234,
      features: ["Crop monitoring", "Weather alerts", "Supply coordination", "Pest management", "Harvest planning", "Market prices"]
    },
    {
      name: "Media & Entertainment Bot",
      description: "Content discovery and management with personalized recommendations and subscription handling.",
      category: "Media",
      intents: 29,
      entities: 20,
      price: 6999,
      rating: 4.8,
      downloads: 1670,
      features: ["Content discovery", "Personalized recommendations", "Subscription management", "Watchlist tracking", "Social sharing", "Content rating"]
    },
    {
      name: "Non-Profit Fundraising Bot",
      description: "Donor management and fundraising assistant with campaign tracking and volunteer coordination.",
      category: "Non-Profit",
      intents: 23,
      entities: 15,
      price: 2999,
      rating: 4.7,
      downloads: 567,
      features: ["Donor management", "Campaign tracking", "Volunteer coordination", "Event planning", "Impact reporting", "Thank you automation"]
    },
    {
      name: "Government Services Bot",
      description: "Citizen services assistant with application processing, document requests, and information delivery.",
      category: "Government",
      intents: 35,
      entities: 25,
      price: 45999,
      rating: 4.3,
      downloads: 289,
      features: ["Application processing", "Document requests", "Information delivery", "Appointment scheduling", "Status tracking", "Multi-language support"]
    },
    {
      name: "Beauty & Spa Assistant",
      description: "Salon and spa management with appointment booking, service recommendations, and client preferences.",
      category: "Beauty & Wellness",
      intents: 21,
      entities: 13,
      price: 999,
      rating: 4.8,
      downloads: 923,
      features: ["Appointment booking", "Service recommendations", "Client preferences", "Product suggestions", "Loyalty rewards", "Staff scheduling"]
    }
  ];

  const categories = Array.from(new Set(templates.map(t => t.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Templates & Starter Code</h1>
          <p className="text-gray-600">Professional Dialogflow templates for every industry - ready to deploy and customize</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="px-3 py-1">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{template.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription className="text-sm">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{template.intents} Intents</span>
                    <span>{template.entities} Entities</span>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">${template.price.toLocaleString()}</span>
                      </div>
                      <span className="text-sm text-gray-500">One-time purchase</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Template?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our team can create a custom Dialogflow template tailored to your specific industry and requirements.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Request Custom Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
