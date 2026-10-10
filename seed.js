const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Package = require('./models/Package');
const Category = require('./models/Category');
const Testimonial = require('./models/Testimonial');
const Setting = require('./models/Setting');

dotenv.config();

const INITIAL_PACKAGES = [
  {
    slug: "same-day-taj-mahal-agra-tour-by-car",
    title: "Same Day Taj Mahal & Agra Tour by Car",
    category: "same-day",
    duration: "1 Day (12-14 Hours)",
    daysCount: 1,
    nightsCount: 0,
    route: "Delhi • Agra • Taj Mahal • Agra Fort • Mehtab Bagh • Delhi",
    price: "₹4,500",
    priceVal: 4500,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80",
    description: "Experience the magnificent Taj Mahal at sunrise or express morning trip from Delhi via Yamuna Expressway in a private AC chauffeur-driven sedan or SUV.",
    highlights: [
      "Pick-up and drop-off anywhere in Delhi NCR / Airport included",
      "Express 3-hour smooth highway drive via Yamuna Expressway",
      "Private guided tour of the iconic Taj Mahal with official approved guide",
      "Visit Agra Fort — Mughal stronghold of Emperor Akbar & Shah Jahan",
      "Gourmet lunch at top 5-star hotel / authentic Indian restaurant in Agra",
      "Sunset view of Taj Mahal from across Yamuna River at Mehtab Bagh"
    ],
    overview: "Our flagship Same Day Agra Tour by Private Car is tailor-made for travelers with limited time who want to witness the World Wonder Taj Mahal in supreme comfort and privacy.",
    accommodations: "Day Tour — No overnight stay (Luxury day-use room available on request).",
    transportation: "Private AC Sedan (Swift Dzire / Etios) or SUV (Toyota Innova Crysta) with professional uniformed chauffeur.",
    meals: "Buffet Lunch at 5-Star Hotel (Courtyard by Marriott / Jaypee Palace Agra).",
    itinerary: [
      { day: "01", title: "06:00 AM — Pick-up from Delhi NCR & Drive to Agra", desc: "Private driver picks you up from your hotel or Delhi Airport in a private AC vehicle. Scenic 3-hour drive via Yamuna Expressway.", highlights: ["Hotel/Airport Pickup", "Yamuna Expressway Drive"] },
      { day: "01", title: "09:30 AM — Arrival in Agra & Guided Taj Mahal Sightseeing", desc: "Meet your licensed professional guide in Agra. Enjoy priority skip-the-line entry into the magnificent Taj Mahal.", highlights: ["Skip-the-Line Ticket", "Guided Taj Mahal Tour"] },
      { day: "01", title: "12:30 PM — Gourmet Buffet Lunch", desc: "Savor a delicious multi-cuisine buffet lunch at an air-conditioned 5-star hotel in Agra.", highlights: ["5-Star Buffet Lunch", "Relaxation"] },
      { day: "01", title: "02:00 PM — Tour Colossal Agra Fort", desc: "Explore the UNESCO World Heritage Agra Fort, visiting Jahangir Palace, Khas Mahal, and Musamman Burj where Shah Jahan spent his final days.", highlights: ["Agra Fort Exploration", "Mughal Architecture"] },
      { day: "01", title: "04:30 PM — Visit Mehtab Bagh & Artisan Workshops", desc: "Photograph Taj Mahal across the Yamuna river at Mehtab Bagh. Optional demonstration of famous Agra marble inlay handicrafts.", highlights: ["Sunset View", "Marble Handicrafts"] },
      { day: "01", title: "06:00 PM — Drive Back to Delhi & Drop-off", desc: "Relax in your private vehicle during the return journey to Delhi. Driver drops you at hotel, residence, or airport.", highlights: ["Comfortable Return Drive", "Hotel/Airport Drop-off"] }
    ],
    inclusions: [
      "Pick-up and Drop-off anywhere in Delhi, Noida, Gurugram, or Delhi Airport (DEL)",
      "Private Air-Conditioned Vehicle (Sedan or SUV) with all toll taxes, parking & fuel charges",
      "Government Approved English speaking Tour Guide in Agra",
      "Skip-the-line express monument entry tickets to Taj Mahal & Agra Fort",
      "Buffet Lunch at 5-Star Hotel in Agra",
      "Bottled mineral water and refreshments during travel"
    ],
    exclusions: [
      "Tipping / Gratuities to driver & guide",
      "Alcoholic beverages",
      "Personal expenses and camera fees"
    ],
    faqs: [
      { q: "Is Taj Mahal open every day?", a: "No, the Taj Mahal is closed every Friday for prayers." },
      { q: "Can we adjust pick-up timing?", a: "Yes! As this is a 100% private tour, pick-up time is completely flexible between 03:00 AM and 09:00 AM." }
    ],
    isFeatured: true
  },
  {
    slug: "same-day-agra-tour-by-superfast-gatimaan-train",
    title: "Same Day Agra Tour by Superfast Gatimaan Express Train",
    category: "same-day",
    duration: "1 Day (12 Hours)",
    daysCount: 1,
    nightsCount: 0,
    route: "Delhi (Hazrat Nizamuddin) • Agra Cantt • Taj Mahal • Agra Fort • Delhi",
    price: "₹5,800",
    priceVal: 5800,
    image: "/images/hero_taj_mahal_sunrise.jpg",
    description: "Travel in speed and style aboard India's fastest Gatimaan Express train from Delhi to Agra in just 100 minutes, featuring AC Chair Car seats & onboard meals.",
    highlights: [
      "Round-trip Express Train Tickets (Gatimaan Express AC Chair Car / Executive Class)",
      "Delhi Railway Station transfers in private AC vehicle",
      "Superfast 100-minute journey with hot breakfast & dinner served on train",
      "Private AC Car & Guide waiting for you at Agra Cantt station",
      "Guided visits to Taj Mahal, Agra Fort, and Baby Taj (Itimad-ud-Daulah)"
    ],
    overview: "Avoid highway traffic and enjoy a smooth, high-speed rail experience to Agra with Real India Journey's all-inclusive Gatimaan Express Package.",
    accommodations: "Day Rail Tour — No hotel stay required.",
    transportation: "Gatimaan Express Train + Private AC SUV/Sedan for all Agra sightseeing.",
    meals: "Onboard breakfast on morning train & onboard dinner on evening train included.",
    itinerary: [
      { day: "01", title: "07:00 AM — Hotel Pickup & Transfer to Hazrat Nizamuddin Station", desc: "Private driver picks you up from your Delhi hotel and assists you onto Gatimaan Express train (Train No. 12050).", highlights: ["Delhi Station Transfer", "Boarding Assistance"] },
      { day: "01", title: "08:10 AM — Gatimaan Express Departs with Onboard Breakfast", desc: "Relax in air-conditioned comfort as train reaches speeds of 160 km/h. Hot breakfast served at your seat.", highlights: ["High-speed Rail", "Onboard Breakfast"] },
      { day: "01", title: "09:50 AM — Arrival at Agra Cantt Station", desc: "Meet your private guide and driver waiting outside Agra Cantt railway station with your name board.", highlights: ["VIP Reception", "Private Car Sightseeing"] },
      { day: "01", title: "10:15 AM — Taj Mahal Exploration", desc: "Visit the world-renowned Taj Mahal with your expert guide, learning about Mughal Emperor Shah Jahan's eternal love story.", highlights: ["Taj Mahal Tour", "Photography"] },
      { day: "01", title: "01:30 PM — Luxury Lunch & Agra Fort Visit", desc: "Enjoy lunch followed by guided tour of Agra Fort's grand palaces and halls of audience.", highlights: ["Agra Fort", "Buffet Lunch"] },
      { day: "01", title: "05:00 PM — Transfer to Agra Cantt Station", desc: "Board Gatimaan Express (Train No. 12049) departing at 05:50 PM. Dinner served onboard.", highlights: ["Return Train", "Onboard Dinner"] },
      { day: "01", title: "07:30 PM — Arrival in Delhi & Hotel Transfer", desc: "Arrive at Nizamuddin Station; private driver escorts you back to your hotel or airport.", highlights: ["Delhi Drop-off"] }
    ],
    inclusions: [
      "Round-trip Gatimaan Express AC Train Tickets (Delhi to Agra & Agra to Delhi)",
      "Private AC Car transfers in Delhi and full day sightseeing in Agra",
      "Government authorized English-speaking guide in Agra",
      "All monument entry tickets (Taj Mahal & Agra Fort)",
      "Onboard breakfast & dinner served on the train",
      "Buffet lunch in Agra"
    ],
    exclusions: ["Tips and personal purchases"],
    faqs: [
      { q: "Is train booking guaranteed?", a: "Yes, we reserve confirmed AC Chair Car tickets upon booking confirmation." }
    ],
    isFeatured: true
  },
  {
    slug: "golden-triangle-classic-3-days",
    title: "Golden Triangle Classic Tour (3 Days / 2 Nights)",
    category: "golden-triangle",
    duration: "3 Days / 2 Nights",
    daysCount: 3,
    nightsCount: 2,
    route: "Delhi • Agra (Taj Mahal) • Fatehpur Sikri • Jaipur • Delhi",
    price: "₹18,500",
    priceVal: 18500,
    image: "/images/golden_triangle_classic.jpg",
    description: "The ultimate 3-day imperial express tour covering India's historic Golden Triangle: Delhi's monuments, Agra's Taj Mahal, and Jaipur's Pink City fortresses.",
    highlights: [
      "Private AC luxury vehicle with dedicated chauffeur for all 3 days",
      "Delhi highlights: Qutub Minar, India Gate, Lotus Temple, & Parliament House",
      "Sunrise Taj Mahal tour with expert local historian",
      "En-route visit to ghost city Fatehpur Sikri & Abhaneri Chand Baori stepwell",
      "Jeep ride up to Amber Fort in Jaipur & photo stop at Hawa Mahal (Palace of Winds)"
    ],
    overview: "Discover India's most celebrated heritage corridor in 3 memorable days, crafted with 4-star / 5-star hotel options and private guides in every city.",
    accommodations: "1 Night Agra (ITC Mughal / Howard Plaza) + 1 Night Jaipur (Trident / Royal Orchid).",
    transportation: "Private Air-Conditioned Sedan (Dzire/Etios) or SUV (Innova Crysta).",
    meals: "Daily buffet breakfast at hotels.",
    itinerary: [
      { day: "01", title: "Delhi Sightseeing & Drive to Agra", desc: "Morning pick-up in Delhi, tour Qutub Minar and India Gate, then drive to Agra. Evening check-in at Agra hotel.", highlights: ["Delhi Tour", "Agra Drive"] },
      { day: "02", title: "Sunrise Taj Mahal, Agra Fort & Drive to Jaipur via Fatehpur Sikri", desc: "Experience Taj Mahal at sunrise. Visit Agra Fort, then drive to Jaipur stopping at Fatehpur Sikri Mughal ghost city. Evening arrival in Jaipur.", highlights: ["Sunrise Taj Mahal", "Fatehpur Sikri"] },
      { day: "03", title: "Jaipur Pink City Tour & Return to Delhi", desc: "Explore Amber Fort with Jeep ride, City Palace, Jantar Mantar, and Hawa Mahal. Afternoon drive back to Delhi hotel or airport.", highlights: ["Amber Fort Jeep Ride", "Hawa Mahal", "Delhi Return"] }
    ],
    inclusions: [
      "2 Nights accommodation in selected 4-Star or 5-Star hotels with breakfast",
      "Private AC Car for 3 days with all fuel, tolls, parking, and driver charges",
      "Licensed local guides in Delhi, Agra, and Jaipur",
      "Jeep ride at Amber Fort Jaipur",
      "Bottled water during sightseeing"
    ],
    exclusions: ["Flight tickets", "Monument entrance fees (can be added on request)", "Lunches & dinners"],
    faqs: [
      { q: "Can we extend this tour to 4 or 5 days?", a: "Yes! We offer 4-day and 5-day variations of the Golden Triangle with extra time in Jaipur or Delhi." }
    ],
    isFeatured: true
  },
  {
    slug: "golden-triangle-7-days-6-nights",
    title: "Golden Triangle Heritage Classic (7 Days / 6 Nights)",
    category: "golden-triangle",
    subcategory: "5-day-heritage-classic",
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    nightsCount: 6,
    route: "Delhi • Samode • Jaipur • Fatehpur Sikri • Agra • Delhi",
    price: "₹28,500",
    priceVal: 28500,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80",
    description: "An exquisite 7-day Golden Triangle expedition blending imperial Delhi's Mughal architecture, Samode heritage village & Sheesh Mahal, Pink City of Jaipur with Amber Fort elephant ride, ghost city Fatehpur Sikri, and sunrise & sunset Taj Mahal views with Agra Fort and Itmad-ud-Daulah.",
    highlights: [
      "Traditional Indian welcome upon arrival at Delhi International Airport",
      "Guided tour of Old Delhi (Jama Masjid, Chandni Chowk rickshaw ride, Raj Ghat) & New Delhi (Qutub Minar, Humayun's Tomb, India Gate)",
      "Enroute excursion to Samode Village & Samode Palace Sheesh Mahal (Hall of Mirrors)",
      "Caparisoned Elephant ride up Amber Fort in Jaipur & photo stop at Hawa Mahal (Palace of Winds)",
      "Tour of Maharaja's City Palace Armoury & Costume Museums + Jantar Mantar stone observatory",
      "Visit UNESCO World Heritage ghost city Fatehpur Sikri (Jama Masjid, Salim Chisti Tomb, Panch Mahal)",
      "Sunrise visit to the iconic Taj Mahal by traditional Tonga (Horse Carriage) & sunset Palette view",
      "Guided exploration of red sandstone Agra Fort & Itmad-ud-Daulah ('Baby Taj')"
    ],
    overview: "India is a country on every traveler's list. Our Golden Triangle 7-Day Experience combines the imperial capital of Delhi with the Mughal splendors of Agra and the princely pink city of Jaipur. Discover colonial Lutyens' Delhi, Shahjahanabad's Chandni Chowk bazaars, Samode Palace Sheesh Mahal, Amber Fort Maharajas' lifestyle, ghost city Fatehpur Sikri, and dual sunrise/sunset viewings of the legendary Taj Mahal.",
    accommodations: "Handpicked 4-Star & 5-Star Heritage Hotels & Palace Properties in Delhi, Jaipur, and Agra.",
    transportation: "Private Air-Conditioned Luxury Sedan or SUV with professional chauffeur for all transfers, outstation drives, and sightseeing.",
    meals: "Daily buffet breakfast at hotels included.",
    itinerary: [
      {
        day: "01",
        title: "Arrive Delhi — Traditional Indian Welcome",
        desc: "Upon arrival at New Delhi International Airport, met, greeted and escorted to the hotel with a Traditional Indian welcome. Check into hotel for overnight stay in Delhi.",
        highlights: ["Airport Reception", "Traditional Welcome", "Overnight Delhi Stay"]
      },
      {
        day: "02",
        title: "Full Day Old & New Delhi Heritage Tour",
        desc: "After breakfast, tour Old Delhi starting with 300-year-old Chandni Chowk market (rickshaw ride through narrow crowded lanes), Jama Masjid (India's largest mosque designed by Shah Jahan), Raj Ghat (Mahatma Gandhi memorial), and drive past Red Fort. In the afternoon, tour New Delhi: visit Qutub Minar (1199 AD), Humayun's Tomb (earliest Mughal architecture prototype for Taj Mahal), drive past India Gate, Presidential Palace, and Parliament House. Overnight in Delhi.",
        highlights: ["Chandni Chowk Rickshaw Ride", "Jama Masjid", "UNESCO Qutub Minar", "UNESCO Humayun's Tomb"]
      },
      {
        day: "03",
        title: "Delhi – Samode Village Excursion – Jaipur (270 km / 5 hrs)",
        desc: "Check out after breakfast and drive to Jaipur. Enroute stop at Samode, a lovely village 42km northwest of Jaipur in the Aravalli ranges. Take a village stroll, visit Samode Palace's hand-painted Durbar Hall and breathtaking Sheesh Mahal (Hall of Mirrors). Continue drive to Jaipur, check into hotel. Evening free to explore colorful market streets. Overnight in Jaipur.",
        highlights: ["Scenic Aravalli Drive", "Samode Village Stroll", "Samode Palace Sheesh Mahal", "Pink City Markets"]
      },
      {
        day: "04",
        title: "Jaipur Forts, Maharajas City Palace & Markets",
        desc: "Morning excursion to Amber Fort with a royal Elephant Ride up the ramparts (subject to availability). Visit Jag Mandir (Hall of Victory). Brief photo stop at Hawa Mahal (Palace of Winds). Afternoon tour of Maharaja's City Palace (Armoury Museum & Textile Museum) and Jantar Mantar observatory (1728-1734 AD). Walk through busy market lanes. Overnight in Jaipur.",
        highlights: ["Amber Fort Elephant Ride", "Hawa Mahal Photo Stop", "City Palace Armoury Museum", "Jantar Mantar Observatory"]
      },
      {
        day: "05",
        title: "Jaipur – Fatehpur Sikri – Agra (265 km / 5 hrs)",
        desc: "After breakfast, drive to Agra. Enroute stop 40km before Agra to visit Fatehpur Sikri, the deserted 16th-century Mughal ghost city built by Emperor Akbar in honor of Saint Sheikh Salim Chisti. Tour Jama Masjid, Salim Chisti Tomb, Panch Mahal, and palace halls. Continue drive to Agra, check into hotel. Late afternoon free to explore city. Overnight in Agra.",
        highlights: ["Drive to Agra", "Fatehpur Sikri Ghost City", "Salim Chisti Shrine", "Agra Hotel Check-in"]
      },
      {
        day: "06",
        title: "Agra: Sunrise Taj Mahal (Tonga Ride), Agra Fort & Itmad-ud-Daulah",
        desc: "At sunrise, take a traditional Tonga (Horse Carriage) to visit the world-famous Taj Mahal (closed Fridays), built by Shah Jahan for Mumtaz Mahal. Return to hotel for breakfast. Afternoon tour of UNESCO Agra Fort (Jahangir Palace, Khas Mahal) and Itmad-ud-Daulah ('Baby Taj'), built by Empress Nurjahan. At sunset, return to Taj Mahal to view it fired by a different palette. Overnight in Agra.",
        highlights: ["Sunrise Taj Mahal Tonga Ride", "UNESCO Agra Fort", "Itmad-ud-Daulah ('Baby Taj')", "Sunset Taj View"]
      },
      {
        day: "07",
        title: "Agra – Delhi Drive & Departure (203 km / 4 hrs)",
        desc: "Check out after breakfast and drive back to Delhi. Leisure time for last-minute souvenir shopping in Delhi. In time, transfer to Delhi International Airport for onward departure flight. Tour ends.",
        highlights: ["Highway Drive to Delhi", "Last Minute Shopping", "Airport Transfer", "Tour Ends"]
      }
    ],
    inclusions: [
      "6 Nights accommodation in selected 4-Star or 5-Star heritage hotels with daily breakfast",
      "Traditional Indian welcome upon arrival at Delhi Airport",
      "Private AC Vehicle for 7 days with dedicated chauffeur for all transfers, drives & sightseeing",
      "Tonga (Horse Carriage) ride at Taj Mahal in Agra",
      "Elephant ride at Amber Fort Jaipur (subject to availability)",
      "Excursion to Samode Village & Samode Palace Sheesh Mahal",
      "Government-approved licensed local tour guides in Delhi, Jaipur, and Agra",
      "All toll taxes, parking, fuel charges, state permits, and driver allowances"
    ],
    exclusions: [
      "International or domestic airfare",
      "Monument entrance fees",
      "Lunches, dinners, and personal beverages",
      "Tipping to drivers & guides"
    ],
    faqs: [
      {
        q: "What makes this 7-day Golden Triangle tour special?",
        a: "This package includes an exclusive enroute stop at Samode Village & Sheesh Mahal, Tonga carriage ride at sunrise at Taj Mahal, and both sunrise and sunset viewings of Taj Mahal."
      },
      {
        q: "Can this 7-day tour be customized?",
        a: "Yes, Real India Journey specializes in 100% bespoke customization according to your dates and hotel preferences."
      }
    ],
    isFeatured: true
  },
  {
    slug: "golden-triangle-with-wildlife-ranthambore-5-days",
    title: "Golden Triangle & Ranthambore Tiger Safari (5 Days / 4 Nights)",
    category: "wildlife",
    duration: "5 Days / 4 Nights",
    daysCount: 5,
    nightsCount: 4,
    route: "Delhi • Agra • Ranthambore Tiger Sanctuary • Jaipur • Delhi",
    price: "₹32,000",
    priceVal: 32000,
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=80",
    description: "Combine imperial monuments and wild tiger thrill! Tour Delhi, Taj Mahal in Agra, open 4x4 Jeep Safari in Ranthambore National Park, and royal Jaipur.",
    highlights: [
      "Open 4x4 Jungle Jeep Safari in Ranthambore National Park to track Bengal Tigers",
      "Sunrise visit to the iconic Taj Mahal & Agra Fort",
      "Amber Fort Jeep ascent, City Palace & Jal Mahal photo stops in Jaipur",
      "Drive through scenic Rajasthani countryside with private chauffeur"
    ],
    overview: "This 5-day tour seamlessly blends world heritage architecture with wild tiger adventure in India's top wildlife sanctuary.",
    accommodations: "4-Star & 5-Star Luxury Resorts in Agra, Ranthambore, and Jaipur.",
    transportation: "Private AC SUV Innova Crysta + 4x4 Open Safari Gypsy in Ranthambore.",
    meals: "Daily Breakfast + All Meals included during stay in Ranthambore Resort.",
    itinerary: [
      { day: "01", title: "Delhi to Agra & Agra Fort", desc: "Pick up in Delhi, drive to Agra, check in, visit Agra Fort and Mehtab Bagh.", highlights: ["Delhi Pickup", "Agra Fort"] },
      { day: "02", title: "Sunrise Taj Mahal & Drive to Ranthambore", desc: "Sunrise Taj Mahal tour. Drive to Ranthambore National Park. Check into jungle resort.", highlights: ["Sunrise Taj Mahal", "Jungle Lodge Check-in"] },
      { day: "03", title: "Ranthambore Tiger Safari & Drive to Jaipur", desc: "Early morning 4x4 open jeep safari into core tiger territory. Return for breakfast, then drive to Pink City Jaipur.", highlights: ["4x4 Tiger Safari", "Drive to Jaipur"] },
      { day: "04", title: "Jaipur Palace & Fort Discovery", desc: "Full day tour of Amber Fort, Hawa Mahal, City Palace, and Jantar Mantar observatory.", highlights: ["Amber Fort", "City Palace"] },
      { day: "05", title: "Jaipur to Delhi Departure", desc: "Morning breakfast, shopping in Jaipur markets, and drive back to Delhi Airport/Hotel.", highlights: ["Delhi Return Transfer"] }
    ],
    inclusions: [
      "4 Nights accommodation in 4/5 Star hotels",
      "1 Open 4x4 Jeep Safari in Ranthambore National Park with forest permit & naturalist",
      "All meals in Ranthambore + Daily breakfasts in Agra & Jaipur",
      "Private AC Innova Crysta with chauffeur for the entire trip"
    ],
    exclusions: ["Airfare", "Personal expenses"],
    faqs: [{ q: "When is Ranthambore open?", a: "Ranthambore National Park is open for safaris from October 1st to June 30th." }],
    isFeatured: true
  },
  {
    slug: "rajasthan-forts-palaces-heritage-tour-7-days",
    title: "Rajasthan Royal Forts & Palaces Expedition (7 Days / 6 Nights)",
    category: "rajasthan",
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    nightsCount: 6,
    route: "Jaipur • Jodhpur • Jaisalmer • Sam Sand Dunes • Udaipur",
    price: "₹38,500",
    priceVal: 38500,
    image: "/images/jodhpur_blue_city.jpg",
    description: "Immerse yourself in regal magnificence across Jaipur's pink palaces, Jodhpur's blue fort, Jaisalmer's golden desert dunes camp, and Udaipur's lake city.",
    highlights: [
      "Sunset Camel Safari & Luxury Swiss Tent Glamping in Jaisalmer Sam Dunes",
      "Private boat cruise on Lake Pichola with views of City Palace Udaipur",
      "Guided walk through Mehrangarh Fort & cobalt blue lanes of Jodhpur",
      "Visit 15th-century carved marble Ranakpur Jain Temple"
    ],
    overview: "Real India Journey's grand Rajasthani itinerary curated for couples, families, and luxury seekers wanting the complete land of kings.",
    accommodations: "Heritage Havelis, Luxury Resorts & Desert Glamping Camp.",
    transportation: "Private AC SUV (Toyota Innova Crysta) with experienced desert chauffeur.",
    meals: "Daily breakfast + Rajasthani dinner & folk dance in desert camp.",
    itinerary: [
      { day: "01", title: "Jaipur Arrival & Pink City Welcome", desc: "Welcome at Jaipur airport/station, check in, visit Albert Hall and Birla Temple.", highlights: ["Jaipur Arrival", "City Sightseeing"] },
      { day: "02", title: "Jaipur Forts & Drive to Jodhpur", desc: "Tour Amber Fort and Hawa Mahal, then drive to Jodhpur Sun City.", highlights: ["Amber Fort", "Drive to Blue City"] },
      { day: "03", title: "Jodhpur Mehrangarh Fort & Drive to Jaisalmer", desc: "Explore Mehrangarh Fort, Jaswant Thada, drive to golden desert city Jaisalmer.", highlights: ["Mehrangarh Fort", "Golden City"] },
      { day: "04", title: "Jaisalmer Fort & Thar Desert Camel Safari", desc: "Tour Sonar Quila living fort, Patwon Ki Haveli, evening camel safari & desert glamping camp.", highlights: ["Sonar Quila", "Camel Safari", "Desert Camp"] },
      { day: "05", title: "Jaisalmer to Udaipur via Ranakpur", desc: "Drive to Udaipur stopping at the exquisite 1444-pillar Ranakpur Temple.", highlights: ["Ranakpur Marble Temple", "Lake City Check-in"] },
      { day: "06", title: "Udaipur City Palace & Lake Pichola Cruise", desc: "Explore City Palace, Jagdish Temple, Saheliyon Ki Bari, and sunset boat ride.", highlights: ["City Palace", "Sunset Lake Cruise"] },
      { day: "07", title: "Farewell Udaipur Departure", desc: "Morning shopping and transfer to Udaipur Airport / Railway Station.", highlights: ["Airport Transfer"] }
    ],
    inclusions: [
      "6 Nights accommodation in heritage 4/5 star hotels & desert camp",
      "Camel safari, Rajasthani folk music, dance & buffet dinner in desert",
      "Lake Pichola boat cruise in Udaipur",
      "Dedicated AC SUV with experienced driver for 7 days"
    ],
    exclusions: ["Flight tickets", "Monument entry tickets"],
    faqs: [{ q: "Are the desert tents air-conditioned?", a: "Yes, our Swiss luxury tents feature attached private bathrooms and AC." }],
    isFeatured: true
  },
  {
    slug: "sacred-varanasi-spiritual-ganges-experience",
    title: "Sacred Varanasi & Spiritual Ganges Odyssey (4 Days / 3 Nights)",
    category: "spiritual",
    duration: "4 Days / 3 Nights",
    daysCount: 4,
    nightsCount: 3,
    route: "Varanasi Ghats • Ganges River • Sarnath • Kashi Vishwanath",
    price: "₹22,000",
    priceVal: 22000,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80",
    description: "Discover the spiritual soul of India in the ancient city of Varanasi: private Ganga Aarti boat rides, sunrise rowing past 84 ghats, and sacred Sarnath.",
    highlights: [
      "Private boat cruise on the Ganges during the mesmerizing evening Ganga Aarti",
      "Dawn boat ride witnessing morning prayers, rituals, and cremation ghats",
      "Guided trip to Sarnath where Lord Buddha gave his first sermon",
      "Walk through Banaras heritage silk weaving alleys & ancient temples"
    ],
    overview: "Step back 3,000 years into the world's oldest living city with Real India Journey's spiritual Varanasi package.",
    accommodations: "Riverside Heritage Hotel / 4-Star Hotel in Varanasi.",
    transportation: "Private AC vehicle for land transfers + Hand-rowed private boats.",
    meals: "Daily vegetarian breakfasts and traditional Banarasi meals.",
    itinerary: [
      { day: "01", title: "Varanasi Arrival & Evening Ganga Aarti Boat", desc: "Airport pickup, check-in, sunset private boat ride at Dashashwamedh Ghat for Ganga Aarti.", highlights: ["Ganga Aarti Boat", "Dashashwamedh Ghat"] },
      { day: "02", title: "Sunrise Ganges Cruise & Kashi Vishwanath Temple", desc: "Dawn boat cruise, visit Kashi Vishwanath Corridor, Annapurna temple, and Banaras silk market.", highlights: ["Sunrise Boat", "Kashi Vishwanath Corridor"] },
      { day: "03", title: "Sarnath Pilgrimage & Evening Cultural Performance", desc: "Visit Sarnath Dhamek Stupa, Archaeological Museum, and evening classical Sitar music.", highlights: ["Sarnath Stupa", "Classical Music"] },
      { day: "04", title: "Varanasi Departure", desc: "Morning blessing, souvenir shopping, and transfer to Varanasi Airport.", highlights: ["Airport Transfer"] }
    ],
    inclusions: ["3 Nights Hotel stay", "Private sunrise & sunset boat rides", "Sarnath excursion", "AC Car transfers"],
    exclusions: ["Airfare", "Personal temple offerings"],
    faqs: [{ q: "Is vegetarian food provided?", a: "Yes, pure vegetarian sattvic meals are provided throughout." }],
    isFeatured: true
  },
  {
    slug: "odisha-tribal-tour",
    title: "14-Day Odisha & Bastar Tribal Tour Expedition",
    category: "odisha-tribal",
    subcategory: "odisha-tribal-expedition",
    duration: "14 Days / 13 Nights",
    daysCount: 14,
    nightsCount: 13,
    route: "Bhubaneswar • Konark • Puri • Gopalpur on Sea • Rayagada • Jeypore • Jagdalpur • Kondagaon • Kanker • Raipur",
    price: "₹78,500",
    priceVal: 78500,
    image: "/images/odisha_bastar_tribal.jpg",
    description: "An extraordinary 14-day tribal and heritage expedition through the hidden heart of Odisha & Chhattisgarh. Discover ancient Kalinga temple architecture, UNESCO World Heritage Konark, Chilika lake bird sanctuaries, vibrant weekly tribal markets, remote mountain villages of Lanjia Saora, Dongaria Kondh, Bonda, Gadaba, Dhuruwa, Madia, and Muria tribes, traditional lost-wax Dhokra craft, Chitrakut waterfalls, and historic Kanker Palace.",
    highlights: [
      "UNESCO World Heritage Konark Sun Temple & 8th–12th Century Kalinga Temples of Bhubaneswar",
      "Scenic Chilika Lake bird sanctuary at Mangalajodi",
      "Immersion in primitive Lanjia Saora village with authentic Idital sacred wall paintings & Kudun Shaman house",
      "Wednesday Chatikana Dongaria Kondh tribal market in Niyamgiri Mountains",
      "Thursday Onukadally Bonda & Gadaba weekly market with live Dhemsa Tribal Folk Dance",
      "Friday Kunduli Market — largest multi-tribe forest produce gathering in Southern Odisha",
      "Saturday Gupteswar natural limestone cave Shiva shrine & Dhuruwa tribal village trail",
      "Kotpad organic vegetable dye weaving & Chitrakut Waterfall ('Niagara of India') wooden boat cruise",
      "Spectacular Dandami Madia Bison Horn Dance performance",
      "Kondagaon ancient lost-wax Dhokra bronze casting & Muria Ghotul youth dormitory culture",
      "Royalty experience with overnight stay at historic Kanker Palace"
    ],
    overview: "Our 14-Day Odisha & Bastar Tribal Expedition is a masterfully crafted cultural journey through the remote, mountainous, and forested heartlands of East-Central India. Unveil the rich heritage of ancient Kalinga temple architecture in Bhubaneswar and Konark before journeying deep into the indigenous tribal corridors of the Eastern Ghats and Bastar plateau. Interact with some of India's oldest and most unique Particularly Vulnerable Tribal Groups (PVTGs) including the Lanjia Saora, Dongaria Kondh, Bonda, Gadaba, Dhuruwa, Dandami Madia, and Muria tribes. Witness vibrant weekly barter markets, ancient lost-wax Dhokra bronze casting, organic vegetable dye weaving, energetic folk dances, and sacred river confluences, staying in handpicked resorts, heritage palace rooms, and boutique hotels.",
    accommodations: "Handpicked Hotels & Heritage Resorts: IRA BY ORCHID (Bhubaneswar), ANANYA PRIDE RESORT (Puri), ZONE BY PARK (Gopalpur-on-Sea), HOTEL SAI INTERNATIONAL / ANIJA GOLF (Rayagada), HELLO JEYPORE (Jeypore), BASTAR JUNGLE RESORT Cottage (Jagdalpur), KANKER PALACE Heritage Room (Kanker), HOTEL CELEBRATION (Raipur).",
    transportation: "Dedicated private air-conditioned luxury SUV (Toyota Innova Crysta / Mahindra Scorpio) with professional driver, tribal permits, tolls, and all transfers included.",
    meals: "Daily buffet breakfasts and authentic regional dinners throughout the 14-day journey included.",
    itinerary: [
      {
        day: "01",
        title: "SAT 17 JAN — Arrival Bhubaneswar: Ancient Kalinga Temples Trail",
        desc: "Arrival at Airport. Transfer to Hotel. Half day visit of ancient temples. History: Bhubaneswar derived its name from Tribhubaneswar, which literally means the Lord (Eeswar) of the Three Worlds (Tribhuban), referring to Shiva. Along with the old town, present-day Bhubaneswar is known as Ekamra Khetra (Temple City). Tracing history to 3rd century BCE and earlier, it is a confluence of Hindu, Buddhist, and Jain heritage boasting finest Kalingan temples. Visit ancient temples like Vaital Deul (8th century AD), Lingaraja Temple (11th to 12th century AD), Parasurameswara, Mukteswar, Rajarani, and Brahmeswara temples. Enjoy a heritage walk near Bindu Sagar Lake, where once 7,000 temples stood and over 500 temples remain today. Dinner and overnight stay at IRA BY ORCHID.",
        highlights: ["Airport Arrival & Transfer", "Lingaraja & Vaital Deul Temples", "Bindu Sagar Lake Heritage Walk (500+ Temples)", "Parasurameswara, Mukteswar, Rajarani & Brahmeswara", "Stay: IRA BY ORCHID, Bhubaneswar"]
      },
      {
        day: "02",
        title: "SUN 18 JAN — Bhubaneswar – Konark Sun Temple (75 km / 2 hrs) – Puri (35 km / 1 hr)",
        desc: "Morning drive to Konark (75 km / 2 hrs) and visit Sun Temple. Specialties include its unique design as a colossal 13th-century stone chariot for Sun God Surya, decorated with intricate carvings, 24 sundial wheels, and 7 stone horses. Prime example of Kalinga architecture and UNESCO World Heritage site, also known as 'Black Pagoda' due to dark khondalite stone. Later visit Fishermen village of Konark. Next drive to Puri (35 km / 1 hr) and visit Jagannath Temple, one of the Holiest sites of Hindus (viewed from outside as only Hindus are allowed inside). Check in at hotel, dinner and overnight stay at ANANYA PRIDE RESORT.",
        highlights: ["UNESCO Konark Sun Temple", "24 Sundial Carved Wheels & 7 Horses", "Konark Fishermen Village", "Puri Jagannath Temple (Exterior)", "Stay: ANANYA PRIDE RESORT, Puri"]
      },
      {
        day: "03",
        title: "MON 19 JAN — Puri – Mangalajodi (Chilika Lake) – Gopalpur on Sea (250 km / 5 hrs)",
        desc: "Morning drive to Gopalpur on Sea (250 km / 5 hrs), enroute visiting Mangalajodi point of Chilika Lake, world-famous for resident and migratory birds. Optional country boat ride to explore inside the lake wetland sanctuary. Later drive to Gopalpur on Sea and check in to hotel. Dinner and overnight stay at ZONE BY PARK.",
        highlights: ["Scenic Coastal Drive", "Mangalajodi Chilika Bird Sanctuary", "Optional Lake Country Boat Ride", "Seaside Sunset", "Stay: ZONE BY PARK, Gopalpur on Sea"]
      },
      {
        day: "04",
        title: "TUES 20 JAN — Gopalpur – Puttasing (160 km / 4 hrs) – Rayagada (100 km / 2 hrs) [Total 260 km / 6 hrs]",
        desc: "Transfer to Tribal mountains and homelands. Drive to Puttasing, home of the Lanjia Saora primitive tribe of Odisha. Nestled in Gajapati and Rayagada mountain forests, they are known for isolation, rich culture, idital wall paintings, elaborate dances, and terraced cultivation with indigenous water management. Speak Saora (Mundari group, Austroasiatic family). Worship spirits led by shamans (Kudun for male, Kudun Boi for female). Men wear white loincloth with red fringes resembling a tail ('Lanjia'). Visit village houses, sacred paintings, and if possible a shaman house. Later drive to Rayagada. Dinner and overnight stay at Anija Golf / Hotel Sai International.",
        highlights: ["Lanjia Saora Primitive Tribe Village", "Idital Sacred Wall Paintings", "Shaman (Kudun / Kudun Boi) House Visit", "Mountain & Forest Drive", "Stay: Anija Golf / Hotel Sai International, Rayagada"]
      },
      {
        day: "05",
        title: "WED 21 JAN — Chatikana Dongaria Market (45 km / 2 hrs) – Jeypore (120 km / 3 hrs)",
        desc: "Drive to Chatikana (45 km / 2 hrs) for Wednesday Dongaria Kondh Market, where Hill Dongaria Kondhs descend from Niyamgiri Mountain (1,200m altitude) to sell/barter forest collections and buy dry fish, sugar, salt, kerosene oil, white sarees, pigeons, and chickens for sacrifice. Animists who consider living outside Niyamgiri taboo. Girl children are prized. Both boys and girls decorate hair, wear beautiful scarves and nose rings. Later drive to Jeypore (120 km / 3 hrs) enroute visiting Boro Paraja mountain villages, where women wear beautiful earrings and hairpins. Dinner and overnight stay at HELLO JEYPORE.",
        highlights: ["Chatikana Wednesday Dongaria Market", "Niyamgiri Mountain PVTG Tribal Culture", "Distinctive Nose Rings & Hair Adornments", "Boro Paraja Mountain Villages", "Stay: HELLO JEYPORE, Jeypore"]
      },
      {
        day: "06",
        title: "THURS 22 JAN — Jeypore Excursion: Onukadally Market (80 km / 2 hrs), Duduma Waterfall & Gadaba Villages",
        desc: "Excursion to Onukadally (80 km / 2 hrs) for Bonda, Gadaba, Mali, and Didayi tribe weekly market. The Bonda Hills lie at 3,000–4,000 ft elevation in Malkangiri forest. Bondas are one of India's oldest tribes, believed to have migrated from Africa ~60,000 years ago (speak Remo, Austroasiatic family, classified as PVTG). Gadaba speak Gutob (Munda branch). Music and dance are integral; women perform Dhemsa dance in traditional attire playing tamudibaja, madal, and mahuri. Visit Duduma Waterfall and Gadaba villages. Return to Jeypore visiting Ollar Gadaba and Mali villages. Dinner and overnight stay at HELLO JEYPORE.",
        highlights: ["Onukadally Bonda & Gadaba Market", "Bonda Primitive Tribe (Remo Language)", "Duduma Waterfall View", "Live Dhemsa Tribal Folk Dance", "Stay: HELLO JEYPORE, Jeypore"]
      },
      {
        day: "07",
        title: "FRI 23 JAN — Jeypore Excursion: Kunduli Market (70 km / 2 hrs) & Koraput",
        desc: "Excursion to Kunduli market (70 km / 2 hrs) of Paraja, Kondh, and Mali tribes, where Pana sellers also come to trade forest and animal products. Visit Koraput Sabara Srikhetra Jagannath Temple (open to all) and traditional Potters Village where artisans spin clay on manual wheels. Dinner and overnight stay at HELLO JEYPORE.",
        highlights: ["Kunduli Friday Multi-Tribe Forest Market", "Paraja, Kondh, Mali & Pana Sellers", "Koraput Sabara Srikhetra Jagannath Temple", "Traditional Artisan Potters Village", "Stay: HELLO JEYPORE, Jeypore"]
      },
      {
        day: "08",
        title: "SAT 24 JAN — Jeypore Excursion: Gupteswar Cave, Dhuruwa Tribe & Baligaon Market (80 km / 2 hrs)",
        desc: "Drive to Gupteswar (80 km / 2 hrs) to visit natural limestone cave shrine of Lord Shiva. Visit Dhuruwa (Dhurua/Dharua) indigenous tribe villages. Native language is Parji (Dravidian family). Historically engaged in hunting, fishing, agriculture with mud/bamboo houses and slate/grass roofs. Played a key role in the 1910 Bastar Kanger forest rebellion led by Gunda Dhur. Visit Baligaon Saturday market. Return to Jeypore. Dinner and overnight stay at HELLO JEYPORE.",
        highlights: ["Gupteswar Limestone Cave Shiva Shrine", "Dhuruwa Tribe Village (Parji Language)", "Baligaon Saturday Market", "1910 Bastar Rebellion Heritage Lore", "Stay: HELLO JEYPORE, Jeypore"]
      },
      {
        day: "09",
        title: "SUN 25 JAN — Jeypore – Kotpad (Textile Village) – Jagdalpur (100 km / 2 hrs) & Chitrakut Waterfalls",
        desc: "Drive to Jagdalpur, Chhattisgarh (100 km / 2 hrs). Enroute visit Kotpad Tribal Textile Village (organic vegetable dye weaving) and paddy craft village. Jagdalpur is home to Dhuruwa, Bhatra, Madia, and Halva tribes. Visit Chitrakut Waterfall ('Niagara of India') on Indravati River. Enjoy local wooden boat cruise driven by Dhuruwa tribesmen to cave shrines and waterfall mouth. Evening visit Pallam market for cockfight show and Jagdalpur market. Overnight stay at BASTAR JUNGLE RESORT (Cottage).",
        highlights: ["Kotpad Organic Vegetable Dye Weaving", "Chitrakut Waterfall ('Niagara of India')", "Dhuruwa Wooden Boat Cruise & Cave Shrines", "Pallam Sunday Market & Cockfight Show", "Stay: BASTAR JUNGLE RESORT (Cottage), Jagdalpur"]
      },
      {
        day: "10",
        title: "MON 26 JAN — Jagdalpur (5 km / 1 hr): Dandami Madia Village, Bison Horn Dance & Tirathgarh Falls",
        desc: "Visit Dandami Madia village. Madia tribe is a PVTG subgroup of Gond tribe closely tied to forest resources. Witness their spectacular Bison Horn Dance performance with bovine horn headgear and drums. Visit Tokapal market, then explore Tirathgarh Waterfall inside Kanger Valley National Park with ancient Shiva temples. Dinner and overnight stay at BASTAR JUNGLE RESORT (Cottage).",
        highlights: ["Dandami Madia Tribal Village (PVTG)", "Spectacular Live Bison Horn Dance", "Tokapal Weekly Tribal Market", "Tirathgarh Stepped Waterfalls & Shiva Shrines", "Stay: BASTAR JUNGLE RESORT (Cottage), Jagdalpur"]
      },
      {
        day: "11",
        title: "TUES 27 JAN — Jagdalpur: Pakhnar Tribal Market (50 km / 2 hrs) & Madia Villages",
        desc: "Visit Pakhnar Tuesday tribal market (50 km / 2 hrs), where Madia, Muria, Dhuruwa, and Bhatra tribes sell and exchange forest and agricultural produce. Later visit different Madia and Dhuruwa villages to explore tribal lifestyle. Overnight stay at BASTAR JUNGLE RESORT (Cottage).",
        highlights: ["Pakhnar Tuesday Multi-Tribe Market", "Madia, Muria, Dhuruwa & Bhatra Barter Trade", "Remote Madia & Dhuruwa Village Walks", "Forest Produce & Terracotta Crafts", "Stay: BASTAR JUNGLE RESORT (Cottage), Jagdalpur"]
      },
      {
        day: "12",
        title: "WED 28 JAN — Jagdalpur – Kondagaon (70 km / 2 hrs) – Kiwaibalenga Muria Village (Ghotul, 22 km / 1 hr) – Kanker",
        desc: "Morning drive to Kanker enroute visiting Kondagaon Metal Craft Village (artists make bronze images by lost-wax process/Dhokra art dating to Indus Valley civilization, and Kadai Chipda wrought iron craft). Visit Muria tribal village of Kiwaibalenga to explore their Ghotul youth dormitory system — a social institution for unmarried youth to learn traditions, folklore, songs, and manage pre-marital customs. Drive to Kanker. Kanker Palace was constructed in early 19th century (reconstructed 1937, former British Agent residence & royal home). Overnight stay at KANKER PALACE (Heritage Room).",
        highlights: ["Kondagaon Dhokra Lost-Wax Bronze Crafting", "Kadai Chipda Wrought Iron Artisans", "Kiwaibalenga Muria Village & Ghotul Institution", "Stay: KANKER PALACE (Heritage Room)"]
      },
      {
        day: "13",
        title: "THURS 29 JAN — Kanker – Rajiv Lochan Temple (Rajim, 115 km / 3 hrs) – Raipur (45 km / 1 hr)",
        desc: "Drive to Rajim (115 km / 3 hrs), 'Prayag of Chhattisgarh' at the confluence of Mahanadi, Pairi, and Sondur rivers. Visit ancient 7th-century CE Rajiv Lochan Vishnu Mandir with Nala dynasty inscriptions of King Vilasatunga. Drive to Raipur (45 km / 1 hr), capital of Chhattisgarh. Visit Dudhadhari Math temple dedicated to Lord Rama with Ramayana carvings, and Swami Vivekananda Sarovar or Purkhouti Muktangan open-air tribal museum. Dinner and overnight stay at HOTEL CELEBRATION, Raipur.",
        highlights: ["7th Century CE Rajiv Lochan Vishnu Temple (Rajim)", "Sacred Three-River Confluence ('Prayag of Chhattisgarh')", "Raipur Capital & Dudhadhari Math Temple", "Purkhouti Muktangan Open-Air Tribal Museum", "Stay: HOTEL CELEBRATION, Raipur"]
      },
      {
        day: "14",
        title: "FRI 30 JAN — Raipur Departure",
        desc: "After breakfast at hotel, transfer to Raipur Swami Vivekananda Airport (RPR) for onward journey. Service ends.",
        highlights: ["Hotel Breakfast", "Private Airport Transfer to Raipur (RPR)", "Assistance at Departure", "Tour Service Ends"]
      }
    ],
    inclusions: [
      "13 Nights luxury accommodation in verified hotels, eco-resort cottages & royal heritage palace rooms",
      "Daily gourmet breakfast and authentic regional dinner buffet throughout the 14 days",
      "Dedicated private AC SUV (Toyota Innova Crysta / Scorpio) with professional driver, fuel, tolls & parking",
      "Government authorized English-speaking local tour guide & tribal specialist",
      "All tribal village entry permissions, local community intimations & PVTG area assistance",
      "Live Dhemsa Tribal Folk Dance & Dandami Madia Bison Horn Dance cultural performances",
      "Local wooden boat cruise at Chitrakut Waterfall",
      "Complimentary bottled mineral water & daily highway refreshments"
    ],
    exclusions: [
      "Domestic / International airfare or train tickets",
      "Monument & sanctuary camera charges",
      "Lunches, personal beverages & tips to driver/guide",
      "Travel & medical insurance"
    ],
    faqs: [
      {
        q: "Are special permits needed to visit tribal villages in Odisha and Bastar?",
        a: "Standard permits are managed seamlessly by Real India Journey. Our local team coordinates with local community leaders and authorities so your visits to Lanjia Saora, Bonda, Dongaria Kondh, and Madia villages are respectful, safe, and hassle-free."
      },
      {
        q: "Is photography allowed at the weekly tribal markets?",
        a: "Yes, photography is generally allowed in weekly markets. However, out of cultural respect, your expert guide will advise you on sensitive moments and ask permission before taking close-up portraits of village elders or shamanic rituals."
      },
      {
        q: "What type of accommodation and vehicle will be provided?",
        a: "You will stay in the best available luxury hotels, eco-jungle resort cottages (Bastar Jungle Resort), and a heritage room at the historic Kanker Palace. Travel is in a private air-conditioned SUV with an experienced hill/forest chauffeur."
      },
      {
        q: "Can this 14-day Odisha Tribal itinerary be customized?",
        a: "Absolutely! Real India Journey specializes in 100% tailor-made itineraries. We can adjust dates, duration, hotel choices, or add extra days based on your travel preferences."
      }
    ],
    isFeatured: true
  },
  {
    slug: "central-treasure-trail-16-days",
    title: "Central Treasure Trail – Heritage Expedition of Central India (16 Days)",
    category: "heritage",
    subcategory: "central-treasure-trail",
    duration: "16 Days / 15 Nights",
    daysCount: 16,
    nightsCount: 15,
    route: "Delhi • Agra • Gwalior • Sonagir • Datia • Orchha • Khajuraho • Sanchi • Bhopal • Bhimbetka • Ujjain • Indore • Dhar • Mandu • Maheshwar • Omkareshwar • Aurangabad • Ajanta & Ellora Caves • Mumbai",
    price: "₹95,000",
    priceVal: 95000,
    image: "/images/central_india_heritage.jpg",
    description: "An extensive 16-day expedition through the imperial heart of Central India. Discover Delhi Mughal heritage, Taj Mahal & Agra Fort, high-cliff Gwalior Fort, Sonagir Jain shrines, Datia Palace, Orchha Betwa river fortresses, Khajuraho UNESCO Kama Sutra temples, Sanchi Buddhist Great Stupa, Bhimbetka prehistoric cave art, sacred Ujjain Mahakaleshwar & Omkareshwar Jyotirlingas, Indore, historic Mandu city of joy, Maheshwar Ahilya Fort on sacred Narmada, and the world-famous UNESCO Ajanta & Ellora Caves.",
    highlights: [
      "Superfast Express Train journey from Delhi to Taj Mahal & Agra Fort",
      "Gwalior Fort cliffside Jain sculptures & Jai Vilas Scindia Palace Museum",
      "80 white hilltop Jain temples at Sonagir & 17th-century Datia Palace",
      "Orchha Betwa river fortress & spiritual Ram Raja Temple evening Aarti",
      "World-famous UNESCO Khajuraho Kama Sutra temples & Chandela dynasty architecture",
      "3rd-Century BC UNESCO Sanchi Great Stupa & Emperor Ashoka monasteries",
      "10,000-year-old UNESCO Bhimbetka prehistoric Stone Age cave art",
      "Sacred Mahakaleshwar & Omkareshwar Shiva Jyotirlingas on Narmada River",
      "Deserted medieval hill fortress city of Mandu & Jahaz Mahal (Ship Palace)",
      "Queen Ahilyabai's historic Ahilya Fort & sacred Narmada river ghats at Maheshwar",
      "World Heritage UNESCO Ajanta & Ellora Caves including the monolithic Kailash Temple",
      "Domestic flight from Aurangabad to Mumbai with VIP airport assistance"
    ],
    overview: "The Central Treasure Trail is an immersive 16-day grand circuit designed for discerning heritage travelers. Traverse the golden heartland of India from Delhi and Agra down through Madhya Pradesh into Maharashtra. Explore majestic forts of Gwalior and Datia, sacred temples of Orchha, world-celebrated erotic stone carvings at Khajuraho, ancient Buddhist monuments at UNESCO Sanchi, 10,000-year-old Stone Age cave paintings at Bhimbetka, romantic hill fortress of Mandu, serene Narmada river ghats at Maheshwar and Omkareshwar, culminating with the incomparable rock-cut Buddhist, Hindu and Jain caves of Ajanta and Ellora.",
    accommodations: "Handpicked luxury heritage hotels, palace stays & 4-star properties: Imperial / Taj Hotel (Delhi), ITC Mughal (Agra), Usha Kiran Palace (Gwalior), Amar Mahal (Orchha), The Lalit Temple View (Khajuraho), Jehan Numa Palace (Bhopal), Radisson Blu (Indore), Jhira Bagh Palace (Dhar), Ahilya Fort (Maheshwar), Vivanta / Rama International (Aurangabad).",
    transportation: "Superfast Gatimaan Express Train (Delhi-Agra-Gwalior), dedicated private AC luxury SUV with chauffeur, and domestic flight (Aurangabad to Mumbai).",
    meals: "Daily gourmet buffet breakfasts & curated heritage thali dinners included throughout.",
    itinerary: [
      {
        day: "01",
        title: "Arrive Delhi — Imperial Welcome",
        desc: "Arrival at New Delhi International Airport. Warm traditional Indian reception and private chauffeur transfer to luxury hotel for check-in and overnight stay.",
        highlights: ["Airport VIP Reception", "Private Chauffeur Transfer", "Luxury Hotel Check-in"]
      },
      {
        day: "02",
        title: "Delhi – Express Train to Agra (Taj Mahal & Agra Fort)",
        desc: "Early morning superfast express train to Agra. Check-in and visit the magnificent Taj Mahal (UNESCO World Heritage Site, closed Fridays). Explore colossal red sandstone Agra Fort, visiting Jahangir Palace, Khas Mahal, and audience halls. Overnight in Agra.",
        highlights: ["Superfast Express Train", "UNESCO Taj Mahal", "Agra Fort Mughal Palaces", "Stay in Agra"]
      },
      {
        day: "03",
        title: "Agra – Gwalior (Express Train, Gwalior Fort & Scindia Palace)",
        desc: "Morning express train to Gwalior in central region. Visit majestic cliff-top Gwalior Fort with 15th-century carved Jain sculptures. Tour the elegant Jai Vilas Palace and Scindia Museum, housing royal heirlooms. Overnight in Gwalior.",
        highlights: ["Gwalior Fort Cliff", "Carved Jain Sculptures", "Jai Vilas Palace & Museum", "Stay in Gwalior"]
      },
      {
        day: "04",
        title: "Gwalior – Sonagir – Datia Palace – Orchha (Ram Temple Aarti)",
        desc: "Morning drive to Orchha. En-route visit 80 hilltop white Jain temples at Sonagir and 17th-century Datia fortress palace. Arrive in Orchha on Betwa River. Evening visit Ram Raja Temple to witness spiritual Aarti ceremony. Overnight in Orchha.",
        highlights: ["Sonagir Jain Temples", "Datia Fortress Palace", "Orchha Betwa River", "Ram Raja Temple Evening Aarti"]
      },
      {
        day: "05",
        title: "Orchha Fort Palaces – Drive to Khajuraho UNESCO Temples",
        desc: "Morning tour of Orchha Fort complex featuring Jahangir Mahal, Raj Mahal, and exquisite Hindu epic frescoes. Drive to Khajuraho, world-famous for 10th-11th century UNESCO temples depicting Kamasutra art. Visit Western Group of Temples. Overnight in Khajuraho.",
        highlights: ["Orchha Frescoes", "UNESCO Khajuraho Temples", "Kamasutra Stone Carvings", "Western Group Temples"]
      },
      {
        day: "06",
        title: "Khajuraho – Sanchi (UNESCO Stupa) – Bhopal Capital",
        desc: "Morning drive to Bhopal. En-route stop at Sanchi, a peaceful hilltop UNESCO World Heritage Site housing the 3rd-century BC Great Stupa built by Emperor Ashoka, surrounded by ancient monasteries and carved gateways. Arrive in Bhopal for overnight stay.",
        highlights: ["UNESCO Sanchi Great Stupa", "Emperor Ashoka Monasteries", "Scenic Central India Drive", "Bhopal Arrival"]
      },
      {
        day: "07",
        title: "Bhopal Historic City Tour & Bhimbetka Cave Paintings",
        desc: "Morning tour of Bhopal visiting Taj-ul-Masjid (one of Asia's largest mosques), Jama Masjid, Moti Masjid, and old bazaars. Afternoon excursion to UNESCO Bhimbetka rock shelters featuring over 1,000 prehistoric Stone Age cave paintings. Overnight in Bhopal.",
        highlights: ["Taj-ul-Masjid Mosque", "Old City Bazaars", "UNESCO Bhimbetka Cave Art", "10,000-Year-Old Rock Paintings"]
      },
      {
        day: "08",
        title: "Bhopal – Ujjain (Mahakaleshwar Temple) – Indore",
        desc: "Drive to Indore en-route visiting sacred city of Ujjain, host of 12-year Kumbh Mela. Visit holy Mahakaleshwar Temple dedicated to Lord Shiva (housing a revered Jyotirlinga). Continue drive to Indore, commercial capital of Malwa. Overnight in Indore.",
        highlights: ["Sacred Ujjain City", "Mahakaleshwar Shiva Jyotirlinga", "Indore Commercial Hub", "Stay in Indore"]
      },
      {
        day: "09",
        title: "Indore – Dhar (Dhar Fort & Bhojshala Monument)",
        desc: "Morning drive to historic medieval town of Dhar, former capital of King Bhoj. Tour 14th-century Dhar Fort built by Alauddin Khilji and Bhojshala Mosque with Sanskrit wall inscriptions and conch shell motifs. Overnight in Dhar.",
        highlights: ["11th-Century Dhar Town", "Dhar Fort Exploration", "Bhojshala Sanskrit Inscriptions", "Stay in Dhar"]
      },
      {
        day: "10",
        title: "Dhar – Mandu Fortress Excursion (City of Joy) – Dhar",
        desc: "Full day excursion to Mandu ('City of Joy'), an abandoned hilltop fortress city showcasing supreme Afghan architecture. Visit Jahaz Mahal (Ship Palace), Baaz Bahadur Palace, Rani Roopmati Pavilion overlooking Narmada valley, and Hoshang Tomb. Return to Dhar for overnight.",
        highlights: ["Mandu Hill Fortress", "Jahaz Mahal Ship Palace", "Rani Roopmati Pavilion View", "Afghan Architectural Masterpieces"]
      },
      {
        day: "11",
        title: "Dhar – Maheshwar (Narmada River Ghats & Ahilya Fort)",
        desc: "Morning drive to Maheshwar, historic temple town on banks of sacred Narmada River mentioned in epics as Mahishmati. Visit river ghats, ancient Shiva temples, and tour 18th-century Ahilya Fort built by Queen Ahilyabai Holkar. Overnight at Ahilya Fort / hotel.",
        highlights: ["Sacred Narmada River Ghats", "Historic Ahilya Fort Palace", "Queen Ahilyabai Legacy", "Maheshwari Handloom Weaving"]
      },
      {
        day: "12",
        title: "Maheshwar – Omkareshwar Jyotirlinga Excursion – Maheshwar",
        desc: "Morning walk along Maheshwar ghats for river rituals. Excursion to Omkareshwar, a sacred OM-shaped island at confluence of Narmada and Kaveri rivers housing the Omkareshwar Shiva Jyotirlinga. Return to Maheshwar for overnight stay.",
        highlights: ["Morning Narmada Ghat Rituals", "Omkareshwar OM Island", "Sacred Shiva Jyotirlinga Temple", "River Confluence"]
      },
      {
        day: "13",
        title: "Maheshwar – Aurangabad (Mughal Heritage City)",
        desc: "Drive across state border to Aurangabad, Maharashtra, historic seat of Mughal Empire. Visit Bibi Ka Maqbara ('Taj of the Deccan') and Daulatabad Fort outer ramparts. Check-in and overnight in Aurangabad.",
        highlights: ["Interstate Scenic Drive", "Aurangabad Imperial History", "Bibi Ka Maqbara", "Stay in Aurangabad"]
      },
      {
        day: "14",
        title: "Aurangabad – UNESCO Ajanta Caves Excursion – Aurangabad",
        desc: "Full day excursion to UNESCO Ajanta Caves (30 rock-cut Buddhist caves from 2nd century BC to 6th century AD, closed Mondays). Marvel at Chaitya prayer halls, Vihara monasteries, and ancient Buddhist murals & Jataka paintings. Return to Aurangabad for overnight.",
        highlights: ["UNESCO Ajanta Caves", "2nd-Century BC Rock-Cut Buddhist Monasteries", "Ancient Fresco Murals & Paintings", "Chaitya & Vihara Halls"]
      },
      {
        day: "15",
        title: "Aurangabad – UNESCO Ellora Caves & Daulatabad Fort – Aurangabad",
        desc: "Full day excursion to UNESCO Ellora Caves (34 rock-cut caves of Hindu, Buddhist & Jain faiths, closed Tuesdays). Wonder at Cave 16 — monolithic Kailash Temple carved out of a single rock using 7,000 artisans over 150 years. Tour Daulatabad Fort citadel. Overnight in Aurangabad.",
        highlights: ["UNESCO Ellora Caves", "Monolithic Kailash Temple (Cave 16)", "Daulatabad Fort Citadel", "Hindu, Buddhist & Jain Cave Art"]
      },
      {
        day: "16",
        title: "Aurangabad – Flight to Mumbai & Departure",
        desc: "Morning leisure in Aurangabad. Transfer to domestic airport for short flight to Mumbai. Representative assists with transfer to Mumbai International Airport for onward flight home. Tour service ends.",
        highlights: ["Aurangabad Domestic Flight", "Mumbai Reception & Transfer", "International Airport Assistance", "End of Central Treasure Trail"]
      }
    ],
    inclusions: [
      "15 Nights luxury accommodation in verified heritage hotels, palace stays & 4-star properties",
      "Round-trip Superfast Gatimaan Express Train tickets & domestic flight from Aurangabad to Mumbai",
      "Daily gourmet breakfast and curated heritage dinner buffets throughout the 16 days",
      "Dedicated private AC SUV with professional chauffeur for all transfers, excursions & tolls",
      "Government authorized English-speaking local tour guides at all major monuments & UNESCO sites",
      "All monument entry tickets (Taj Mahal, Agra Fort, Gwalior Fort, Khajuraho, Sanchi, Bhimbetka, Ajanta & Ellora Caves)",
      "Private boat cruise / river ghat transfers at Maheshwar & Omkareshwar",
      "Complimentary bottled mineral water & daily highway refreshments"
    ],
    exclusions: [
      "International airfare",
      "Monument & sanctuary camera charges",
      "Lunches, personal beverages & tips to driver/guide",
      "Travel & medical insurance"
    ],
    faqs: [
      {
        q: "Are Ajanta and Ellora caves open on all days of the week?",
        a: "Ajanta Caves are closed on Mondays and Ellora Caves are closed on Tuesdays. Our 16-day itinerary is expertly scheduled so your visits fall on open days."
      },
      {
        q: "What mode of transport is used for this Central India expedition?",
        a: "We use high-speed express trains for Delhi-Agra-Gwalior, private luxury AC SUV with chauffeur for all land travel, and a domestic flight from Aurangabad to Mumbai."
      },
      {
        q: "Can this 16-day Central Treasure Trail itinerary be customized?",
        a: "Yes, Real India Journey specializes in 100% tailor-made travel. We can add nights, change hotel categories, or modify stops according to your preferences."
      }
    ],
    isFeatured: true
  },
  {
    slug: "colors-of-rajasthan-10-days",
    title: "Colors of Rajasthan & Taj Mahal Classic (10 Days)",
    category: "rajasthan",
    subcategory: "colors-of-rajasthan",
    duration: "10 Days / 9 Nights",
    daysCount: 10,
    nightsCount: 9,
    route: "Delhi • Agra • Taj Mahal • Fatehpur Sikri • Jaipur • Pushkar • Jodhpur • Ranakpur • Udaipur",
    price: "₹48,500",
    priceVal: 48500,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    description: "A vibrant 10-day cultural journey through India's colorful desert kingdom of Rajasthan plus the iconic Taj Mahal. Experience the imperial heritage of Delhi, Taj Mahal & Agra Fort, ghost city of Fatehpur Sikri, Pink City of Jaipur with Amber Fort elephant ride, sacred Pushkar lake & Brahma Temple, cobalt Blue City of Jodhpur with Mehrangarh Fort, 1,444 marble carved pillars at Ranakpur, and romantic Lake City of Udaipur with Pichola sunset boat cruise.",
    highlights: [
      "Guided tour of Old & New Delhi (Chandni Chowk, Jama Masjid, Qutub Minar & Humayun Tomb)",
      "Express Train ride to Agra & private guided visit to Taj Mahal & Agra Fort",
      "Fatehpur Sikri 16th-century ghost city & Sheikh Salim Chisti Dargah",
      "Pink City Jaipur, caparisoned Elephant ride to Amber Fort & Hawa Mahal photo stop",
      "Maharaja's City Palace Armoury Museum & UNESCO Jantar Mantar Observatory",
      "Holy Pushkar Lake with 52 bathing ghats & the world's only Lord Brahma Temple",
      "Cobalt Blue City Jodhpur, colossal Mehrangarh Fort & Jaswant Thada royal cenotaphs",
      "15th-Century Ranakpur Jain Marble Temples supported by 1,444 uniquely carved pillars",
      "Romantic Udaipur City Palace, Saheliyon Ki Bari ('Garden of Maids') & World's largest Crystal Gallery",
      "Twilight private boat cruise on Lake Pichola past Jag Mandir Island Palace"
    ],
    overview: "The Colors of Rajasthan package is a 10-day grand royal expedition across Northern India's most vibrant cultural corridor. Every region in Rajasthan boasts its distinctive hue — the Pink City of Jaipur, holy white ghats of Pushkar, cobalt Blue City of Jodhpur, and romantic white lake palaces of Udaipur ('Venice of the East'). Witness the world wonder Taj Mahal in Agra, ride caparisoned elephants up to Amber Fort, explore sacred Brahma Temple, gaze down from Mehrangarh Fort ramparts, marvel at Ranakpur's 1,444 marble pillars, and cruise Lake Pichola.",
    accommodations: "Handpicked 4-Star & 5-Star Heritage Havelis & Palace Hotels: The Claridges / Metropolitan (Delhi), Tajview / ITC Mughal (Agra), Shahpura House / Jai Mahal Palace (Jaipur), Pushkar Palace (Pushkar), Ajit Bhawan / Ranbanka Palace (Jodhpur), Trident / Fateh Garh (Udaipur).",
    transportation: "Morning Express Train (Delhi to Agra) + Dedicated private air-conditioned luxury Sedan / SUV with professional chauffeur for all outstation travel.",
    meals: "Daily buffet breakfasts & authentic Rajasthani welcome dinner thalis included.",
    itinerary: [
      {
        day: "01",
        title: "Arrive Delhi — Imperial Welcome",
        desc: "Arrival at New Delhi International Airport. Met, greeted, and traditional Indian welcome on arrival. Private chauffeur transfer to luxury hotel for check-in and overnight stay.",
        highlights: ["Airport VIP Reception", "Traditional Welcome", "Delhi Stay"]
      },
      {
        day: "02",
        title: "Old & New Delhi Guided Heritage Tour",
        desc: "Full day tour of Old Delhi (300-year-old Chandni Chowk bazaars, Jama Masjid, Raj Ghat, Red Fort drive-pass) and New Delhi (Qutub Minar, Humayun Tomb, India Gate, Presidential Palace, and Parliament House). Overnight in Delhi.",
        highlights: ["Chandni Chowk Bazaars", "Jama Masjid Mosque", "UNESCO Qutub Minar", "UNESCO Humayun Tomb"]
      },
      {
        day: "03",
        title: "Delhi – Agra Express Train (Taj Mahal & Agra Fort)",
        desc: "Early morning express train to Agra. Check-in and visit the world wonder Taj Mahal (closed Fridays), built by Shah Jahan for Mumtaz Mahal. Afternoon tour of red sandstone Agra Fort palaces (Jahangir Palace & Khas Mahal). Optional sunset view of Taj. Overnight in Agra.",
        highlights: ["Express Train to Agra", "UNESCO Taj Mahal", "Tonga Ride", "Agra Fort Palaces"]
      },
      {
        day: "04",
        title: "Agra – Jaipur via Fatehpur Sikri (265 km / 7 hrs)",
        desc: "Drive to Pink City Jaipur. En-route visit UNESCO World Heritage Fatehpur Sikri, Emperor Akbar's 16th-century red sandstone deserted capital (Jama Masjid, Tomb of Sheikh Salim Chisti, Panch Mahal). Arrive Jaipur; evening free for bazaar shopping. Overnight in Jaipur.",
        highlights: ["UNESCO Fatehpur Sikri", "Salim Chisti Shrine", "Pink City Markets", "Overnight Jaipur"]
      },
      {
        day: "05",
        title: "Jaipur (Amber Fort Elephant Ride & City Tour)",
        desc: "Morning excursion to Amber Fort with caparisoned elephant ride up the ramparts (subject to availability). Brief photography stop at Hawa Mahal (Palace of Winds). Afternoon tour of City Palace (Armoury & Textile Museums) and UNESCO Jantar Mantar observatory. Overnight in Jaipur.",
        highlights: ["Amber Fort Elephant Ride", "Hawa Mahal Photo Stop", "City Palace Museum", "UNESCO Jantar Mantar"]
      },
      {
        day: "06",
        title: "Jaipur – Pushkar (150 km / 3 hrs)",
        desc: "Morning drive to sacred town of Pushkar. Visit the world's only temple dedicated to Lord Brahma and walk along 52 sacred bathing ghats around Pushkar Lake. Evening exploration of local Pushkar handicraft market. Overnight in Pushkar.",
        highlights: ["Pushkar Lake & 52 Ghats", "Lord Brahma Temple", "Pushkar Handicrafts Market", "Overnight Pushkar"]
      },
      {
        day: "07",
        title: "Pushkar – Jodhpur (225 km / 4.5 hrs)",
        desc: "Drive to Blue City Jodhpur. Visit colossal Mehrangarh Fort towering above cobalt blue houses, displaying miniature paintings and silver howdahs. Visit Jaswant Thada white marble royal cenotaphs, Clock Tower, and Sardar Spice Market. Overnight in Jodhpur.",
        highlights: ["Cobalt Blue City", "Mehrangarh Fort Museum", "Jaswant Thada Cenotaphs", "Clock Tower Spice Market"]
      },
      {
        day: "08",
        title: "Jodhpur – Udaipur via Ranakpur Temples (280 km / 7 hrs)",
        desc: "Scenic drive to Udaipur across Aravalli Range. En-route visit 15th-century Ranakpur Jain Temples, supported by 1,444 uniquely carved marble pillars and single-stone 108-headed snake carving. Arrive in Lake City Udaipur. Evening at leisure. Overnight in Udaipur.",
        highlights: ["Aravalli Hills Scenic Drive", "1,444 Carved Marble Pillars at Ranakpur", "Udaipur Arrival", "Evening at Leisure"]
      },
      {
        day: "09",
        title: "Udaipur (City Palace, Crystal Gallery & Lake Pichola Cruise)",
        desc: "Tour Udaipur City Palace (Suraj Gokhada, Mor Chowk, Zenana Mahal), Jagdish Temple, and Saheliyon Ki Bari ('Garden of Maids'). Visit World's largest Crystal Gallery at Fateh Prakash Palace (featuring sole crystal bed). Late afternoon private boat cruise on Lake Pichola past Jag Mandir. Overnight in Udaipur.",
        highlights: ["City Palace Museum", "Saheliyon Ki Bari", "World Crystal Gallery", "Lake Pichola Sunset Boat Ride"]
      },
      {
        day: "10",
        title: "Leave Udaipur — Departure",
        desc: "Breakfast at hotel. Private chauffeur transfer to Udaipur Maharana Pratap Airport (UDR) for flight to onward destination. Tour service ends.",
        highlights: ["Hotel Breakfast", "Private Chauffeur Transfer", "Udaipur Airport Drop-off", "Service Ends"]
      }
    ],
    inclusions: [
      "9 Nights luxury accommodation in handpicked 4/5-Star Heritage Havelis & Hotels",
      "Morning Express Train tickets (Delhi to Agra)",
      "Daily gourmet buffet breakfasts & royal welcome thali dinner",
      "Dedicated private AC vehicle with professional chauffeur for all transfers, excursions & tolls",
      "Elephant ride at Amber Fort, Jaipur (subject to availability)",
      "Private boat cruise on Lake Pichola in Udaipur",
      "Government authorized English-speaking local tour guides at all cities & monuments",
      "All toll taxes, fuel charges, state entry permits & driver allowances"
    ],
    exclusions: [
      "Domestic / International airfare",
      "Monument & sanctuary camera charges",
      "Lunches, personal beverages & tips to driver/guide",
      "Travel & medical insurance"
    ],
    faqs: [
      {
        q: "What is the best time of year for this Colors of Rajasthan tour?",
        a: "October through March offers pleasant, cool weather perfect for sightseeing across Rajasthan's forts and desert cities."
      },
      {
        q: "Can this 10-day itinerary be customized?",
        a: "Yes! Real India Journey specializes in 100% tailor-made itineraries. We can adjust nights, add wildlife safaris (like Ranthambore), or upgrade hotels."
      }
    ],
    isFeatured: true
  },
  {
    slug: "gems-of-north-india-15-days",
    title: "Gems of North India Grand Odyssey (15 Days / 14 Nights)",
    category: "rajasthan",
    subcategory: "gems-of-north-india",
    duration: "15 Days / 14 Nights",
    daysCount: 15,
    nightsCount: 14,
    route: "Delhi • Varanasi • Sarnath • Khajuraho • Orchha • Jhansi • Agra • Fatehpur Sikri • Jaipur • Jodhpur • Ranakpur • Udaipur • Mumbai • Elephanta Caves",
    price: "₹85,000",
    priceVal: 85000,
    image: "/images/gems_north_india.jpg",
    description: "A magnificent 15-day royal expedition across North India's greatest gems: Imperial Delhi, Sacred Varanasi & Ganges Aarti, Sarnath Buddha sermon site, UNESCO Khajuraho temples, Orchha medieval Betwa palaces, Shatabdi Express to Agra, sunrise Tonga ride at Taj Mahal & Agra Fort, deserted ghost city Fatehpur Sikri, Pink City Jaipur with Amber Fort elephant ride & City Palace, Blue City Jodhpur with Mehrangarh Fort, 1,444-pillar Ranakpur marble temples, Lake Pichola cruise in Udaipur, flight to Mumbai, 1200-year-old Elephanta Caves & Mumbai city highlights.",
    highlights: [
      "Traditional Indian welcome at Delhi Airport & guided Old & New Delhi heritage tour (Jama Masjid, Chandni Chowk, Qutub Minar, Humayun Tomb)",
      "Domestic flight to holy city Varanasi & sunset Ganges River Aarti ceremony with floating oil lamps",
      "Early morning Ganges boat cruise at sunrise & pilgrimage excursion to Sarnath Buddha sermon stupa",
      "Flight to Khajuraho & guided tour of UNESCO Western & Eastern Group Erotic & Jain Temples",
      "Drive to Jhansi via medieval Orchha Betwa river fort & Express Shatabdi Train to Agra",
      "Sunrise Tonga (Horse Carriage) visit to Taj Mahal & guided tour of Agra Fort & Itmad-ud-Daulah",
      "Enroute visit to Emperor Akbar's 16th-century ghost city Fatehpur Sikri & Salim Chisti Tomb",
      "Pink City Jaipur excursion: royal Elephant ride to Amber Fort, City Palace Armoury Museum, & Jantar Mantar Observatory",
      "Drive to Jodhpur, exploration of towering Mehrangarh Fort, Jaswant Thada cenotaphs & Sardar Spice Market",
      "Enroute visit to 15th-century Ranakpur Jain Temples with 1,444 uniquely carved marble pillars",
      "Romantic Udaipur City Palace, Saheliyon Ki Bari, World's largest Crystal Gallery & Lake Pichola sunset boat ride",
      "Flight to Mumbai & excursion to 1,200-year-old UNESCO Elephanta Caves Trimurti Shiva rock-cuts",
      "Guided Mumbai tour: Gateway of India, Marine Drive Queen's Necklace, Malabar Hill Hanging Gardens & Dhobi Ghat"
    ],
    overview: "Exotic Rajasthan, the 'Land of Maharajas' is blessed with awe-inspiring monuments to a fierce warrior past. The magnificent forts of Jodhpur and Jaipur bear testament to the battles that once raged across this desert land, whilst the romantic palaces in Udaipur, Fatehpur Sikri and the world famous Taj Mahal offer a glimpse of a softer side to North India's rich history. For many Varanasi is the city that lingers longest in the memory; located on the River Ganges it is one of the most sacred in India. This full and rewarding trip gives a comprehensive introduction to the gems of India.",
    accommodations: "Handpicked 4-Star & 5-Star Heritage & Palace Hotels in Delhi, Varanasi, Khajuraho, Agra, Jaipur, Jodhpur, Udaipur, and Mumbai.",
    transportation: "Private air-conditioned luxury vehicle for all land transfers & sightseeing + 3 domestic flights (Delhi-Varanasi, Varanasi-Khajuraho, Udaipur-Mumbai) + Shatabdi Express Train (Jhansi-Agra).",
    meals: "Daily gourmet buffet breakfasts included at all hotels throughout the 15-day journey.",
    itinerary: [
      {
        day: "01",
        title: "Day 01 — Arrive Delhi (Traditional Indian Welcome)",
        desc: "Upon arrival at Delhi International Airport in the evening, you are met, greeted and escorted to the hotel. You are welcomed in the hotel in a Traditional Indian style on arrival and check into the hotel for overnight stay.",
        highlights: ["Airport Reception", "Traditional Indian Welcome", "Hotel Check-in", "Overnight Delhi"]
      },
      {
        day: "02",
        title: "Day 02 — Guided Tour of Old & New Delhi",
        desc: "After breakfast, leave for full-day city sightseeing tour of Old Delhi & New Delhi. Visit 300-year-old Chandni Chowk market (maze of crowded lanes with food and shops), Jama Masjid (India's largest mosque designed by Shah Jahan), Raj Ghat (simple memorial to Mahatma Gandhi), and drive past Red Fort. Afternoon tour of New Delhi: visit Qutab Minar (tapering 1199 AD minar symbolizing Islamic supremacy), Humayun's Tomb (earliest Mughal architectural prototype that inspired Taj Mahal), and drive past India Gate, Presidential Palace (Rashtrapati Bhavan), and Parliament House. Overnight at hotel in Delhi.",
        highlights: ["Chandni Chowk Market Walk", "Jama Masjid Mosque", "Raj Ghat Memorial", "UNESCO Qutab Minar", "UNESCO Humayun's Tomb"]
      },
      {
        day: "03",
        title: "Day 03 — Morning Flight to Varanasi & Sarnath Excursion (Evening Ganga Aarti)",
        desc: "Breakfast at hotel. In time, transfer to Delhi airport for morning flight to sacred city of Varanasi. Meet and greet on arrival and transfer to hotel. In the afternoon, visit Sarnath, where Lord Buddha preached his first sermon ('Maha-Dharma-Chakra Pravartan') after enlightenment. Explore Dharmarajika Stupa, Ashoka Lion Capital Pillar (national emblem of India), Dhamekh Stupa, Chaukhandi Stupa, Mulgandha Kuti Vihar Temple, and Archaeological Museum's rich Buddhist sculptures. In the evening at sunset, witness the soul-stirring Ganga Aarti Ceremony (collective prayer) on the Ganges river ghats with floating oil lamps and lit temples. Overnight in Varanasi.",
        highlights: ["Flight to Varanasi", "Sarnath Buddha First Sermon Site", "Ashoka Pillar & Dhamekh Stupa", "Sunset Ganga Aarti Ceremony", "Floating Oil Lamps on Ganges"]
      },
      {
        day: "04",
        title: "Day 04 — Sunrise Ganges Boat Cruise, Old Varanasi Walk & Flight to Khajuraho (UNESCO Temples)",
        desc: "Early morning boat ride along the Holy River Ganges for vantage views of sunrise rituals, bathing ghats, and morning ceremonies performed by priests. Walking tour of Old Varanasi visiting Bharat Mata Mandir, Durga Temple, and drive past Banaras Hindu University (BHU). Return to hotel for breakfast, check out, and transfer to airport for afternoon flight to Khajuraho. Meet and greet on arrival and transfer to hotel. Afternoon tour of Eastern Group of Temples (Ghantai Temple, Javari Temple, and 3 carved Jain temples) and Western Group of Temples including Kandariya Mahadeo Temple (largest Shiva temple), Chaunsat Yogini Jain Temple (64 attendants of Kali), and Chitragupta Temple (11-headed Vishnu sculpture). Overnight in Khajuraho.",
        highlights: ["Sunrise Ganges Boat Cruise", "Varanasi Ghats Morning Rituals", "Flight to Khajuraho", "UNESCO Western & Eastern Temples", "Kandariya Mahadeo Temple"]
      },
      {
        day: "05",
        title: "Day 05 — Drive to Jhansi via Medieval Orchha Palaces & Express Shatabdi Train to Agra",
        desc: "After breakfast, drive to Jhansi (180 km / 4 hrs), stopping enroute at Orchha, a medieval temple town on the Betwa River built by Bundela rulers in the 16th and 17th centuries. Explore the pristine fort complex consisting of palaces, temples, cenotaphs, and memorials. Continue drive to Jhansi Railway Station and board the evening Shatabdi Express train to Agra. Meet and greet on arrival in Agra and transfer to hotel for check-in and overnight stay.",
        highlights: ["Scenic Drive to Orchha", "16th Century Bundela Palaces & Betwa Fort", "Jhansi Shatabdi Express Train", "Evening Arrival in Agra"]
      },
      {
        day: "06",
        title: "Day 06 — Sunrise Taj Mahal by Tonga, UNESCO Agra Fort & Itmad-ud-Daulah",
        desc: "At sunrise, ride a traditional Tonga (Horse Carriage) to visit the world-famous Taj Mahal (closed Fridays), built by Shah Jahan in 1630 for Mumtaz Mahal using 20,000 craftsmen over 17 years. Return to hotel for breakfast. Afternoon guided tour of UNESCO Agra Fort (built by Emperor Akbar 1565–1573 with delicate mosaic and marble palaces overlooking Taj) and Itmad-ud-Daulah ('Baby Taj'), built across Yamuna river by Empress Nurjahan for her parents. Option to return to Taj Mahal at sunset to view it under golden evening light. Overnight in Agra.",
        highlights: ["Sunrise Taj Mahal Tonga Carriage Ride", "UNESCO Agra Fort", "Itmad-ud-Daulah ('Baby Taj')", "Optional Sunset Taj View"]
      },
      {
        day: "07",
        title: "Day 07 — Agra to Jaipur via Deserted Ghost City Fatehpur Sikri",
        desc: "Check out after breakfast and drive to Jaipur (265 km / 7 hrs). Enroute stop 40 km from Agra to visit Fatehpur Sikri, the deserted 16th-century Mughal ghost city built by Emperor Akbar in honor of Sufi Saint Sheikh Salim Chisti. Tour Jama Masjid, white marble Tomb of Salim Chisti, Panch Mahal Palace, and royal courtyards abandoned due to water scarcity. Continue drive to Jaipur; check in at hotel. Evening free to explore the colorful bazaars of the Pink City. Overnight in Jaipur.",
        highlights: ["Drive to Jaipur", "UNESCO Fatehpur Sikri Ghost City", "Sheikh Salim Chisti Tomb", "Panch Mahal", "Pink City Markets"]
      },
      {
        day: "08",
        title: "Day 08 — Amber Fort Elephant Ascent, Maharajas City Palace & Markets",
        desc: "After breakfast, morning excursion to Amber Fort with a royal Elephant Ride up the fort ramparts (subject to availability). Tour interior halls including Jag Mandir (Hall of Victory) with wall miniatures and embedded mirror work. Enroute photo stop at Hawa Mahal (Palace of Winds). Afternoon tour of Maharaja's City Palace (Mubarak Mahal, Armoury Museum with historic weaponry, Textile and Costume Museum) and Jantar Mantar (world's largest stone & marble observatory built by Jai Singh 1728–1734 with 17 working instruments). Finish with a walking tour through busy city market lanes. Overnight in Jaipur.",
        highlights: ["Amber Fort Elephant Ride", "Jag Mandir Hall of Victory", "Hawa Mahal Photo Stop", "City Palace Armoury Museum", "Jantar Mantar Stone Observatory"]
      },
      {
        day: "09",
        title: "Day 09 — Drive Across Rajasthan to Blue City Jodhpur (350 km / 7 hrs)",
        desc: "Check out after breakfast and drive across Rajasthan to Jodhpur (350 km / 7 hrs). Upon arrival, check into the hotel. The evening is at your disposal to explore the majestic Sun City / Blue City. Overnight in Jodhpur.",
        highlights: ["Drive Across Rajasthan", "Jodhpur Arrival", "Evening at Leisure", "Blue City Streets"]
      },
      {
        day: "10",
        title: "Day 10 — Mehrangarh Fort, Jaswant Thada Cenotaphs & Old Spice Market Walk",
        desc: "After breakfast, explore Jodhpur starting at Mehrangarh Fort, an impregnable fortress soaring above a 10 km wall. Tour decorated palaces with lattice and mirror work, and museum displaying miniature paintings, gilded palanquins, and solid silver Mughal howdahs. Next visit Jaswant Thada, a cluster of royal white marble cenotaphs built in 1899 AD for Maharaja Jaswant Singh II. Finish with a guided walking tour through Sardar Market and the Clock Tower area, a historic hub for local spices. Overnight in Jodhpur.",
        highlights: ["Mehrangarh Fort Palaces & Museum", "Silver Howdah & Palanquin Collection", "Jaswant Thada Royal Cenotaphs", "Clock Tower & Sardar Spice Market Walk"]
      },
      {
        day: "11",
        title: "Day 11 — Drive to Udaipur via 1,444 Marble Pillar Ranakpur Jain Temples",
        desc: "After breakfast, drive to Udaipur (280 km / 7 hrs) through the scenic Aravalli hills. Enroute visit 15th-century Ranakpur Jain Temples, one of the five holiest Jain sites. Admire over 1,444 uniquely carved marble pillars supporting the complex, and the single stone carving featuring 108 snake heads and tails. Continue drive to Lake City Udaipur; check into hotel. Evening at leisure. Overnight in Udaipur.",
        highlights: ["Scenic Aravalli Hills Drive", "15th-Century Ranakpur Jain Temples", "1,444 Uniquely Carved Marble Pillars", "108-Headed Snake Single Stone Carving", "Udaipur Hotel Check-in"]
      },
      {
        day: "12",
        title: "Day 12 — City Palace, Jagdish Temple, Crystal Gallery & Lake Pichola Boat Cruise",
        desc: "After breakfast, tour Udaipur. Visit City Palace (Suraj Gokhada, Badi Mahal, Sheesh Mahal, Mor Chowk peacock courtyard, Zenana Mahal), Jagdish Temple with sculpted figures, and Saheliyon Ki Bari ('Garden of Maids' built for 48 royal maids). In the afternoon, visit the famous Crystal Gallery at Fateh Prakash Palace, housing the world's largest private crystal collection ordered from F&C Osler in 1877 including the world's only Crystal Bed. Late afternoon, enjoy a scenic boat ride on Lake Pichola past bathing ghats and Jag Mandir Island Palace. Overnight in Udaipur.",
        highlights: ["Udaipur City Palace & Mor Chowk", "Jagdish Temple & Saheliyon Ki Bari", "World's Only Crystal Bed & Crystal Gallery", "Lake Pichola Sunset Boat Cruise"]
      },
      {
        day: "13",
        title: "Day 13 — Morning at Leisure & Evening Flight to Mumbai",
        desc: "Morning at leisure in Udaipur to relax or shop for local handicrafts and miniatures. Transfer to Udaipur airport in time for evening flight to Mumbai. Meet and greet on arrival in Mumbai by representative and transfer to hotel for check-in and overnight stay.",
        highlights: ["Relaxed Morning in Udaipur", "Flight to Mumbai", "Mumbai Airport Welcome", "Overnight Mumbai"]
      },
      {
        day: "14",
        title: "Day 14 — Excursion to UNESCO Elephanta Caves & Full Day Mumbai City Tour",
        desc: "After breakfast, take a boat from Mumbai harbour to Elephanta Island to visit 1,200-year-old rock-cut Elephanta Caves (closed Mondays), featuring the 3-faced Trimurti Shiva sculpture (Creator, Preserver, Destroyer). Return by boat to mainland. Afternoon guided Mumbai tour: Gateway of India (built 1911), Marine Drive ('Queen's Necklace' sea front boulevard), Jain Marble Temples, Malabar Hill Tower of Silence & Hanging Gardens, Prince of Wales Museum (mid-Victorian Gothic structure with miniature art), Jehangir Art Gallery, Crawford Market, and a photo stop at Dhobi Ghat open-air laundry. Overnight in Mumbai.",
        highlights: ["Boat Cruise to Elephanta Caves", "1200-Year-Old Trimurti Shiva Rock Sculpture", "Gateway of India & Marine Drive Queen's Necklace", "Prince of Wales Museum & Jehangir Art Gallery", "Dhobi Ghat Open-Air Laundry"]
      },
      {
        day: "15",
        title: "Day 15 — Departure Transfer from Mumbai International Airport",
        desc: "Breakfast at hotel. Check out from hotel. In time, private chauffeur escort transfer to Mumbai Chhatrapati Shivaji Maharaj International Airport (BOM) for your onward departure flight. Tour ends with unforgettable memories of North India.",
        highlights: ["Hotel Breakfast", "Private Chauffeur Transfer", "Mumbai Airport Assistance (BOM)", "End of Gems of North India Tour"]
      }
    ],
    inclusions: [
      "14 Nights accommodation in handpicked 4-Star & 5-Star Heritage & Palace Hotels (Delhi, Varanasi, Khajuraho, Agra, Jaipur, Jodhpur, Udaipur, Mumbai)",
      "Domestic flight tickets: Delhi to Varanasi, Varanasi to Khajuraho, and Udaipur to Mumbai",
      "Shatabdi Express AC Train ticket from Jhansi to Agra",
      "Daily buffet breakfasts at all hotels",
      "Dedicated private AC vehicle (Sedan or SUV) with professional chauffeur for all land transfers, drives & sightseeing",
      "Sunrise Tonga (Horse Carriage) ride at Taj Mahal in Agra",
      "Royal Elephant ride at Amber Fort, Jaipur (subject to availability)",
      "Private boat cruise on Holy River Ganges during evening Ganga Aarti & sunrise in Varanasi",
      "Private boat cruise on Lake Pichola in Udaipur & harbour ferry to Elephanta Caves in Mumbai",
      "Government authorized English-speaking local tour guides in Delhi, Varanasi, Sarnath, Khajuraho, Orchha, Agra, Fatehpur Sikri, Jaipur, Jodhpur, Ranakpur, Udaipur, Elephanta Caves & Mumbai",
      "All toll taxes, fuel charges, state entry permits, parking, and driver allowances"
    ],
    exclusions: [
      "International airfare & visa fees",
      "Monument entry fees & camera/video charges",
      "Lunches, dinners, and personal beverages",
      "Tipping / Gratuities to drivers and local tour guides",
      "Travel and medical insurance"
    ],
    faqs: [
      {
        q: "Are domestic flight tickets included in this 15-day tour package?",
        a: "Yes, all 3 internal domestic flights (Delhi to Varanasi, Varanasi to Khajuraho, and Udaipur to Mumbai) along with the Shatabdi Express train from Jhansi to Agra can be included in your customized itinerary package."
      },
      {
        q: "Can this 15-day Gems of North India tour be customized?",
        a: "Absolutely! Real India Journey specializes in 100% tailor-made itineraries. We can adjust dates, hotel choices (from boutique heritage havelis to 5-star palace hotels), or modify destination stays according to your preferences."
      }
    ],
    isFeatured: true
  },
  {
    slug: "jewels-of-south-india-15-days",
    title: "Jewels of South India Grand Expedition (15 Days / 14 Nights)",
    category: "south-india",
    subcategory: "jewels-of-south-india",
    duration: "15 Days / 14 Nights",
    daysCount: 15,
    nightsCount: 14,
    route: "Chennai • Mamallapuram • Kanchipuram • Chidambaram • Swamimalai • Kumbakonam • Darasuram • Tanjore • Trichy • Madurai • Periyar • Cochin • Alleppey • Kovalam",
    price: "₹88,000",
    priceVal: 88000,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    description: "A grand 15-day road and backwater journey across peninsular South India from the Coromandel Coast to the Malabar Coast: Colonial Chennai, Shore Temple at Mamallapuram, Golden City of Kanchipuram, Chidambaram Nataraja Temple, UNESCO Airavatesvara Temple at Darasuram, Brihadeeswara Temple at Tanjore, Trichy Rock Fort & Srirangam, Madurai Meenakshi Temple evening prayer, spice plantations & wildlife boat safari in Periyar, Fort Kochi Chinese Fishing Nets & Kathakali dance drama, overnight luxury houseboat backwater cruise in Alleppey, and Ayurvedic beach relaxation in Kovalam.",
    highlights: [
      "Guided tour of Chennai: St George Fort, Kapaleeshwarar Temple, and fruit & flower market",
      "Excursion to Kanchipuram (Golden City of 1,000 Temples) & silk weaver village",
      "UNESCO World Heritage Shore Temple, Arjuna's Penance & Five Rathas in Mamallapuram",
      "Visit Nataraja Temple at Chidambaram (Lord Shiva Cosmic Dancer) & Airavatesvara Temple at Darasuram",
      "Explore UNESCO Brihadeeswara Temple in Tanjore, Sarawati Mahal Library & Trichy Rock Fort",
      "Madurai Meenakshi Temple thousand-pillar hall, musical pillars, Tirumalai Nayak Palace & night ceremony",
      "Boating safari in Periyar Wildlife Sanctuary & guided walk through fragrant spice plantations",
      "Fort Kochi heritage tour: Chinese Fishing Nets, St Francis Church, Mattancherry Palace & Kathakali dance show",
      "Overnight backwater cruise aboard a private traditional Kerala houseboat in Alleppey",
      "Two days of Ayurvedic rejuvenation, beach relaxation & sun at Kovalam Beach resort"
    ],
    overview: "A 15 days holiday that takes you to the best of southern India's temple towns, hill stations, wildlife sanctuaries and backwaters. An in-depth road journey in easy stages through peninsular India - the Coast of Coromandel to the east, Malabar in the west takes you through one of the finest temples of Mamallapuram, Meenakshi, Chidambaram… each offering the traveler with a tantalizing experience. Jewel of South India Experience offers you a chance to see evening prayer ceremony at Meenakshi Temple, flower & vegetable markets, spice plantations in Periyar and Kathakali dance performance in Kochi.",
    accommodations: "Handpicked 4-Star & 5-Star Heritage Hotels & Beach Resorts in Chennai, Mamallapuram, Swamimalai, Tanjore, Madurai, Periyar, Cochin, Luxury Houseboat (Alleppey), and Kovalam.",
    transportation: "Private air-conditioned luxury vehicle (Sedan/SUV) with professional chauffeur for all land travel, transfers & excursions + Deluxe Private Kerala Houseboat.",
    meals: "Daily buffet breakfasts at hotels + All meals (Lunch, Dinner & Breakfast) served fresh onboard Alleppey Houseboat.",
    itinerary: [
      {
        day: "01",
        title: "Day 01 — Arrive Chennai (Traditional Welcome)",
        desc: "Upon arrival at Chennai, you are met, greeted and escorted to the hotel with a Traditional Indian welcome. Check into the hotel for overnight stay in Chennai.",
        highlights: ["Chennai Airport Welcome", "Traditional Greeting", "Hotel Check-in", "Overnight Chennai"]
      },
      {
        day: "02",
        title: "Day 02 — Chennai City Tour & Drive to Mamallapuram",
        desc: "After breakfast, tour Chennai: visit Fort St George (17th century East India Company center and St Mary's Church), Mylapore 16th-century Kapaleeshwarar Temple area, vibrant fruit and flower market, and Government Museum & Art Gallery (famous bronze gallery). Late afternoon drive to Mamallapuram (Mahabalipuram); check into hotel. Evening at leisure. Overnight in Mamallapuram.",
        highlights: ["Fort St George & St Mary Church", "Kapaleeshwarar Temple & Bazaars", "Government Bronze Gallery", "Drive to Mamallapuram"]
      },
      {
        day: "03",
        title: "Day 03 — Sacred Kanchipuram Excursion & UNESCO Shore Temples",
        desc: "After breakfast, excursion to Kanchipuram ('Golden City of a Thousand Temples'), visiting 7th-century sandstone Kailasanatha Temple and nearby silk weaving villages to watch weavers on looms. Continue to Mamallapuram to visit UNESCO World Heritage monuments: 7th-century Shore Temple, Arjuna's Penance bas-relief carving on a massive whaleback rock, and Pancha Pandava Rathas (monolithic rock-cut temples). Overnight in Mamallapuram.",
        highlights: ["Kanchipuram Kailasanatha Temple", "Traditional Silk Weaving Looms", "UNESCO Shore Temple", "Arjuna's Penance Bas-Relief", "Five Rathas Monoliths"]
      },
      {
        day: "04",
        title: "Day 04 — Drive to Swamimalai via Chidambaram Nataraja Temple",
        desc: "Early breakfast check out and drive to Swamimalai. Enroute stop at Chidambaram Nataraja Temple dedicated to Lord Shiva as Cosmic Dancer (representing space element among 5 Pancha Bhuta temples, famous for Bharatnatyam dance postures). Continue drive to Swamimalai; check into heritage hotel. Overnight in Swamimalai.",
        highlights: ["Chidambaram Nataraja Temple", "Cosmic Dancer Shiva Shrine", "Bharatnatyam Sculptures", "Swamimalai Heritage Hotel"]
      },
      {
        day: "05",
        title: "Day 05 — Kumbakonam Temples, UNESCO Darasuram & Tanjore Drive",
        desc: "Check out after breakfast and drive to Tanjore (Thanjavur). Enroute visit 1,300-year-old Adi Kumbeswarar Temple in Kumbakonam, and ancient Darasuram Airavatesvara Temple (UNESCO World Heritage Site built by Rajaraja Chola II in 12th century, known as a 'sculptor's dream in stone'). Continue drive to Tanjore; check into hotel. Overnight in Tanjore.",
        highlights: ["1300-Year-Old Kumbakonam Temple", "UNESCO Airavatesvara Temple Darasuram", "Exquisite Stone Carvings", "Drive to Tanjore"]
      },
      {
        day: "06",
        title: "Day 06 — UNESCO Brihadeeswara Temple, Saraswati Mahal & Trichy Rock Fort",
        desc: "After breakfast, tour Tanjore starting at 10th-century UNESCO Brihadeeswara Temple (built by Chola King Rajaraja I with 80-tonne single granite block cupola), Raja Museum Art Gallery (bronzes and granite sculptures), and Saraswati Mahal Library (40,000 rare books and palm leaf manuscripts). Afternoon excursion to Trichy: climb 400 steps up 84m giant boulder Rock Fort Temple to Tayumanasvami Temple and visit massive Srirangam Temple complex on Cauvery river island housing sleeping Lord Ranganatha. Return to Tanjore for overnight.",
        highlights: ["UNESCO Brihadeeswara Temple", "Saraswati Mahal Palm Leaf Manuscripts", "Trichy Rock Fort Climb", "Srirangam Ranganathaswamy Temple"]
      },
      {
        day: "07",
        title: "Day 07 — Drive to Madurai, Meenakshi Temple & Night Ceremony",
        desc: "Check out after breakfast and drive to ancient lotus-shaped city Madurai (seat of Tamil learning). Check into hotel. Afternoon tour of Meenakshi Amman Temple complex featuring 12 majestic painted Gopurams, Hall of a Thousand Pillars, and Musical Pillars producing notes when struck. Visit Tirumalai Nayak Palace (Indo-Saracenic stucco domes and arches). After early dinner, optional night visit to Meenakshi Temple to witness the daily night procession carrying Lord Shiva bronze to Parvati's bedchamber with temple music. Overnight in Madurai.",
        highlights: ["Meenakshi Amman Temple Gopurams", "Hall of 1000 Pillars & Musical Pillars", "Tirumalai Nayak Palace", "Night Bedchamber Ceremony"]
      },
      {
        day: "08",
        title: "Day 08 — Drive to Periyar Spice Country & Lake Boating Wildlife Safari",
        desc: "Check out after breakfast and drive to Periyar (Thekkady) in Western Ghats. Check into jungle resort. In the afternoon, enjoy a boat safari on Periyar Lake inside Periyar Wildlife Sanctuary to spot wild elephant herds, sambar deer, wild boars, and water birds along the forest shoreline. Overnight in Periyar.",
        highlights: ["Scenic Western Ghats Drive", "Periyar Wildlife Sanctuary", "Lake Boat Wildlife Safari", "Jungle Resort Stay"]
      },
      {
        day: "09",
        title: "Day 09 — Spice Plantation Tour & Wilderness Treks",
        desc: "Full day at leisure in Periyar to explore lush aromatic spice plantations (cardamom, pepper, cinnamon, vanilla, clove, and tea gardens). Optional activities include guided wilderness forest treks, tribal museum visit, and elephant rides. Overnight in Periyar.",
        highlights: ["Cardamom & Pepper Spice Tour", "Tea Garden Walks", "Optional Forest Treks", "Elephant Interaction"]
      },
      {
        day: "10",
        title: "Day 10 — Drive to Cochin, Fort Kochi Heritage & Kathakali Dance Drama",
        desc: "Check out after breakfast and drive down to coastal city Cochin (Kochi). Check into hotel. Afternoon guided tour of Fort Kochi: St Francis Church (India's oldest European church, original burial site of Vasco da Gama), Mattancherry Dutch Palace (featuring Ramayana & Mahabharata wall murals), 1568 Jewish Synagogue in Jew Town, and 14th-century cantilevered Chinese Fishing Nets at harbour entrance. In the evening, watch a live Kathakali Dance Drama show with makeup demonstration. Overnight in Cochin.",
        highlights: ["St Francis Church", "Mattancherry Palace Murals", "1568 Jewish Synagogue", "14th-C Chinese Fishing Nets", "Kathakali Dance Show"]
      },
      {
        day: "11",
        title: "Day 11 — Board Private Traditional Kerala Houseboat Cruise",
        desc: "After breakfast, drive to Alleppey (Alappuzha) and board a private traditional Kerala Kettuvallam Houseboat for an overnight backwater cruise. Glide through serene palm-fringed canals, lagoon islets, coconut groves, and paddy fields. Watch coir weaving, coconut tapping, and water birds (kingfishers, cormorants). Enjoy fresh traditional Keralan meals cooked onboard by private chef. Overnight onboard houseboat.",
        highlights: ["Private Kettuvallam Houseboat", "Scenic Backwater Canal Cruise", "Coconut Groves & Paddy Fields", "Fresh Onboard Kerala Cuisine", "Overnight Houseboat Stay"]
      },
      {
        day: "12",
        title: "Day 12 — Disembark Houseboat & Drive to Kovalam Beach Resort",
        desc: "Disembark from houseboat after breakfast and drive south along coastal highway to Kovalam Beach. Check into seaside beach resort. Afternoon free to soak up sun on golden beaches or book traditional Ayurvedic massage and oil bath packages at resort spa center. Overnight in Kovalam.",
        highlights: ["Disembark Houseboat", "Coastal Drive to Kovalam", "Golden Beach Sunset", "Ayurvedic Spa & Beach Resort"]
      },
      {
        day: "13",
        title: "Day 13 — Kovalam Beach Relaxation & Ayurvedic Rejuvenation",
        desc: "Breakfast at hotel. Full day free for independent activities, sunbathing, ocean swimming, coastal village strolls, or authentic Ayurvedic rejuvenation treatments. Overnight in Kovalam.",
        highlights: ["Beach Relaxation", "Ayurvedic Rejuvenation Massages", "Ocean Swimming", "Sunset Promenade"]
      },
      {
        day: "14",
        title: "Day 14 — Day at Leisure at Kovalam Beach",
        desc: "Breakfast at hotel. Another full day at leisure at Kerala's premier beach resort. Relax by the pool, explore nearby Lighthouse Beach, or indulge in fresh seafood dining. Overnight in Kovalam.",
        highlights: ["Lighthouse Beach Exploration", "Resort Poolside Relaxation", "Fresh Seafood Dining", "Ayurvedic Wellness"]
      },
      {
        day: "15",
        title: "Day 15 — Departure Transfer to Trivandrum Airport",
        desc: "Breakfast at hotel. Check out in time and private chauffeur transfer to Trivandrum International Airport (TRV) for your onward flight. Tour ends.",
        highlights: ["Hotel Breakfast", "Private Airport Transfer to TRV", "Departure Assistance", "Tour Ends"]
      }
    ],
    inclusions: [
      "13 Nights luxury accommodation in handpicked 4-Star & 5-Star Heritage & Beach Resorts + 1 Night Deluxe Private Kerala Houseboat",
      "Daily buffet breakfasts at hotels + All meals (Lunch, Dinner, Breakfast) freshly cooked onboard Alleppey Houseboat",
      "Dedicated private AC vehicle with professional chauffeur for all land transfers, drives & sightseeing",
      "Excursion to Kanchipuram silk weaving villages",
      "Periyar Wildlife Sanctuary Lake boat safari",
      "Full day spice plantation tour in Periyar",
      "Live Kathakali Dance Drama show tickets in Fort Kochi",
      "Private traditional Kettuvallam Houseboat cruise in Alleppey backwaters",
      "Government authorized English-speaking local tour guides in Chennai, Kanchipuram, Mamallapuram, Chidambaram, Kumbakonam, Tanjore, Trichy, Madurai, Periyar, Cochin, and Alleppey",
      "All toll taxes, fuel charges, state entry permits, parking, and driver allowances"
    ],
    exclusions: [
      "Domestic or international airfare",
      "Monument entry fees & camera charges",
      "Lunches & dinners at hotels (except on houseboat)",
      "Ayurvedic spa treatments & personal massages",
      "Tipping to drivers and guides"
    ],
    faqs: [
      {
        q: "What type of houseboat is provided in Alleppey?",
        a: "We provide a private AC traditional Kettuvallam houseboat with furnished bedroom, attached modern bathroom, private viewing deck, and dedicated captain, oarsman, and personal chef."
      },
      {
        q: "Can this 15-day South India tour be customized?",
        a: "Yes! Real India Journey specializes in 100% bespoke customization. We can adjust dates, hotel categories, add stay in Munnar hill station, or extend beach nights."
      }
    ],
    isFeatured: true
  },
  {
    slug: "luxury-collection-11-days",
    title: "Luxury Collection India Heritage & Wildlife Expedition (11 Days / 10 Nights)",
    category: "heritage",
    subcategory: "luxury-collection",
    duration: "11 Days / 10 Nights",
    daysCount: 11,
    nightsCount: 10,
    route: "Delhi • Fatehpur Sikri • Agra • Ranthambore Tiger Sanctuary • Jaipur • Udaipur • Ranakpur • Delhi / Mumbai",
    price: "₹65,000",
    priceVal: 65000,
    image: "/images/luxury_wildlife_tiger.jpg",
    description: "An opulent 11-day luxury circuit through India's imperial treasures: New Delhi's modern & ancient monuments, Old Delhi's Shahjahanabad bazaars, 16th-century Mughal ghost city Fatehpur Sikri, Taj Mahal & Agra Fort, 3 game drives in Ranthambore Tiger Sanctuary with expert naturalist, Pink City Jaipur with elephant ride to Amber Fort, internal flight to Udaipur ('Venice of the East'), City Palace, Saheliyon-Ki-Bari, Bharatiya Lok Kala Mandal puppet show, 1,444-pillar Ranakpur Jain Temples, and domestic flight connection to Delhi or Mumbai.",
    highlights: [
      "Immediate room occupancy & luxury chauffeur welcome upon arrival at Delhi International Airport",
      "Guided tour of New Delhi (Qutab Minar 234-ft tower, Rajpath, President's House, India Gate, Birla Mandir)",
      "Old Delhi tour (Red Fort, Moti Masjid, Raj Ghat & Chandni Chowk traditional market)",
      "Drive to Agra & visit 16th-century Mughal ghost city Fatehpur Sikri & Pearl Mosque",
      "Sunrise visit to the iconic Taj Mahal (7th Wonder of the World) & red sandstone Agra Fort",
      "Drive to Ranthambore Tiger Sanctuary & 3 guided jungle game safaris with expert naturalist",
      "Pink City Jaipur tour: Hawa Mahal (Palace of Winds), Maharaja's City Palace & Jantar Mantar Observatory",
      "Caparisoned elephant ride up to Amber Fort & Sheesh Mahal (Palace of Mirrors)",
      "Flight to romantic Udaipur ('Venice of the East'), City Palace, Saheliyon-Ki-Bari & authentic puppet show",
      "Excursion through Aravalli mountains to 1439 AD 1,444-pillar Ranakpur Jain Temple",
      "Domestic flight transfer from Udaipur to Delhi or Mumbai for onward international connection"
    ],
    overview: "Experience India's imperial heritage and wild tiger kingdom with Real India Journey's flagship Luxury Collection 11-Day Tour. Designed for discerning travelers seeking immediate room check-in, private AC luxury vehicles, expert naturalists, caparisoned elephant ascents, internal domestic flights, and handpicked 5-star palace hotel accommodations.",
    accommodations: "Handpicked 5-Star Luxury Palace Hotels & Jungle Resorts in Delhi, Agra, Ranthambore, Jaipur, and Udaipur.",
    transportation: "Private air-conditioned luxury SUV with dedicated chauffeur for all land drives & transfers + 3 Open 4x4 Jungle Safari Gypsies with naturalist + Internal domestic flight (Jaipur to Udaipur & Udaipur to Delhi/Mumbai).",
    meals: "Daily buffet breakfasts at hotels + All meals (Breakfast, Lunch & Dinner) included during stay at Ranthambore Tiger Resort.",
    itinerary: [
      {
        day: "01",
        title: "Day 01 — Arrive Delhi (Immediate Check-in)",
        desc: "Arrive in India’s capital city New Delhi, greeted with a traditional Indian welcome at the airport and escorted to your hotel with immediate room occupancy blocked. Remainder of day at leisure to relax. Overnight at hotel in Delhi.",
        highlights: ["Airport Reception", "Traditional Indian Welcome", "Immediate Room Occupancy", "Overnight Delhi"]
      },
      {
        day: "02",
        title: "Day 02 — Guided New Delhi Sightseeing Tour",
        desc: "Breakfast at hotel. In the afternoon, meet representative and depart in private car to visit New Delhi. Tour Qutab Minar complex (234-foot victory tower), drive down Rajpath past Parliament House, Diplomatic Enclave, President's House (Rashtrapati Bhavan), and India Gate. Visit colorful Birla Mandir temple for quiet reflection. Return to hotel for overnight.",
        highlights: ["Qutab Minar Victory Tower", "Rajpath & India Gate", "President's House & Parliament", "Birla Mandir Temple"]
      },
      {
        day: "03",
        title: "Day 03 — Old Delhi Heritage Walk & Drive to Agra (232 km / 5 hrs)",
        desc: "After breakfast, visit 17th-century walled city of Shahjahanabad (Old Delhi). Explore Red Fort, Moti Masjid (Pearl Mosque), Raj Ghat (Mahatma Gandhi memorial), Ashoka Pillar, and take a rickshaw walk through Chandni Chowk bazaars. Afternoon drive to Agra (232 km / 5 hrs). Check into hotel upon arrival for overnight stay.",
        highlights: ["Old Delhi Red Fort", "Moti Masjid", "Raj Ghat Memorial", "Chandni Chowk Market Walk", "Drive to Agra"]
      },
      {
        day: "04",
        title: "Day 04 — Fatehpur Sikri Ghost City, Agra Fort & Taj Mahal",
        desc: "After breakfast, visit abandoned 16th-century Mughal capital Fatehpur Sikri, built by Emperor Akbar combining Hindu and Muslim architecture (Pearl Mosque & sandstone palaces). Return to Agra to tour 16th-century red sandstone Agra Fort along Yamuna River. Followed by a guided tour of the iconic Taj Mahal, built by Shah Jahan in memory of Mumtaz Mahal (World Wonder). Overnight in Agra.",
        highlights: ["UNESCO Fatehpur Sikri", "Agra Fort Mughal Citadel", "UNESCO Taj Mahal", "Mughal Architecture"]
      },
      {
        day: "05",
        title: "Day 05 — Drive to Ranthambore & Afternoon Jungle Safari",
        desc: "After breakfast, drive to Ranthambore National Park (180 km / 4 hrs). Check into jungle resort. Ranthambore is the world's premier dry deciduous tiger habitat where tigers prowl ancient fort ruins. Afternoon embark on your first 4x4 open jeep game drive with an expert naturalist guide. Overnight at jungle lodge.",
        highlights: ["Drive to Ranthambore", "Check-in at Jungle Resort", "Afternoon 4x4 Tiger Safari", "Expert Naturalist Guide"]
      },
      {
        day: "06",
        title: "Day 06 — Morning & Evening Jungle Game Drives",
        desc: "Thrilling morning and evening game drives in open 4x4 Gypsies scouring the dry deciduous jungle with your naturalist guide. Ranthambore is one of the few places where Bengal tigers are active during daylight hours. Track tigers, leopards, sloth bears, sambar deer, and marsh crocodiles. Overnight at jungle resort.",
        highlights: ["Morning 4x4 Tiger Safari", "Evening 4x4 Tiger Safari", "Bengal Tiger Tracking", "Wild Leopard & Birdlife"]
      },
      {
        day: "07",
        title: "Day 07 — Morning Safari, Drive to Jaipur & City Sightseeing",
        desc: "Early morning game drive with naturalist, return for breakfast, then drive to Pink City Jaipur (180 km / 4 hrs). Afternoon city tour: photo stop at Hawa Mahal (Palace of Winds), tour Maharaja's City Palace (costume, miniature & armoury museum), and Jantar Mantar masonry astronomical observatory. Return to hotel for overnight.",
        highlights: ["Morning Jungle Drive", "Drive to Pink City Jaipur", "Hawa Mahal Photo Stop", "City Palace & Jantar Mantar"]
      },
      {
        day: "08",
        title: "Day 08 — Amber Fort Royal Elephant Ascent & Afternoon Leisure",
        desc: "Early morning excursion to hilltop Amber Fort. Experience a royal ascent on a caparisoned painted elephant heralded by musicians. Explore Sheesh Mahal (Palace of Mirrors), Hall of Public Audience (Diwan-e-Aam), and landscaped gardens. Return to hotel for breakfast and afternoon at leisure. Overnight in Jaipur.",
        highlights: ["Amber Fort Elephant Ride", "Sheesh Mahal Palace of Mirrors", "Diwan-e-Aam", "Afternoon at Leisure"]
      },
      {
        day: "09",
        title: "Day 09 — Flight to Udaipur, City Palace & Bharatiya Lok Kala Puppet Show",
        desc: "After breakfast, transfer to Jaipur airport for flight to Udaipur ('Venice of the East'). Greeted upon arrival and transferred to luxury hotel. Afternoon city tour: explore hilltop City Palace overlooking Lake Pichola (courtyards, pavilions & hanging gardens), Saheliyon-Ki-Bari ('Garden of the Maids'), and Bharatiya Lok Kala Mandal folk art museum featuring a traditional Rajasthani puppet show performance. Overnight in Udaipur.",
        highlights: ["Flight to Udaipur", "Udaipur City Palace", "Saheliyon-Ki-Bari Gardens", "Bharatiya Lok Kala Puppet Show"]
      },
      {
        day: "10",
        title: "Day 10 — Excursion through Aravallis to 1,444-Pillar Ranakpur Jain Temple",
        desc: "After breakfast, scenic excursion through Aravalli mountain pass to Ranakpur Jain Temples, built in 1439 AD. Tour the 'Four-Faced Temple' (Chaumukha Mandir) dedicated to Lord Adinath, featuring 29 halls supported by 1,444 uniquely carved marble pillars and Sun Temple erotic sculptures. Return to Udaipur for overnight stay.",
        highlights: ["Scenic Aravalli Mountain Drive", "1439 AD Ranakpur Jain Temples", "1,444 Uniquely Carved Marble Pillars", "Four-Faced Adinath Temple"]
      },
      {
        day: "11",
        title: "Day 11 — Morning at Leisure & Domestic Flight Connection",
        desc: "After breakfast, morning at leisure to relax by the lake or shop. Afternoon transfer to Udaipur Maharana Pratap Airport (UDR) for flight to Delhi (DEL) or Mumbai (BOM) to connect with your onward international flight. Tour service ends.",
        highlights: ["Morning Lake Leisure", "Transfer to Udaipur Airport", "Domestic Flight to Delhi/Mumbai", "Onward International Departure"]
      }
    ],
    inclusions: [
      "10 Nights luxury accommodation in handpicked 5-Star Luxury Hotels & Jungle Resorts (Immediate room occupancy on Day 1 included)",
      "Domestic flight ticket from Jaipur to Udaipur & Udaipur to Delhi/Mumbai",
      "3 Open 4x4 Jungle Safaris in Ranthambore National Park with forest permits & expert naturalist",
      "Daily buffet breakfasts at hotels + All meals (Breakfast, Lunch & Dinner) included during stay in Ranthambore",
      "Dedicated private AC luxury SUV with professional chauffeur for all transfers, drives & excursions",
      "Royal caparisoned elephant ride at Amber Fort in Jaipur",
      "Rajasthani folk puppet show performance in Udaipur",
      "Government authorized English-speaking local tour guides in Delhi, Fatehpur Sikri, Agra, Jaipur, Udaipur, and Ranakpur",
      "All toll taxes, fuel charges, state permits, parking & driver allowances"
    ],
    exclusions: [
      "International airfare",
      "Monument entry fees & camera charges",
      "Lunches & dinners at hotels (except Ranthambore)",
      "Tipping to driver, guides & naturalists"
    ],
    faqs: [
      {
        q: "Does this Luxury Collection tour include immediate check-in on Day 1?",
        a: "Yes! A luxury room is pre-blocked for immediate occupancy upon your morning arrival at Delhi International Airport so you can rest without waiting for standard check-in time."
      },
      {
        q: "Are safari permits in Ranthambore guaranteed?",
        a: "Yes, we reserve confirmed 4x4 Open Jeep safari permits along with an expert naturalist guide for all 3 scheduled game drives."
      }
    ],
    isFeatured: true
  },
  {
    slug: "rural-rajasthan-15-days",
    title: "Rural Rajasthan Royal Heritage Expedition (15 Days / 14 Nights)",
    category: "rajasthan",
    subcategory: "rural-rajasthan",
    duration: "15 Days / 14 Nights",
    daysCount: 15,
    nightsCount: 14,
    route: "Delhi • Agra • Fatehpur Sikri • Jaipur • Shahpura • Sardargarh • Goramghat • Udaipur • Ranakpur • Luni • Jodhpur • Jaisalmer • Sam Dunes • Bikaner • Mandawa • Delhi",
    price: "₹82,000",
    priceVal: 82000,
    image: "/images/rural_rajasthan_heritage.jpg",
    description: "An off-the-beaten-track 15-day royal and rural expedition through Rajasthan's hidden palaces and authentic village hamlets. Explore Imperial Delhi, sunrise Tonga ride at Taj Mahal in Agra, ghost city Fatehpur Sikri, Pink City Jaipur with Amber Fort elephant ride & dinner with a traditional family, royal hospitality at 19th-century Shahpura Palace, 17th-century Sardargarh Fort with local train ride through Aravalli tunnels to Goramghat, Lake City Udaipur, 1,444-pillar Ranakpur Jain Temples, rural village walk in Luni Fort, Blue City Jodhpur Mehrangarh Fort, Golden City Jaisalmer fort & Sam sand dunes camel safari, Junagarh Fort in Bikaner, and Shekhawati open-air frescoed havelis in Mandawa.",
    highlights: [
      "Traditional Indian welcome upon arrival at Delhi International Airport & guided Delhi heritage tour",
      "Sunrise visit to the iconic Taj Mahal by Tonga (Horse Carriage) & red sandstone Agra Fort",
      "Enroute visit to Emperor Akbar's 16th-century ghost city Fatehpur Sikri",
      "Amber Fort elephant ascent in Jaipur & exclusive home dinner with a traditional Indian family",
      "Royal hospitality stay at the 19th-century Shahpura Palace set in 45 acres of gardens",
      "Stay at 17th-century Sardargarh Fort & nostalgic local Aravalli train ride to Goramghat tunnels",
      "Romantic Udaipur City Palace, Saheliyon Ki Bari, World's largest Crystal Gallery & Lake Pichola boat cruise",
      "15th-Century Ranakpur Jain Temples with 1,444 uniquely carved marble pillars",
      "Overnight stay at Fort Chanwa Luni & guided evening walk through traditional village hamlets",
      "Cobalt Blue City Jodhpur, colossal Mehrangarh Fort & Sardar Spice Market walk",
      "Golden City Jaisalmer living fort, Patwon Ki Haveli, Gadi Sagar Lake & Sam sand dunes sunset camel safari",
      "Bikaner Junagarh Fort & Shekhawati open-air fresco art havelis tour in Mandawa"
    ],
    overview: "This itinerary takes first time visitors, as well as those who want more, on a journey to explore the most important as well as the lesser known areas of Rajasthan. Travel, slightly off the main tourist track to some lovely palaces and hunting lodges of the erstwhile maharajas. Experience the vast expanses of the Thar Desert to ethereal Lake Palaces; gaze at the unforgettable Taj Mahal; be a guest of the royal family of Sardargarh and Shahpura; enjoy a sumptuous dinner with a traditional family of Jaipur.",
    accommodations: "Handpicked 4-Star & 5-Star Heritage Palaces & Fort Stays in Delhi, Agra, Jaipur, Shahpura Bagh Palace, Sardargarh Fort, Udaipur, Fort Chanwa Luni, Jodhpur, Jaisalmer Golden Fort/Resort, Bikaner Junagarh Fort Hotel, and Mandawa Haveli.",
    transportation: "Private air-conditioned luxury SUV/Sedan with dedicated chauffeur for all 15 days + Local Aravalli train experience (Sardargarh-Goramghat) + Camel safari in Sam dunes.",
    meals: "Daily buffet breakfasts at hotels + Traditional Indian Family Dinner in Jaipur + Welcome Royal dinners at Shahpura & Sardargarh.",
    itinerary: [
      {
        day: "01",
        title: "Day 01 — Arrive Delhi (Traditional Welcome)",
        desc: "Upon arrival at Delhi International Airport in the evening, you are met, greeted and escorted to your hotel with a Traditional Indian welcome. Check into the hotel for overnight stay.",
        highlights: ["Delhi Airport Greeting", "Traditional Welcome", "Hotel Check-in", "Overnight Delhi"]
      },
      {
        day: "02",
        title: "Day 02 — Delhi Sightseeing Tour & Drive to Agra",
        desc: "After breakfast, tour Old Delhi starting at Jama Masjid (India's largest mosque), 300-year-old Chandni Chowk bazaars, Raj Ghat (Mahatma Gandhi memorial), and drive past Red Fort. Drive past Presidential House, Parliament House, and photo stop at India Gate. Early afternoon drive to Mughal capital Agra (200 km / 5 hrs). Check into hotel upon arrival for overnight stay.",
        highlights: ["Jama Masjid Mosque", "Chandni Chowk Market Walk", "Raj Ghat Memorial", "India Gate Photo Stop", "Drive to Agra"]
      },
      {
        day: "03",
        title: "Day 03 — Sunrise Taj Mahal by Tonga, Agra Fort & Drive to Jaipur via Fatehpur Sikri",
        desc: "At sunrise, ride a traditional Tonga (Horse Carriage) to visit the world wonder Taj Mahal (closed Fridays), built by Shah Jahan in white marble. Return to hotel for breakfast, check out, and tour 16th-century Agra Fort citadel. Drive to Jaipur, stopping enroute at Fatehpur Sikri, Emperor Akbar's deserted 16th-century Mughal ghost city (Jama Masjid, Tomb of Sheikh Salim Chisti, Panch Mahal). Arrive in Jaipur; check into hotel for overnight.",
        highlights: ["Sunrise Taj Mahal Tonga Ride", "UNESCO Agra Fort", "Fatehpur Sikri Ghost City", "Salim Chisti Tomb", "Overnight Jaipur"]
      },
      {
        day: "04",
        title: "Day 04 — Amber Fort Elephant Ride, City Palace & Dinner with Indian Family",
        desc: "Morning excursion to Amber Fort with a royal Elephant Ride up the ramparts (subject to availability). Visit Jag Mandir (Hall of Victory). Photo stop at Hawa Mahal (Palace of Winds). Afternoon tour of Maharaja's City Palace (Armoury & Costume Museums) and UNESCO Jantar Mantar stone observatory. In the evening, enjoy an exclusive dinner with a traditional Indian family in Jaipur to interact and learn about age-old customs. Overnight in Jaipur.",
        highlights: ["Amber Fort Elephant Ascent", "Hawa Mahal Photo Stop", "City Palace Armoury Museum", "Dinner with Traditional Indian Family"]
      },
      {
        day: "05",
        title: "Day 05 — Drive to Shahpura Royal Heritage Estate",
        desc: "Check out after breakfast and drive to Shahpura (220 km / 4.5 hrs). Experience traditional personalized hospitality from the royal family of Shahpura at their 19th-century palace estate, set amidst 45 acres of manicured gardens, pastures, and lakes. Afternoon free to refresh and stroll through garden grounds. Overnight at Shahpura Palace.",
        highlights: ["Scenic Countryside Drive", "Shahpura Royal Family Hospitality", "19th-Century Palace Estate", "45-Acre Gardens & Pastures"]
      },
      {
        day: "06",
        title: "Day 06 — Drive to Magnificent 17th-Century Sardargarh Fort",
        desc: "Check out after breakfast and drive to Sardargarh (230 km / 5 hrs). Check into one of Rajasthan's most magnificent fortresses, built in the early 17th century. Spend the afternoon exploring the grand fort ramparts, courtyards, and suites. Enjoy warm royal hospitality with the Sardargarh family in the evening. Overnight at Sardargarh Fort.",
        highlights: ["Drive to Sardargarh", "17th-Century Fort Stay", "Fort Ramparts Exploration", "Sardargarh Family Hospitality"]
      },
      {
        day: "07",
        title: "Day 07 — Local Aravalli Train Ride to Goramghat & Rural Artisans",
        desc: "Full day of personalized rural activities. Experience a nostalgic ride on the local meter-gauge train with villagers into the Aravalli ranges, passing through British-era tunnels to Goramghat. Feed monkeys, visit mountain temples, and enjoy panoramic forest views. Optional visits to local artisan workshops, craft markets, and Seem Ka Magra forest reserve. Overnight at Sardargarh Fort.",
        highlights: ["Aravalli Local Meter-Gauge Train", "British-Era Tunnels to Goramghat", "Monkey Feeding & Mountain Shrines", "Rural Artisans & Handicrafts"]
      },
      {
        day: "08",
        title: "Day 08 — Drive to Udaipur, City Palace & Lake Pichola Boat Cruise",
        desc: "Check out after breakfast and drive to Lake City Udaipur (94 km / 2 hrs). Afternoon tour of Udaipur City Palace (Suraj Gokhada, Mor Chowk peacock courtyard, Zenana Mahal), Jagdish Temple, and Saheliyon Ki Bari ('Garden of Maids'). Visit World's largest Crystal Gallery at Fateh Prakash Palace (featuring sole crystal bed). Late afternoon boat cruise on Lake Pichola past Jag Mandir Island Palace. Overnight in Udaipur.",
        highlights: ["Udaipur City Palace Museum", "World's Only Crystal Bed", "Saheliyon Ki Bari", "Lake Pichola Sunset Boat Cruise"]
      },
      {
        day: "09",
        title: "Day 09 — Ranakpur 1,444 Marble Pillars & Rural Luni Village Walk",
        desc: "After breakfast, drive to Luni (270 km / 5 hrs). Enroute visit 15th-century Ranakpur Jain Temples, supported by 1,444 uniquely carved marble pillars and single-stone 108-headed snake carving. Continue drive to Luni; check into Fort Chanwa Luni heritage hotel. In the evening, take a guided village walk for a firsthand experience of rural Rajasthani life, pottery, and blacksmith traditions. Overnight at Fort Chanwa Luni.",
        highlights: ["Ranakpur 1,444 Marble Pillar Temples", "Single-Stone 108 Snake Head Carving", "Fort Chanwa Luni Check-in", "Rural Luni Village Walk"]
      },
      {
        day: "10",
        title: "Day 10 — Drive to Jodhpur, Mehrangarh Fort & Spice Market Walk",
        desc: "Check out after breakfast and short drive to Blue City Jodhpur (40 km / 1 hr). Afternoon tour of Mehrangarh Fort, towering above a 10 km wall (exquisite lattice, mirror work, miniature paintings, gilded palanquins, and solid silver Mughal howdahs). Visit Jaswant Thada white marble royal cenotaphs, and walk through Clock Tower & Sardar Spice Market. Overnight in Jodhpur.",
        highlights: ["Mehrangarh Fort Palaces & Museum", "Silver Mughal Howdah Collection", "Jaswant Thada Royal Cenotaphs", "Clock Tower Spice Market Walk"]
      },
      {
        day: "11",
        title: "Day 11 — Drive to Medieval Desert Fortress City Jaisalmer",
        desc: "Check out after breakfast and drive across Thar Desert to golden medieval city Jaisalmer (300 km / 6 hrs). Check into hotel upon arrival. Rest of the day at leisure to relax or take an evening stroll along golden market lanes. Overnight in Jaisalmer.",
        highlights: ["Thar Desert Highway Drive", "Golden City Jaisalmer Arrival", "Evening Bazaars Walk", "Overnight Jaisalmer"]
      },
      {
        day: "12",
        title: "Day 12 — Sonar Quila Living Fort, Carved Havelis & Sam Dunes Camel Safari",
        desc: "After breakfast, guided walking tour of Jaisalmer Fort ('Sonar Quila' or Golden Fort), decorated with delicate jali lattice screens and 12th-16th century Jain temples. Visit Patwon-ki-Haveli, Nathmalji-ki-Haveli, Salim Singh-ki-Haveli, and Gadi Sagar Lake shrines. Late afternoon excursion to Sam Sand Dunes (45 km away) for a sunset camel safari across wind-patterned desert dunes. Overnight in Jaisalmer.",
        highlights: ["UNESCO Sonar Quila Golden Fort", "Patwon & Nathmal Carved Havelis", "Gadi Sagar Oasis Lake", "Sam Sand Dunes Sunset Camel Safari"]
      },
      {
        day: "13",
        title: "Day 13 — Drive to Bikaner & Tour Junagarh Fort",
        desc: "After breakfast, drive to desert kingdom Bikaner (330 km / 6 hrs). Check into hotel upon arrival. Afternoon tour of 16th-century Junagarh Fort built by Raja Rai Singh (red sandstone outer walls, moat, Badal Mahal blue cloud walls depicting Lord Krishna, and Lal Niwas red-and-gold palace). Overnight in Bikaner.",
        highlights: ["Drive to Bikaner", "Junagarh Fort Moat & Palaces", "Badal Mahal Krishna Murals", "Lal Niwas Red & Gold Chambers"]
      },
      {
        day: "14",
        title: "Day 14 — Drive to Shekhawati & Tour Mandawa Open-Air Frescoed Havelis",
        desc: "After breakfast, drive to Mandawa (180 km / 4 hrs) in the Shekhawati region, known as the 'Open-Air Art Gallery of Rajasthan'. Check into heritage haveli hotel. Afternoon walking tour of Mandawa town, visiting richly frescoed havelis built by 18th-19th century Marwari traders, featuring inside and outside wall paintings. Overnight in Mandawa.",
        highlights: ["Drive to Shekhawati Region", "Mandawa Open-Air Art Gallery", "Profusely Frescoed Haveli Murals", "Heritage Village Stroll"]
      },
      {
        day: "15",
        title: "Day 15 — Drive to Delhi Airport for Onward Flight",
        desc: "Morning at leisure in Mandawa. In time, check out and drive back to New Delhi (320 km / 6 hrs). Private chauffeur transfer to Delhi International Airport (DEL) for your onward flight home. Tour service ends.",
        highlights: ["Morning Leisure in Mandawa", "Highway Drive to Delhi", "Airport Transfer (DEL)", "End of Rural Rajasthan Expedition"]
      }
    ],
    inclusions: [
      "14 Nights accommodation in handpicked 4-Star & 5-Star Heritage Palaces, Forts & Desert Hotels (Shahpura Palace, Sardargarh Fort, Fort Chanwa Luni, Mandawa Haveli)",
      "Daily buffet breakfasts at all hotels + Dinner with Traditional Indian Family in Jaipur + Royal Welcome Dinners at Shahpura & Sardargarh",
      "Dedicated private AC vehicle (Sedan/SUV) with professional chauffeur for all 15 days (tolls, fuel, driver allowance included)",
      "Sunrise Tonga (Horse Carriage) ride at Taj Mahal in Agra",
      "Royal Elephant ride at Amber Fort, Jaipur (subject to availability)",
      "Nostalgic local meter-gauge train ride through Aravalli tunnels to Goramghat",
      "Guided rural village walks in Luni and Mandawa",
      "Private boat cruise on Lake Pichola in Udaipur",
      "Sunset Camel Safari at Sam Sand Dunes in Jaisalmer",
      "Government authorized English-speaking local tour guides at all major cities & monuments"
    ],
    exclusions: [
      "Domestic or international airfare",
      "Monument entry fees & camera charges",
      "Lunches & dinners at hotels (except specified included dinners)",
      "Tipping to drivers and guides"
    ],
    faqs: [
      {
        q: "What makes this Rural Rajasthan tour unique compared to standard tourist circuits?",
        a: "This itinerary takes you off the beaten path with stays at historic royal forts (Sardargarh Fort, Shahpura Palace, Fort Chanwa Luni), an authentic local train ride through Aravalli tunnels to Goramghat, a home dinner with a Jaipur family, and rural village walks in Luni and Mandawa."
      },
      {
        q: "Can this 15-day Rural Rajasthan tour be customized?",
        a: "Yes! Real India Journey specializes in 100% tailor-made itineraries. We can adjust dates, hotel choices, or modify destination stays according to your preferences."
      }
    ],
    isFeatured: true
  },
  {
    slug: "deccan-discovery-13-days",
    title: "Deccan Discovery Grand Circuit (13 Days / 12 Nights)",
    category: "south-india",
    subcategory: "deccan-discovery",
    duration: "13 Days / 12 Nights",
    daysCount: 13,
    nightsCount: 12,
    route: "Hyderabad • Bidar • Sholapur • Bijapur • Badami • Aihole • Pattadakal • Hospet • Hampi • Hassan • Belur • Halebid • Coorg • Mysore • Srirangapatna • Bangalore",
    price: "₹72,000",
    priceVal: 72000,
    image: "/images/hampi_deccan_ruins.jpg",
    description: "An off-the-beaten-track 13-day grand expedition across the Deccan Plateau and South India's historic kingdoms: Hyderabad's Golconda Fort & Charminar, Bahmani capital Bidar Fort & Rangin Mahal, Adil Shahi Bijapur with the world's second-largest dome Gol Gumbaz, 6th-century Chalukyan rock-cut cave temples of Badami, Aihole & UNESCO Pattadakal, an entire day at UNESCO World Heritage Hampi (Vijayanagara Empire capital), 12th-century Hoysala carved temples at Belur & Halebid, coffee & spice hill retreat of Coorg, Tibetan settlement at Bylakuppe, Mysore Palace & Chamundi Hill, Srirangapatna Tipu Sultan fortress, and Silicon Valley Bangalore.",
    highlights: [
      "Traditional Indian welcome upon arrival in IT Hub & Pearl City Hyderabad",
      "Golconda Fort, iconic Charminar, Salar Jung Museum & Laad Bazaar pearl/bangles market",
      "Bidar Fort ramparts, Rangin Mahal wood carvings & Bahmani dynasty royal tombs",
      "Bijapur tour: Adil Shahi Gagan Mahal, Sat Manzil, and colossal Gol Gumbaz (2nd largest dome in world)",
      "6th-century Chalukyan sandstone rock-cut Cave Temples of Badami & Bhutanatha Lake",
      "Intricate 6th-century temple clusters of Aihole & UNESCO World Heritage Site Pattadakal",
      "Full day exploring UNESCO World Heritage ruins of Hampi (Vijayanagara Empire capital)",
      "Exquisite 12th-century Hoysala star-shaped temples of Belur (Chennakeshava) & Halebid (Hoysaleswara)",
      "Tranquil Western Ghats hill station Coorg (Kodagu) with coffee, cardamom plantations & Kodava culture",
      "Bylakuppe Tibetan refugee settlement & Namdroling Monastery ('Golden Temple')",
      "Royal City Mysore: Tipu Sultan's Summer Palace, Chamundi Hill, Somnathpur & Devaraja Market",
      "Enroute visit to Srirangapatna island fortress & drop-off at Bangalore International Airport (BLR)"
    ],
    overview: "Slightly off the beaten track, this tour is for someone who has already been to India and seen some of its varied sights and now wants to explore further. The journey starts in Hyderabad with a visit to the imposing Golconda Fort and takes one to Bijapur to marvel over one of the largest domes in the world of the Gol Gumbad. See the beautiful tomb of Ibrahim Roza, the intricate temples at Aihole and Pattadakal - a World Heritage site. Spend an entire day at the exceptional ruins of the Vijayanagar empire at Hampi, also a World Heritage site. Finally enjoy the misty hills, lush forests, acres and acres of tea and coffee plantations of Coorg.",
    accommodations: "Handpicked 4-Star & 5-Star Heritage Hotels & Hill Resorts in Hyderabad, Sholapur, Bijapur, Badami, Hospet (Hampi), Hassan, Coorg (Kodagu), Mysore, and Bangalore.",
    transportation: "Private air-conditioned luxury SUV/Sedan with dedicated chauffeur for all 13 days (tolls, fuel, driver allowance included).",
    meals: "Daily buffet breakfasts at all hotels included.",
    itinerary: [
      {
        day: "01",
        title: "Day 01 — Arrive Hyderabad (Pearl City Welcome)",
        desc: "Arrive at Hyderabad, India's IT Hub and historic Pearl City. Met, greeted with a traditional Indian welcome at the airport and escorted to your hotel for overnight stay.",
        highlights: ["Hyderabad Airport Greeting", "Traditional Welcome", "Hotel Check-in", "Overnight Hyderabad"]
      },
      {
        day: "02",
        title: "Day 02 — Golconda Fort, Charminar, Salar Jung Museum & Laad Bazaar",
        desc: "Morning visit to Golconda Fort ('Shepherd's Hill'), famous for its acoustics and ingenious water supply system. Afternoon visit to Charminar (built 1591 by Quli Qutb Shah), Salar Jung Museum (world's largest one-man antique collection by Salar Jung III), and Laad Bazaar shopping streets for traditional bangles and pearls. Overnight in Hyderabad.",
        highlights: ["Golconda Fort Acoustics", "Charminar Monument", "Salar Jung Museum", "Laad Bazaar Pearl Market"]
      },
      {
        day: "03",
        title: "Day 03 — Bidar Fort, Rangin Mahal & Bahmani Tombs Drive",
        desc: "Morning drive to Bidar to visit 15th-century Bidar Fort (Bahmani dynasty stronghold, Rangin Mahal wood carvings & glazed tile mosaics) and Bahmani royal tombs. Continue drive to Sholapur; check into hotel for overnight stay.",
        highlights: ["15th-Century Bidar Fort", "Rangin Mahal Wood Carvings", "Bahmani Royal Tombs", "Overnight Sholapur"]
      },
      {
        day: "04",
        title: "Day 04 — Fortified Capital Bijapur & Gol Gumbaz (World's 2nd Largest Dome)",
        desc: "Early morning drive to Bijapur, capital of Adil Shahi kings (1489-1686). Afternoon tour of Gagan Mahal, Sat Manzil palace, Jala Manzil water pavilion, and Gol Gumbaz (tomb of Mohammed Adil Shah, featuring the second largest dome in the world after St. Peter's in Rome, with a famous whispering gallery). Overnight in Bijapur.",
        highlights: ["Gol Gumbaz Whispering Gallery", "Adil Shahi Citadel", "Gagan Mahal Palace", "Overnight Bijapur"]
      },
      {
        day: "05",
        title: "Day 05 — Drive to Chalukya Capital Badami & 6th-Century Cave Temples",
        desc: "Morning drive to Badami, ancient capital of the Chalukyas. Afternoon tour of 6th-7th century rock-cut Cave Temples cut into sandstone hills (featuring 18-armed Nataraja Shiva striking 81 poses, and Cave 4 Jain Tirthankara Mahavira shrine). Visit Bhutanatha Temples on the shores of sacred Agastya Lake and Nagamma serpent shrine. Overnight in Badami.",
        highlights: ["Badami Sandstone Cave Temples", "18-Armed Nataraja Shiva Sculpture", "Jain Tirthankara Cave 4", "Bhutanatha Lake Shrines"]
      },
      {
        day: "06",
        title: "Day 06 — Aihole Temple Clusters, UNESCO Pattadakal & Drive to Hospet",
        desc: "After breakfast, drive to Hospet. Enroute visit Aihole (cradle of Indian temple architecture, with over 100 6th-century carved temples along Malaprabha river). Continue to UNESCO World Heritage Site Pattadakal (featuring 10 magnificent 7th-8th century Dravidian & Nagara style temples). Arrive in Hospet; check into hotel for overnight.",
        highlights: ["Aihole 6th-Century Temple Complex", "UNESCO World Heritage Pattadakal", "Chalukyan Dravidian Architecture", "Overnight Hospet"]
      },
      {
        day: "07",
        title: "Day 07 — Full Day UNESCO World Heritage Ruins of Hampi",
        desc: "After breakfast, spend the entire day exploring UNESCO World Heritage Site Hampi (15 km from Hospet), capital of the 16th-century Vijayanagara Empire. Tour Virupaksha Temple, Vittala Temple stone chariot & musical pillars, Elephant Stables, Lotus Mahal, Royal Enclosure, and boulder-strewn Tungabhadra river landscape. Overnight in Hospet.",
        highlights: ["UNESCO Hampi Vijayanagara Empire", "Vittala Temple Stone Chariot", "Musical Pillars", "Virupaksha Temple & Lotus Mahal"]
      },
      {
        day: "08",
        title: "Day 08 — Scenic Drive Across Karnataka Countryside to Hassan",
        desc: "After breakfast, drive south across the Karnataka plateau to Hassan. Enjoy scenic rural countryside landscapes during the drive. Arrive in Hassan; check into hotel. Rest of the evening at leisure to unwind and relax. Overnight in Hassan.",
        highlights: ["Scenic Karnataka Drive", "Hassan Arrival", "Evening at Leisure", "Overnight Hassan"]
      },
      {
        day: "09",
        title: "Day 09 — 12th-Century Hoysala Temples (Belur & Halebid) & Drive to Coorg",
        desc: "After breakfast, visit 12th-century Hoysala star-shaped temples: Chennakeshava Temple at Belur ('Dakshin Varanasi', took 103 years to build with intricate soapstone friezes) and twin Hoysaleswara Temple at Halebid. Afternoon drive up to green verdant hill station Coorg (Kodagu) in Western Ghats. Check into hill resort for overnight.",
        highlights: ["Belur Chennakeshava Hoysala Temple", "Halebid Hoysaleswara Twin Temples", "Intricate Soapstone Carvings", "Drive to Coorg Hills"]
      },
      {
        day: "10",
        title: "Day 10 — Coorg Coffee & Spice Plantations Exploration",
        desc: "Full day at leisure to explore the tranquil hill surroundings of Coorg. Discover coffee estates, cardamom & pepper plantations, lush paddy fields, and learn about the unique martial Kodava heritage and culture. Optional visits to Abbey Falls and Raja's Seat sunset point. Overnight in Coorg.",
        highlights: ["Coffee & Cardamom Plantation Walks", "Kodava Cultural Heritage", "Crisp Western Ghats Air", "Abbey Falls & Hills View"]
      },
      {
        day: "11",
        title: "Day 11 — Bylakuppe Tibetan Settlement, Namdroling Monastery & Drive to Mysore",
        desc: "After breakfast, drive towards Mysore. Enroute visit Bylakuppe Tibetan Settlement, home to thousands of Tibetan refugees. Tour Namdroling Monastery ('Golden Temple'), marvel at 40-ft gilded Buddha statues, and interact with monks. Continue drive to Royal City Mysore; check into hotel for overnight.",
        highlights: ["Bylakuppe Tibetan Settlement", "Namdroling Golden Temple", "40-ft Gilded Buddha Statues", "Drive to Royal Mysore"]
      },
      {
        day: "12",
        title: "Day 12 — Mysore Palace, Chamundi Hill, Somnathpur & Bazaars",
        desc: "Full day tour of Mysore: visit Indo-Saracenic Maharajah's Mysore Palace, drive up Chamundi Hill to visit Chamundeshwari Temple & giant Nandi Bull statue, visit 13th-century Hoysala Keshava Temple at Somnathpur, and stroll through Devaraja vegetable, flower & incense bazaar. Overnight in Mysore.",
        highlights: ["Maharajah's Mysore Palace", "Chamundi Hill & Nandi Monolith", "Somnathpur Hoysala Keshava Temple", "Devaraja Flower & Spice Market"]
      },
      {
        day: "13",
        title: "Day 13 — Drive to Bangalore via Srirangapatna & International Airport Drop-off",
        desc: "Check out after breakfast and drive to Bangalore (Bengaluru). Enroute stop at Srirangapatna island fortress, capital of Tipu Sultan ('Tiger of Mysore'), to visit Daria Daulat Bagh summer palace and Gumbaz mausoleum. Continue to Bangalore International Airport (BLR) for your onward flight. Tour service ends.",
        highlights: ["Srirangapatna Tipu Sultan Fort", "Daria Daulat Summer Palace", "Bangalore Garden City Drive", "Airport Drop-off (BLR)"]
      }
    ],
    inclusions: [
      "12 Nights accommodation in handpicked 4-Star & 5-Star Heritage Hotels & Hill Resorts (Hyderabad, Sholapur, Bijapur, Badami, Hospet, Hassan, Coorg, Mysore)",
      "Daily buffet breakfasts at all hotels",
      "Dedicated private AC vehicle (SUV/Sedan) with professional chauffeur for all 13 days (tolls, fuel, state permits & driver allowance included)",
      "Full day guided tour of UNESCO World Heritage Site Hampi",
      "Excursion to Belur, Halebid, Aihole, Badami Caves & UNESCO Pattadakal",
      "Excursion to Bylakuppe Tibetan Golden Temple",
      "Government authorized English-speaking local tour guides at all major cities & monuments"
    ],
    exclusions: [
      "Domestic or international airfare",
      "Monument entry fees & camera charges",
      "Lunches & dinners",
      "Tipping to drivers and guides"
    ],
    faqs: [
      {
        q: "What UNESCO World Heritage Sites are included in this Deccan Discovery tour?",
        a: "This package includes 3 UNESCO World Heritage Sites: Pattadakal 7th-century Chalukyan Temples, Hampi Vijayanagara Empire ruins, and Western Ghats mountain landscape around Coorg."
      },
      {
        q: "Can this 13-day Deccan Discovery itinerary be customized?",
        a: "Yes! Real India Journey specializes in 100% tailor-made itineraries. We can adjust dates, hotel choices, or add stay in Bangalore."
      }
    ],
    isFeatured: true
  },
  {
    slug: "best-of-bhutan-and-india-12-days",
    title: "Best of Bhutan & India Himalayan Odyssey (12 Days / 11 Nights)",
    category: "family-bhutan-nepal",
    subcategory: "bhutan-india-expedition",
    duration: "12 Days / 11 Nights",
    daysCount: 12,
    nightsCount: 11,
    route: "Kolkata • Bagdogra • Darjeeling • Tiger Hill • Kalimpong • Gangtok • Rumtek • Phuentsholing • Thimphu • Dochu-La Pass • Punakha • Wangduephodrang • Paro • Taktsang Tiger's Nest",
    price: "₹92,000",
    priceVal: 92000,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    description: "An extraordinary 12-day cross-border Himalayan expedition combining colonial Kolkata, tea gardens of Darjeeling with Mt. Kanchenjunga sunrise from Tiger Hill, UNESCO Heritage Toy Train, orchid nurseries of Kalimpong, Sikkimese monasteries of Gangtok & Rumtek, border crossing into the Land of the Thunder Dragon (Bhutan), Thimphu Trashichhodzong & National Memorial Chorten, 10,130-ft Dochu-La Pass, 17th-century Punakha Dzong, and Paro Taktsang Tiger's Nest cliffside monastery.",
    highlights: [
      "Airport reception & colonial heritage welcome in Kolkata along Hooghly River",
      "Scenic flight past Mt. Kanchenjunga to Bagdogra & mountain drive up to Darjeeling",
      "Sunrise at Tiger Hill over Mt. Kanchenjunga & Mt. Everest + Ghoom Monastery & Himalayan Mountaineering Institute",
      "UNESCO World Heritage Darjeeling Himalayan Railway Toy Train ride & Tibetan Self Help Center",
      "Drive to Kalimpong flower & orchid nurseries, 1692 AD Thongsa Gompa & Tharpa Choling Monastery",
      "Drive to Sikkimese capital Gangtok: Do-Drul Chorten, Enchey Monastery, Tibetology Institute & Rumtek Monastery",
      "Cross international border to Phuentsholing (Bhutan), Zangtho Pelri Lhakhang & Kharbandi Gompa",
      "Capital city Thimphu: National Memorial Chorten, Trashichhodzong Fortress, Textile & Folk Heritage Museums",
      "Cross 10,130-ft Dochu-La Pass with 108 Chortens & panoramic views of eastern Himalayan peaks",
      "Punakha Dzong at river confluence, Khamsum Yulley Namgyel Chorten & Wangduephodrang Dzong",
      "Paro Ta Dzong National Museum, Rinpung Dzong, 17th-century Drukgyel Dzong & Kyichu Lhakhang",
      "Trek to iconic Taktsang Monastery ('Tiger's Nest') perched on a 900-meter sheer cliff"
    ],
    overview: "Best of Bhutan & India offers an immersive 12-day Himalayan journey across the tea-clad hills of West Bengal, sacred monasteries of Sikkim, and the pristine mountain Kingdom of Bhutan. Experience the majestic sunrise over Kanchenjunga and Mt. Everest, ride the famous Darjeeling Toy Train, explore ancient Sikkimese gompas, cross into Bhutan to behold 17th-century Dzongs, and hike to the legendary Tiger's Nest monastery perched on a sheer cliff in Paro.",
    accommodations: "Handpicked 4-Star & 5-Star Heritage Hotels & Boutique Lodges in Kolkata, Darjeeling, Kalimpong, Gangtok, Phuentsholing, Thimphu, Punakha, and Paro.",
    transportation: "Domestic flight (Kolkata to Bagdogra) + Private AC SUV/Sedan for India sector + Bhutanese tourist vehicle with dedicated guide & driver + UNESCO Darjeeling Toy Train ride.",
    meals: "Daily buffet breakfasts at hotels in India + All meals (Breakfast, Lunch & Dinner) included during stay in Bhutan (Phuentsholing, Thimphu, Punakha, Paro).",
    itinerary: [
      {
        day: "01",
        title: "Day 01 — Arrive Kolkata (Capital of West Bengal)",
        desc: "Upon arrival at Kolkata Airport, met and transferred to hotel. Kolkata, former headquarters of the East India Company along the Hooghly River, boasts a rich 300-year history. Overnight at hotel in Kolkata.",
        highlights: ["Kolkata Airport Greeting", "Hooghly River City Heritage", "Hotel Transfer", "Overnight Kolkata"]
      },
      {
        day: "02",
        title: "Day 02 — Flight to Bagdogra & Mountain Drive to Darjeeling",
        desc: "Leisurely breakfast at hotel, transfer to airport for a short scenic flight to Bagdogra with views of Kanchenjunga ranges. Met upon arrival and proceed on a 4-hour mountain drive to Darjeeling (2,134 m elevation), surrounded by world-famous tea gardens ('Champagne of the East'). Check into hotel upon arrival for overnight stay.",
        highlights: ["Flight to Bagdogra", "Himalayan Foothills Drive", "Darjeeling Tea Garden Views", "Hotel Check-in"]
      },
      {
        day: "03",
        title: "Day 03 — Tiger Hill Sunrise (Mt. Kanchenjunga & Everest), Ghoom Monastery & Toy Train",
        desc: "Early morning drive to Tiger Hill for a spectacular sunrise over Mt. Kanchenjunga (world's 3rd highest peak) and views of Mt. Everest. Return for breakfast. Visit 1850 AD Ghoom Monastery (Maitreya Buddha statue), Himalayan Mountaineering Institute, and Tibetan Refugee Self Help Center (carpet weaving & wood carvings). Enjoy a ride on the UNESCO World Heritage Darjeeling Himalayan Railway Toy Train back to hotel. Overnight in Darjeeling.",
        highlights: ["Tiger Hill Kanchenjunga Sunrise", "Mt. Everest Distant View", "1850 Ghoom Monastery", "UNESCO Darjeeling Toy Train"]
      },
      {
        day: "04",
        title: "Day 04 — Drive to Kalimpong, Monasteries & Flower Nurseries",
        desc: "After breakfast, drive to Kalimpong (1,250 m elevation / 70 km / 3 hrs), known for moderate climate and vibrant flower nurseries. Check into hotel. Afternoon visit to Tharpa Choling Gompa (Gelugpa order), 1692 AD Thongsa Gompa (oldest Bhutanese monastery), and flower nurseries exporting orchids and gladiolas. Overnight in Kalimpong.",
        highlights: ["Drive to Kalimpong", "Tharpa Choling Tibetan Monastery", "1692 Thongsa Bhutanese Gompa", "Orchid & Flower Nurseries"]
      },
      {
        day: "05",
        title: "Day 05 — Drive to Gangtok (Sikkim), Tibetology Institute & Rumtek Monastery",
        desc: "After breakfast, drive to Gangtok (1,600 m elevation / 77 km / 3 hrs), capital of Sikkim. Afternoon tour of Do-Drul Chorten stupa (rare Mandalas of Dorje Phurpa), 200-year-old Enchey Monastery, Namgyal Institute of Tibetology (rare Thangkas & icons), and the grand Rumtek Monastery (largest in Sikkim, seat of Kagyu lineage). Overnight in Gangtok.",
        highlights: ["Drive to Sikkimese Capital Gangtok", "Do-Drul Chorten Stupa", "Tibetology Research Institute", "Rumtek Kagyu Monastery"]
      },
      {
        day: "06",
        title: "Day 06 — Scenic Drive into Bhutan & Phuentsholing Border Town",
        desc: "After breakfast, drive 200 km (6 hrs) through lush tea gardens to Phuentsholing, Bhutan's southern border town at the base of Himalayan foothills. Complete border immigration formalities and check into hotel. Evening visit to Zangtho Pelri Lhakhang (heaven of Guru Rinpoche temple) and stroll through local markets. Dinner & overnight at hotel in Phuentsholing.",
        highlights: ["Tea Garden Drive", "International Border Crossing into Bhutan", "Phuentsholing Town Stroll", "Zangtho Pelri Lhakhang"]
      },
      {
        day: "07",
        title: "Day 07 — Drive to Thimphu Capital, Kharbandi Gompa & Simtokha Dzong",
        desc: "After breakfast, drive 180 km (6 hrs) up into the mountains to Thimphu (2,400 m elevation). Enroute visit Kharbandi Gompa monastery built by Royal Grand Mother, and 1627 AD Simtokha Dzong (oldest fortress in Bhutan). Arrive in Thimphu and check into hotel. Dinner & overnight at hotel in Thimphu.",
        highlights: ["Kharbandi Gompa Monastery", "1627 Simtokha Dzong", "Scenic Mountain Highway", "Thimphu Capital Arrival"]
      },
      {
        day: "08",
        title: "Day 08 — Thimphu Memorial Chorten, Trashichhodzong & Folk Heritage Museum",
        desc: "After breakfast, full day tour of Thimphu: visit National Memorial Chorten (built 1974 for world peace) and Trashichhodzong (imposing fortress housing King's throne room and central monk body). Afternoon visit to Textile Museum, Folk Heritage Museum, and Government Handicrafts Emporium (hand-woven textiles & Himalayan books). Dinner & overnight at hotel in Thimphu.",
        highlights: ["National Memorial Chorten", "Trashichhodzong Fortress & Monks", "Textile & Folk Heritage Museum", "Bhutanese Handicrafts Emporium"]
      },
      {
        day: "09",
        title: "Day 09 — Dochu-La Pass (108 Chortens), Punakha Dzong & Wangduephodrang",
        desc: "After breakfast, drive 75 km to Punakha across Dochu-La Pass (10,130 ft), featuring 108 memorial stupas and clear views of eastern Himalayan peaks (Masagang, Gangkar). Arrive in Punakha, check into hotel. Visit majestic 17th-century Punakha Dzong (situated at Pho Chhu & Mo Chhu river confluence), Khamsum Yulley Namgyel Chorten, and Wangduephodrang Dzong & bamboo craft market. Dinner & overnight in Punakha.",
        highlights: ["10,130-ft Dochu-La Pass (108 Stupas)", "Panoramic Himalayan Peak Views", "17th-Century Punakha Dzong", "Wangduephodrang Dzong"]
      },
      {
        day: "10",
        title: "Day 10 — Drive to Paro Valley, Ta Dzong National Museum & Rinpung Dzong",
        desc: "After breakfast, drive 125 km (4.5 hrs) to Paro valley enroute visiting Simtokha Dzong. Arrive in Paro and check into hotel. Afternoon visit to Ta Dzong (17th-century watchtower converted into Bhutan's National Museum) and walk down hillside trail to Rinpung Dzong ('Fortress on a Heap of Jewels'). Dinner & overnight at hotel in Paro.",
        highlights: ["Paro Valley Drive", "Ta Dzong National Museum", "Rinpung Dzong Fortress", "Overnight Paro"]
      },
      {
        day: "11",
        title: "Day 11 — Trek to Taktsang Monastery ('Tiger's Nest') & Kyichu Lhakhang",
        desc: "After breakfast, drive 18 km north to view Drukgyel Dzong ruins and visit a traditional Bhutanese farm house. Embark on a breathtaking 5-hour roundtrip excursion trek up to Taktsang Monastery ('Tiger's Nest'), perched on a sheer 900-meter cliff where Guru Rinpoche meditated. On return walk, visit 7th-century Kyichu Lhakhang, one of Bhutan's oldest sacred shrines. Dinner & overnight in Paro.",
        highlights: ["Taktsang 'Tiger's Nest' Cliffside Monastery Trek", "Guru Rinpoche Meditation Cave", "Drukgyel Dzong Ruins", "7th-Century Kyichu Lhakhang Shrine"]
      },
      {
        day: "12",
        title: "Day 12 — Departure Flight from Paro International Airport (PBH)",
        desc: "Breakfast at hotel. Check out in time and transfer to Paro International Airport (PBH) for your onward flight home. Tour service ends.",
        highlights: ["Hotel Breakfast", "Paro International Airport Transfer", "Departure Assistance", "End of Best of Bhutan & India Expedition"]
      }
    ],
    inclusions: [
      "11 Nights accommodation in handpicked 4-Star & 5-Star Heritage Hotels & Lodges (Kolkata, Darjeeling, Kalimpong, Gangtok, Phuentsholing, Thimphu, Punakha, Paro)",
      "Domestic flight ticket from Kolkata to Bagdogra",
      "Daily buffet breakfasts at hotels in India + All meals (Breakfast, Lunch & Dinner) included during stay in Bhutan",
      "Private AC vehicle in India + Bhutanese private tourist vehicle with dedicated guide & chauffeur in Bhutan",
      "Bhutan Sustainable Development Fee (SDF) & visa processing fees",
      "UNESCO Darjeeling Himalayan Railway Toy Train ride",
      "Taktsang Tiger's Nest monastery trek & permit fees",
      "Government authorized English-speaking local tour guides in India & Bhutan"
    ],
    exclusions: [
      "International airfare (to Kolkata / from Paro)",
      "Monument entry fees & camera charges in India",
      "Lunches & dinners in India (except included Bhutan sector)",
      "Tipping to drivers, guides & trekking horses"
    ],
    faqs: [
      {
        q: "Do I need a visa and Sustainable Development Fee (SDF) for Bhutan?",
        a: "Yes, our team handles all Bhutan entry visas, permits, and Bhutan Sustainable Development Fee (SDF) seamlessly as part of this package."
      },
      {
        q: "How difficult is the trek to Taktsang Tiger's Nest Monastery?",
        a: "The Tiger's Nest trek takes approx. 4 to 5 hours roundtrip at a moderate pace. Horses/ponies are available for rent to carry you halfway up to the cafeteria viewpoint."
      }
    ],
    isFeatured: true
  }
];

