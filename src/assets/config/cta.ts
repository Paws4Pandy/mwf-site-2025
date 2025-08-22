export const ctaButtons = {
  // Primary CTAs
  bookACall: {
    text: "Book a Call",
    url: "https://callme.mortgagewithford.ca",
    type: "primary" as const
  },
  
  startPreApproval: {
    text: "Start my mortgage pre-approval", 
    url: "https://andreina-ford.mtg-app.com/signup?brokerName=andreina.ford&brokerId=7208e0a3-3590-47b7-a99d-4704d9c75268",
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
    helpLink: "/faq#office-hours"
  },
  
  subscribeUpdates: {
    text: "Subscribe for the latest mortgage industry updates",
    formType: "newsletter" as const, 
    type: "form" as const
  }
} as const;