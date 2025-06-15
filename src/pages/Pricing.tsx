
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Star, Zap, Building, Gift, Calculator, Shield, HeadphonesIcon, ArrowRight } from "lucide-react";

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Starter",
      price: "Free",
      period: "Forever",
      badge: null,
      description: "Perfect for learning, prototyping, and small projects",
      features: [
        "1,000 Intent Generations",
        "500 Entity Extractions",
        "100 Webhook Generations",
        "50 Flow Creations",
        "10 Route Generations",
        "5 OpenAPI Spec Generations",
        "25 Playbook Instructions",
        "Basic Testing (50 test cases/month)",
        "Community Support",
        "Single Dialogflow project",
        "Basic debugging tools",
        "Template library access"
      ],
      limitations: [
        "No premium templates",
        "No live support",
        "No team collaboration",
        "No CI/CD integration"
      ],
      cta: "Get Started Free",
      ctaVariant: "outline" as const,
      icon: Gift
    },
    {
      name: "Developer",
      price: "$29",
      period: "per month",
      badge: "Most Popular",
      description: "Best for individual developers and small teams",
      features: [
        "25,000 Intent Generations",
        "15,000 Entity Extractions", 
        "2,500 Webhook Generations",
        "1,000 Flow Creations",
        "500 Route Generations",
        "100 OpenAPI Spec Generations",
        "1,000 Playbook Instructions",
        "Advanced Testing (1,000 test cases)",
        "Email Support (48hr response)",
        "All Programming Languages",
        "Premium Debugger with Flow Visualization",
        "GitHub Integration",
        "5 Dialogflow Projects",
        "Advanced Learning Paths",
        "Basic Live Support (4 hours/month)"
      ],
      cta: "Start Free Trial",
      ctaVariant: "default" as const,
      icon: Zap
    },
    {
      name: "Team",
      price: "$99",
      period: "per month",
      badge: null,
      description: "Designed for teams and growing businesses",
      features: [
        "100,000 Intent Generations",
        "75,000 Entity Extractions",
        "10,000 Webhook Generations",
        "5,000 Flow Creations",
        "2,500 Route Generations",
        "500 OpenAPI Spec Generations",
        "5,000 Playbook Instructions",
        "Enterprise Testing (5,000 test cases)",
        "Priority Email Support (24hr response)",
        "Team Collaboration (Up to 10 users)",
        "Real-time Collaborative Editing",
        "Advanced Analytics & Insights",
        "SSO Integration (SAML/OAuth)",
        "25 Dialogflow Projects",
        "Advanced CI/CD Integration",
        "Live IT Support Agent (20 hours/month)"
      ],
      cta: "Start Team Trial",
      ctaVariant: "outline" as const,
      icon: Star
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      badge: "Contact Sales",
      description: "For large organizations with advanced requirements",
      features: [
        "Unlimited Usage",
        "Unlimited Users",
        "Unlimited Projects",
        "White-label Solutions",
        "Custom Integrations",
        "Dedicated Success Manager",
        "24/7 Phone & Chat Support",
        "Custom SLA (99.9% uptime)",
        "Advanced Security & Compliance",
        "On-premise Deployment Options",
        "Custom Training & Onboarding",
        "SOC2, HIPAA, PCI compliance",
        "Custom data residency options",
        "Priority feature requests"
      ],
      cta: "Contact Sales",
      ctaVariant: "default" as const,
      icon: Building
    }
  ];

  const addOns = [
    {
      name: "Premium AI Models",
      items: [
        "GPT-4.5 Integration: $0.02 per 1K tokens",
        "Claude 3.5 Sonnet: $0.015 per 1K tokens",
        "Gemini Pro: $0.01 per 1K tokens"
      ]
    },
    {
      name: "Advanced Capabilities", 
      items: [
        "Multi-language Processing: $50/month per language pack",
        "Advanced Analytics Pack: $29/month",
        "Custom Integrations: $99/month per integration",
        "Priority Support Hours: $150/hour"
      ]
    },
    {
      name: "Storage & Processing",
      items: [
        "Extended Storage: $0.10/GB per month",
        "High-Volume Processing: Volume discounts available"
      ]
    }
  ];

  const roiExamples = [
    {
      title: "Small Team (3 developers)",
      traditional: "$20,000/month",
      withPlatform: "$8,099/month", 
      savings: "$11,901 (60% reduction)"
    },
    {
      title: "Enterprise Team (20 developers)",
      traditional: "$150,000/month",
      withPlatform: "$62,500/month",
      savings: "$87,500 (58% reduction)"
    }
  ];

  const supportTiers = [
    {
      name: "Community Support",
      tier: "Free",
      features: [
        "Community forums and documentation",
        "Self-service knowledge base", 
        "Video tutorials and guides",
        "Email support for billing issues only"
      ]
    },
    {
      name: "Standard Support",
      tier: "Developer",
      features: [
        "Email support with 48-hour response",
        "Documentation and API guides",
        "Community forum priority",
        "Basic troubleshooting assistance"
      ]
    },
    {
      name: "Priority Support", 
      tier: "Team",
      features: [
        "Email support with 24-hour response",
        "Live chat during business hours",
        "Phone support for critical issues",
        "Technical consultation (20 hours/month)"
      ]
    },
    {
      name: "Enterprise Support",
      tier: "Enterprise", 
      features: [
        "24/7 phone and chat support",
        "Dedicated success manager",
        "Custom SLA agreements",
        "Priority feature requests",
        "On-site training available"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
            Simple, <span className="text-blue-600 font-normal">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-light">
            Choose the perfect plan for your Dialogflow development needs. Start free, scale as you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-medium">
              Contact Sales
            </Button>
          </div>
          
          {/* Annual Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
            <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-600">Monthly</button>
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-900 shadow-sm">
              Annual <Badge className="ml-2 bg-green-100 text-green-800">20% off</Badge>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${tier.badge === "Most Popular" ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"}`}>
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">{tier.badge}</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600 ml-2">/{tier.period}</span>
                  </div>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className={`w-full rounded-full ${tier.ctaVariant === "default" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`} variant={tier.ctaVariant}>
                    {tier.cta}
                  </Button>
                  
                  <div className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {tier.limitations && (
                    <div className="pt-4 border-t">
                      <p className="text-xs text-gray-500 mb-2">Limitations:</p>
                      {tier.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="text-xs text-gray-400">
                          • {limitation}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Usage-Based Add-ons */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Usage-Based Add-ons</h2>
            <p className="text-lg text-gray-600">Enhance your platform with premium capabilities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {addOns.map((addOn, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">{addOn.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {addOn.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-light text-gray-900 mb-4">ROI Calculator</h2>
            <p className="text-lg text-gray-600">See how much you can save with our platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {roiExamples.map((example, index) => (
              <Card key={index} className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-green-800">{example.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Traditional development:</span>
                    <span className="font-medium">{example.traditional}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">With our platform:</span>
                    <span className="font-medium">{example.withPlatform}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold text-green-600">
                    <span>Monthly savings:</span>
                    <span>{example.savings}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Support Tiers */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HeadphonesIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-light text-gray-900 mb-4">Support Tiers</h2>
            <p className="text-lg text-gray-600">Get the help you need when you need it</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportTiers.map((support, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{support.name}</CardTitle>
                    <Badge variant="outline">{support.tier}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {support.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-xs text-gray-600">
                        <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-light text-gray-900 mb-4">Security & Compliance</h2>
            <p className="text-lg text-gray-600">Enterprise-grade security built into every plan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <div>SOC2 Type II certified</div>
                <div>GDPR & CCPA compliant</div>
                <div>End-to-end encryption</div>
                <div>Regional data residency</div>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <div>SSO Integration</div>
                <div>API Security</div>
                <div>Audit Logging</div>
                <div>Vulnerability Management</div>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <div>HIPAA compliant</div>
                <div>PCI DSS certified</div>
                <div>ISO 27001 certified</div>
                <div>Custom compliance options</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about our pricing</p>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">What happens if I exceed my usage limits?</h3>
              <p className="text-gray-600">You'll receive automatic notifications at 80% and 95% usage. Overages are billed at the listed rates, with a 48-hour grace period for accidental overages.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee for annual plans. Monthly plans can be cancelled anytime with no penalty.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Is there an API rate limit?</h3>
              <p className="text-gray-600">API rate limits scale with your plan tier. Developer tier: 100 requests/minute, Team tier: 500 requests/minute, Enterprise: Custom limits.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 font-light opacity-90">Join thousands of developers building amazing Dialogflow agents</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-medium">
              Contact Sales
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
