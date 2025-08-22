export const socialLinks = {
  linkedin: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mortgagewithford/",
    icon: "linkedin" as const,
    handle: "@mortgagewithford"
  },
  
  facebook: {
    name: "Facebook", 
    url: "https://www.facebook.com/mortgagewithford",
    icon: "facebook" as const,
    handle: "@mortgagewithford"
  },
  
  instagram: {
    name: "Instagram",
    url: "https://www.instagram.com/mortgage.with.ford/", 
    icon: "instagram" as const,
    handle: "@mortgage.with.ford"
  },
  
  youtube: {
    name: "YouTube",
    url: "https://www.youtube.com/@MortgagewithFord",
    icon: "youtube" as const,
    handle: "@MortgagewithFord"
  },
  
} as const;

// Social media display order for UI components
export const socialOrder = ["linkedin", "facebook", "instagram", "youtube"] as const;