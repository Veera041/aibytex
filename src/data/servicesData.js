// src/data/servicesData.js

const servicesData = [
  {
    id: 1,
    icon: "💻",
    title: "Website Development",
    shortDesc: "Modern, responsive, SEO-friendly websites to grow your business.",
    longDesc:
      "We design and develop high-quality, responsive websites using modern technologies. Whether it's a business site, portfolio, landing page, or ecommerce store, we ensure fast performance, clean UI, and SEO optimization.",
    slug: "website-development",
    category: "Development",
    benefits: [
      "Responsive on all devices",
      "Fast loading & clean UI",
      "SEO-friendly structure",
      "Modern, scalable tech stack",
      "30 days free support",
    ],
  },

  {
    id: 2,
    icon: "📱🤖",
    title: "WhatsApp & Telegram Bots",
    shortDesc: "Automate your business with chatbots that reply, send messages, and handle tasks.",
    longDesc:
      "We build automation bots for WhatsApp and Telegram, integrating APIs, webhook systems, and custom workflows. Perfect for businesses to automate customer service, lead capture, reminders, and notifications.",
    slug: "whatsapp-telegram-bots",
    category: "Automation",
    benefits: [
      "Auto-reply messages",
      "Lead collection & notifications",
      "API integration",
      "High delivery rate",
      "Secure & scalable bot setup",
    ],
  },

  {
    id: 3,
    icon: "📊",
    title: "Digital Marketing",
    shortDesc: "Grow your brand with targeted social media and digital marketing strategies.",
    longDesc:
      "We create marketing strategies tailored for your business, including content planning, social media management, paid ads, branding, and performance optimization. Our approach focuses on engagement and conversions.",
    slug: "digital-marketing",
    category: "Marketing",
    benefits: [
      "Brand growth & engagement",
      "Professional content planning",
      "High-conversion strategies",
      "Analytics & performance tracking",
      "Lead generation campaigns",
    ],
  },

  {
    id: 4,
    icon: "🎯",
    title: "Google Ads",
    shortDesc: "Target the right customers with optimized Google Search, Display, and YouTube ads.",
    longDesc:
      "We run Google Ads campaigns that bring high-quality leads at the lowest cost. This includes keyword research, ad copywriting, budget optimization, and monthly reporting for full campaign improvement.",
    slug: "google-ads",
    category: "Advertising",
    benefits: [
      "High-quality targeted leads",
      "Budget optimization",
      "Keyword research",
      "Performance monitoring",
      "Search / Display / YouTube ads",
    ],
  },

  {
    id: 5,
    icon: "📢",
    title: "Meta (Facebook & Instagram) Ads",
    shortDesc: "Increase engagement and conversions with Facebook & Instagram advertising.",
    longDesc:
      "We create and manage Meta ads designed to drive clicks, engagement, and conversions. Includes audience targeting, campaign setup, ad creatives, retargeting, and campaign reporting.",
    slug: "meta-ads",
    category: "Advertising",
    benefits: [
      "Audience targeting",
      "Ad creative design",
      "Retargeting campaigns",
      "High engagement",
      "Monthly reporting",
    ],
  },

  {
    id: 6,
    icon: "🎨",
    title: "Branding & UI Design",
    shortDesc: "Professional brand identity, logo design, UI/UX layouts and social templates.",
    longDesc:
      "Branding services that include logo design, brand identity kits, UI/UX layout design, and social media templates. Perfect for businesses starting fresh or rebranding.",
    slug: "branding-ui-design",
    category: "Design",
    benefits: [
      "Unique brand identity",
      "Professional design assets",
      "UI/UX wireframes & layouts",
      "Consistent brand kit",
      "Social media templates",
    ],
  },

  // NEW: App Development
  {
    id: 7,
    icon: "📱",
    title: "App Development",
    shortDesc: "Native & cross-platform mobile apps (iOS & Android) to reach users on the go.",
    longDesc:
      "We build performant, user-friendly mobile applications — native (Swift/Kotlin) or cross-platform (Flutter/React Native). From concept and UI/UX to publishing on App Store and Play Store, we handle the full lifecycle.",
    slug: "app-development",
    category: "Development",
    benefits: [
      "Native & cross-platform options",
      "App store publishing support",
      "Secure user authentication",
      "Offline capability & performance tuning",
      "Push notifications & analytics",
    ],
  },

  // NEW: Business Analytics & Reporting
  {
    id: 8,
    icon: "📈",
    title: "Business Analytics & Reporting",
    shortDesc: "Turn raw data into actionable insights with dashboards and reports.",
    longDesc:
      "We implement data pipelines, analytics tracking, and interactive dashboards (Power BI, Looker, or custom) to help you understand user behaviour and business performance. Includes KPIs, monthly reports, and conversion optimization recommendations.",
    slug: "business-analytics",
    category: "Analytics",
    benefits: [
      "Custom dashboards & visualizations",
      "KPI definition & tracking",
      "Data pipeline & ETL setup",
      "Monthly performance reports",
      "A/B test insights and recommendations",
    ],
  },

  // NEW: Document Digitization & Data Entry (user papers -> digital records)
  {
    id: 9,
    icon: "🗂️",
    title: "Document Digitization & Data Entry",
    shortDesc: "Scan, clean, and convert user paperwork into secure, searchable digital records.",
    longDesc:
      "We digitize physical documents (ID proofs, name papers, certificates), apply OCR/cleanup, and convert them into structured digital records. Includes manual verification, secure storage setup, and optional data-entry into your system.",
    slug: "document-digitization",
    category: "Data Services",
    benefits: [
      "High-accuracy OCR + manual verification",
      "Secure handling & storage",
      "Structured data export (CSV/Excel/DB)",
      "Name & field validation",
      "Batch processing for large volumes",
    ],
  },
];

export default servicesData;