const INITIAL_TESTIMONIALS = [
  {
    clientName: "Dr. Alistair & Elena Vance",
    location: "London, United Kingdom",
    tourName: "Golden Triangle Classic Tour (3 Days)",
    rating: 5,
    reviewText: "Real India Journey organized an outstanding tour for us! Our chauffeur Mr. Singh was punctual, polite, and drove so smoothly. Seeing the Taj Mahal at sunrise with our private historian guide was a dream come true. Highly recommended!",
    tourDate: "February 2026",
    status: "approved"
  },
  {
    clientName: "Sarah & David Miller",
    location: "Sydney, Australia",
    tourName: "Same Day Taj Mahal Tour by Car",
    rating: 5,
    reviewText: "We booked the Same Day Agra tour from Delhi via car. Everything was seamless! Picked up right from our hotel lobby at 6 AM, luxury AC Innova Crysta, fantastic 5-star hotel lunch in Agra, and zero hassle at monuments. 10/10 service!",
    tourDate: "January 2026",
    status: "approved"
  },
  {
    clientName: "Charlotte & Oliver Smith",
    location: "New York, United States",
    tourName: "Same Day Agra Tour by Gatimaan Train",
    rating: 5,
    reviewText: "The Gatimaan Express superfast train option was so comfortable! Real India Journey team met us at both Nizamuddin & Agra stations, provided delicious onboard meals, and made us feel extremely safe as solo travelers.",
    tourDate: "December 2025",
    status: "approved"
  },
  {
    clientName: "Hans & Freya Schmidt",
    location: "Munich, Germany",
    tourName: "Rajasthan Royal Forts & Palaces Heritage Tour",
    rating: 5,
    reviewText: "7 days across Jaipur, Jodhpur, Jaisalmer and Udaipur. The camel safari and luxury Swiss tent glamping in Jaisalmer was magical! Excellent vehicle condition, great English-speaking guide. Thank you Real India Journey team!",
    tourDate: "November 2025",
    status: "approved"
  },
  {
    clientName: "Marcus & Chloe Dubois",
    location: "Paris, France",
    tourName: "Golden Triangle & Ranthambore Tiger Safari",
    rating: 5,
    reviewText: "We spotted a majestic Royal Bengal Tiger in Ranthambore Zone 3! Real India Journey made sure all our 4x4 safari permits, luxury jungle resort, and private car transfers were handled impeccably. Truly the premier India tour agency!",
    tourDate: "October 2025",
    status: "approved"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/safare_journeys');
    console.log('[Seed]: Connected to MongoDB...');

    // Seed Admin User
    await User.deleteMany();
    await User.create({
      name: 'Real India Journey Team',
      email: 'admin@realindiajourney.com',
      password: 'admin1234',
      role: 'admin'
    });
    console.log(`[Seed]: Admin Created -> Email: admin@realindiajourney.com | Pass: admin1234`);

    // Seed Packages
    await Package.deleteMany();
    await Package.insertMany(INITIAL_PACKAGES);
    console.log(`[Seed]: ${INITIAL_PACKAGES.length} Tour Packages seeded.`);

    // Seed Categories
    const memoryStore = require('./data/inMemoryStore');
    await Category.deleteMany();
    const categoriesToSeed = (memoryStore.categories || []).map(cat => {
      const { _id, subcategories, ...catData } = cat;
      const cleanedSubs = (subcategories || []).map(sub => {
        const { _id: subId, ...subData } = sub;
        return subData;
      });
      return { ...catData, subcategories: cleanedSubs };
    });
    await Category.insertMany(categoriesToSeed);
    console.log(`[Seed]: ${categoriesToSeed.length} Categories seeded.`);

    // Seed Testimonials
    await Testimonial.deleteMany();
    await Testimonial.insertMany(INITIAL_TESTIMONIALS);
    console.log(`[Seed]: ${INITIAL_TESTIMONIALS.length} Testimonials seeded.`);

    // Seed Settings
    await Setting.deleteMany();
    await Setting.create({
      siteName: "Real India Journey",
      tagline: "Explore Authentic India with Premier Comfort & Royal Hospitality",
      phone: "+91 96496 05100",
      email: "info@realindiajourney.com",
      address: "Plot No - 41, Dev Nagar, Digari Kalan, Jodhpur, Rajasthan 342015",
      whatsapp: "+91 96496 05100",
      heroTitle: "Discover the Magic of India with Real India Journey",
      heroSubtitle: "Government Authorized Tour Operator specializing in Golden Triangle Tours, Same Day Taj Mahal Expeditions, Rajasthan Forts, and Private Car Rentals.",
      statsTravelers: "25,000+",
      statsTours: "2,500+",
      statsRating: "4.9/5",
      statsYears: "15+"
    });
    console.log('[Seed]: Site settings seeded for Real India Journey.');

    console.log('[Seed]: All database records successfully populated!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error]: ${error.message}`);
    process.exit(1);
  }
};

seedData();

