export interface GuideSection {
  title: string;
  items: string[];
}

export interface Guide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  sections: GuideSection[];
  closingNote: string;
}

export const guidesData: Guide[] = [
  {
    id: 'first-time-buyer',
    title: 'First-Time Buyer Mortgage Checklist',
    subtitle: 'Your Complete Guide to Homeownership in Eastern Ontario',
    description: 'Everything you need to prepare for your first home purchase, from pre-approval to closing day.',
    icon: 'Home',
    sections: [
      {
        title: 'Getting Started',
        items: [
          'Decide your preferred location(s) and must-have home features',
          'Set budget, estimate down payment and ongoing costs',
          'Estimate monthly payment with tax and insurance',
          'Check your credit score and address any issues'
        ]
      },
      {
        title: 'Gather Key Documents',
        items: [
          'Proof of down payment (90-day bank/investment statements, RRSP withdrawal, gift letter)',
          'Government-issued photo ID',
          'Proof of income (pay stubs, employment letter, T4s, Notice of Assessment)',
          'Statements for any other income/support',
          'Void cheque for payment setup'
        ]
      },
      {
        title: 'Professional Guidance',
        items: [
          'Pre-approval with a mortgage agent (Andreina Ford)',
          'Choose trusted Realtor and real estate lawyer',
          'Arrange home inspection, appraisal, and property insurance',
          'Review all contracts and closing documents carefully'
        ]
      },
      {
        title: 'Next Steps',
        items: [
          'Keep your agent informed at every step for personalized advice',
          'Avoid major purchases or job changes before closing',
          'Schedule final walkthrough before closing day',
          'Prepare for moving day and utility transfers'
        ]
      }
    ],
    closingNote: 'Ready to take the first step? Contact Andreina Ford at (613) 743-7866 or hello@mortgagewithford.ca for personalized guidance throughout your home buying journey.'
  },
  {
    id: 'refinance',
    title: 'Refinance Mortgage Checklist',
    subtitle: 'Optimize Your Mortgage for Better Terms',
    description: 'Whether you\'re looking to lower payments, consolidate debt, or access equity, this guide covers everything you need.',
    icon: 'RefreshCw',
    sections: [
      {
        title: 'Preparation',
        items: [
          'Define your financial goals (lower payment, debt consolidation, rate change)',
          'Review recent pay stubs, tax returns (2 years), and account statements',
          'Calculate your current home equity',
          'Research current mortgage rates and trends'
        ]
      },
      {
        title: 'Mortgage & Property Details',
        items: [
          'Current mortgage statement and property tax bill',
          'Updated homeowners insurance',
          'Utility bill for proof of address',
          'Legal property description',
          'Recent property assessment or appraisal'
        ]
      },
      {
        title: 'Additional Documents',
        items: [
          'Marriage/divorce records (if relevant for spousal/child support)',
          'Documentation of current debts, payouts',
          'Void cheque for new payments',
          'Investment statements if using for qualification'
        ]
      },
      {
        title: 'Process',
        items: [
          'Compare offers and terms from multiple lenders',
          'Review prepayment options and penalties',
          'Calculate break-even point for refinancing costs',
          'Meet with Andreina Ford to find the best fit and guide you from application to closing'
        ]
      }
    ],
    closingNote: 'Let\'s explore your refinancing options. Contact Andreina Ford at (613) 743-7866 or hello@mortgagewithford.ca to discuss your goals and find the perfect solution.'
  },
  {
    id: 'reverse-mortgage',
    title: 'Reverse Mortgage Education Checklist',
    subtitle: 'Understanding Your Options for Retirement',
    description: 'Learn about reverse mortgages, eligibility requirements, and how to make an informed decision for your retirement.',
    icon: 'Shield',
    sections: [
      {
        title: 'Eligibility',
        items: [
          'All title holders at least 55 years old',
          'Primary residence in Ontario with substantial equity',
          'Property must be in good condition',
          'Clear title with manageable existing mortgage (if any)'
        ]
      },
      {
        title: 'Get Informed',
        items: [
          'Meet with Andreina Ford for a goal discussion',
          'Property appraisal to determine value/equity',
          'Review tax, insurance, and other ongoing obligations',
          'Understand impact on government benefits',
          'Consider alternatives like HELOC or downsizing'
        ]
      },
      {
        title: 'Documents Needed',
        items: [
          'Proof of age (ID for all owners)',
          'Property tax, insurance, and mortgage/deed records',
          'Utility bill and details of any liens',
          'Income verification (pension statements, investments)',
          'Power of attorney documents if applicable'
        ]
      },
      {
        title: 'Before You Commit',
        items: [
          'Independent legal advice is required',
          'Review the type of reverse mortgage: lump sum, installments, or line of credit',
          'Understand repayment, moving out, and estate effects',
          'Discuss with family members who may be affected',
          'Compare offers from different reverse mortgage providers'
        ]
      }
    ],
    closingNote: 'Considering a reverse mortgage? Get unbiased advice from Andreina Ford at (613) 743-7866 or hello@mortgagewithford.ca to understand all your retirement financing options.'
  },
  {
    id: 'renewal-switching',
    title: 'Mortgage Renewal & Switching Lenders Checklist',
    subtitle: 'Rate Shopping and Renewal Strategies',
    description: 'Don\'t auto-renew! Learn how to negotiate better terms or switch lenders for significant savings.',
    icon: 'TrendingUp',
    sections: [
      {
        title: 'Before Renewal (Start 4-6 months early)',
        items: [
          'Review your lender\'s renewal statement carefully',
          'Compare current rates, incentives, prepayment options',
          'Decide on fixed or variable, new term length, and payment frequency',
          'Consider if a lump-sum payment or debt consolidation is right for you',
          'Check your credit score and address any issues'
        ]
      },
      {
        title: 'If Switching Lenders',
        items: [
          'Gather government ID, current mortgage statement, property tax and insurance',
          'Prepare pay stubs, employment letter, NOAs, and a void cheque',
          'Contact new lenders or a broker to compare offers',
          'Ask about coverage of switching fees (legal, appraisal, discharge)',
          'Understand the new lender\'s prepayment privileges'
        ]
      },
      {
        title: 'Process',
        items: [
          'Submit applications to lenders of choice',
          'Carefully read and understand any new offer before accepting',
          'Negotiate with your current lender using competing offers',
          'Allow 30-45 days for switching process if changing lenders',
          'Work with Andreina Ford to navigate paperwork and pick the best mortgage'
        ]
      },
      {
        title: 'Final Steps',
        items: [
          'Review all terms and conditions before signing',
          'Ensure discharge from old lender is properly handled',
          'Set up automatic payments with new lender',
          'Keep copies of all documentation',
          'Always check back with Andreina Ford for unbiased renewal and switching support'
        ]
      }
    ],
    closingNote: 'Don\'t settle for your renewal offer! Contact Andreina Ford at (613) 743-7866 or hello@mortgagewithford.ca for expert guidance on getting the best available rate and terms.'
  }
];