// src/data/ServicePlansData.js

const ServicePlansData = {
  "website-development": {
    title: "Website Development",
    description:
      "Responsive, SEO-friendly websites with modern UI using React or HTML.",
    plans: [
      {
        id: "basic",
        name: "Basic Website",
        price: "₹8,999",
        features: [
          "3 Pages",
          "Contact Form",
          "Mobile Responsive",
          "1 Revision"
        ],
        steps: [
          "Requirement collection",
          "UI wireframe design",
          "Website development",
          "Testing & launch"
        ]
      },
      {
        id: "standard",
        name: "Standard Website",
        price: "₹14,999",
        features: [
          "6–8 Pages",
          "SEO Basic Setup",
          "Blog Setup",
          "2 Revisions"
        ],
        steps: [
          "Detailed requirement call",
          "UI/UX design mockup",
          "Frontend development",
          "SEO setup",
          "Deployment"
        ]
      },
      {
        id: "premium",
        name: "Premium Website",
        price: "₹24,999",
        features: [
          "Unlimited Pages",
          "Admin Panel (CMS)",
          "Advanced SEO",
          "3 Months Support"
        ],
        steps: [
          "Brand analysis",
          "Full UI/UX design",
          "Backend + Frontend development",
          "SEO & security setup",
          "Launch + support"
        ]
      }
    ]
  },

  "ui-ux-design": {
    title: "UI/UX Design",
    description: "Clean, modern, user-friendly UI/UX for websites and apps.",
    plans: [
      {
        id: "starter",
        name: "Starter UI Design",
        price: "₹6,499",
        features: ["Landing Page Design", "Prototype", "1 Revision"],
        steps: ["Requirement call", "Wireframe", "Prototype handoff"]
      },
      {
        id: "professional",
        name: "Professional UI Kit",
        price: "₹12,999",
        features: [
          "Multi-page UI",
          "Component Library",
          "Color & Typography Guide"
        ],
        steps: [
          "Research & planning",
          "Wireframes",
          "High-fidelity design",
          "Prototype delivery"
        ]
      }
    ]
  },

  "logo-design": {
    title: "Logo & Branding Design",
    description: "Professional logo with color palette and brand identity.",
    plans: [
      {
        id: "basic",
        name: "Basic Logo",
        price: "₹1,999",
        features: ["1 Logo Concept", "2 Revisions", "PNG + JPG"],
        steps: ["Brand name study", "Logo sketch", "Digital drafting", "Final delivery"]
      },
      {
        id: "premium",
        name: "Premium Branding",
        price: "₹6,999",
        features: [
          "3 Logo Concepts",
          "Brand Colors",
          "Typography Guide",
          "Social Media Kit"
        ],
        steps: [
          "Brand research",
          "Multiple logo concepts",
          "Brand guideline creation",
          "Final handover"
        ]
      }
    ]
  }
};

export default ServicePlansData;
