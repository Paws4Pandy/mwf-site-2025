export const ctaButtons = {
  // Primary CTAs
  bookACall: {
    text: "Book a Call",
    url: "https://callme.mortgagewithford.ca",
    type: "primary" as const
  },
  
  startPreApproval: {
    text: "Start my mortgage pre-approval", 
    url: "#", // TODO: Add actual pre-approval link
    type: "primary" as const
  },
  
  // Website CTAs
  mainCharacterMortgage: {
    text: "For millennials and Gen Z in their homeowner era",
    url: "https://www.maincharactermortgage.ca",
    type: "secondary" as const
  },
  
  boringMortgages: {
    text: "Your go-to boring basics for mortgages",
    url: "https://www.boringmortgages.ca",
    type: "secondary" as const
  },
  
  mortgageWithFord: {
    text: "Mortgage with ford site",
    url: "https://www.mortgagewithford.ca",
    type: "secondary" as const
  },
  
  freeStats: {
    text: "Free stats on your home and mortgage monthly",
    url: "https://join.mortgagewithford.ca/",
    type: "secondary" as const
  },
  
  // Form-based CTAs (these will open forms)
  joinOfficeHours: {
    text: "Join live drop-in office hours",
    formType: "officeHours" as const,
    type: "form" as const,
    helpLink: "#what-is-live-drop-in-office-hours"
  },
  
  subscribeUpdates: {
    text: "Subscribe for the latest mortgage industry updates",
    formType: "newsletter" as const, 
    type: "form" as const
  }
} as const;