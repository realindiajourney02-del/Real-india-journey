const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  siteName: { type: String, default: "Real India Journey" },
  tagline: { type: String, default: "Authentic Luxury India Travel & Tailor-Made Tours" },
  phone: { type: String, default: "+91 98765 43210" },
  email: { type: String, default: "info@realindiajourney.com" },
  notificationEmail: { type: String, default: "info@realindiajourney.com" },
  address: { type: String, default: "Real India Journey House, C-Scheme, Jaipur, Rajasthan 302001, India" },
  whatsapp: { type: String, default: "+919876543210" },
  whatsappNotifyPhone: { type: String, default: "+919876543210" },
  whatsappEnableNotify: { type: Boolean, default: true },
  whatsappApiKey: { type: String, default: "" },
  whatsappInstanceId: { type: String, default: "" },
  whatsappProvider: { type: String, default: "callmebot" },
  facebookUrl: { type: String, default: "https://www.facebook.com/people/Real-India-Journey/61566539172995/" },
  instagramUrl: { type: String, default: "https://www.instagram.com/realindiajourney" },
  heroTitle: { type: String, default: "Authentic Luxury India Travel" },
  heroSubtitle: { type: String, default: "Curated Real India Journey expeditions across royal Rajasthan, tranquil Kerala backwaters, and alpine Kashmir." },
  statsTravelers: { type: String, default: "50,000+" },
  statsTours: { type: String, default: "1,500+" },
  statsRating: { type: String, default: "4.9/5" },
  statsYears: { type: String, default: "15+" },

  // Hero Banner Images for All Pages
  homeHeroImage1: { type: String, default: "/images/jodhpur_blue_city.jpg" },
  homeHeroImage2: { type: String, default: "/images/jodhpur_jaswant_thada.jpg" },
  homeHeroImage3: { type: String, default: "/images/rajasthan_hawa_mahal.jpg" },
  homeHeroImage4: { type: String, default: "/images/rajasthan_thar_desert.jpg" },
  aboutHeroImage: { type: String, default: "/images/about_hero.jpg" },
  contactHeroImage: { type: String, default: "/images/contact_hero.jpg" },
  blogsHeroImage: { type: String, default: "/images/blogs_hero.jpg" },
  packagesHeroImage: { type: String, default: "/images/packages_hero.jpg" },
  categoriesHeroImage: { type: String, default: "/images/categories_hero.jpg" },
  testimonialsHeroImage: { type: String, default: "/images/testimonials_hero.jpg" },
  carRentalHeroImage: { type: String, default: "/images/van2.png" },
  enquiryHeroImage: { type: String, default: "/images/enquiry_hero.jpg" },

  // Global & Page-wise SEO Meta Tags
  seoHomeTitle: { type: String, default: "Real India Journey | Luxury India Travel & Custom Tour Packages" },
  seoHomeKeywords: { type: String, default: "luxury india travel, rajasthan tour packages, golden triangle tour, india luxury travel agency" },
  seoHomeDescription: { type: String, default: "Experience authentic luxury travel across India. Tailor-made royal palace tours, Golden Triangle expeditions, wildlife safaris, and private chauffeur travel." },

  seoAboutTitle: { type: String, default: "About Us | Real India Journey - Premier Luxury Travel Specialist" },
  seoAboutKeywords: { type: String, default: "about real india journey, luxury travel specialist india, royal tour operator" },
  seoAboutDescription: { type: String, default: "Learn about Real India Journey, India's leading luxury travel agency specializing in high-end royal heritage tours and custom luxury itineraries." },

  seoPackagesTitle: { type: String, default: "Real India Journey Tour Packages" },
  seoPackagesKeywords: { type: String, default: "india holiday packages, rajasthan heritage tours, kerala backwaters tour, luxury india itineraries" },
  seoPackagesDescription: { type: String, default: "Browse our handpicked collection of luxury India tour packages across Rajasthan, Kerala, Golden Triangle, Kashmir, and spiritual circuits." },

  seoBlogsTitle: { type: String, default: "India Travel Blog & Insider Guides | Real India Journey" },
  seoBlogsKeywords: { type: String, default: "india travel blog, taj mahal travel tips, rajasthan travel guide, golden triangle itinerary" },
  seoBlogsDescription: { type: String, default: "Read expert travel advice, secret monument guides, and cultural insights from Real India Journey's luxury travel specialists." },

  seoCarTitle: { type: String, default: "Luxury Car Rental & Chauffeur Services | Real India Journey" },
  seoCarKeywords: { type: String, default: "luxury car rental india, innova crysta rental jaipur, tempo traveller rental delhi, private chauffeur tour india" },
  seoCarDescription: { type: String, default: "Hire premium air-conditioned vehicles (Innova Crysta, Fortuner, Tempo Traveller) with professional English-speaking chauffeurs across India." },

  seoContactTitle: { type: String, default: "Contact Us & Plan Your Journey | Real India Journey" },
  seoContactKeywords: { type: String, default: "contact real india journey, plan india tour, luxury travel inquiry" },
  seoContactDescription: { type: String, default: "Get in touch with Real India Journey's luxury travel specialists to craft your personalized trip to India." }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
