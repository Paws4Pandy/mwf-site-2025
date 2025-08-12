import FirecrawlApp from '@mendable/firecrawl-js';
import type { MortgageRate } from '@/lib/constants/cmhc';

// Get Firecrawl API key from environment
const getFirecrawlApiKey = (): string => {
  // In Vite, environment variables are prefixed with VITE_ for client access
  const viteKey = import.meta.env.VITE_FIRECRAWL_API_KEY;
  const nodeKey = typeof process !== 'undefined' ? process.env?.FIRECRAWL_API_KEY : undefined;
  
  return viteKey || nodeKey || '';
};

// Initialize Firecrawl with API key
const getFirecrawlInstance = () => {
  const apiKey = getFirecrawlApiKey();
  if (!apiKey) {
    console.warn('Firecrawl API key not found. Using default rates only.');
    return null;
  }
  return new FirecrawlApp({ apiKey });
};

// RateHub URL to scrape for mortgage rates
const RATEHUB_URL = 'https://www.ratehub.ca/best-mortgage-rates';

interface RawRateData {
  term: string;
  fixedRate?: string;
  variableRate?: string;
}

export class RatesService {
  private static cachedRates: MortgageRate[] = [];
  private static lastFetch: Date | null = null;
  private static readonly CACHE_DURATION = 1000 * 60 * 60 * 24; // 1 day

  // Default fallback rates (updated August 2025) - ONLY REAL RATES
  // CRITICAL: Only 5-year variable rate exists - all other variable rates are FAKE
  private static readonly DEFAULT_RATES: MortgageRate[] = [
    { term: '1 Year', type: 'Fixed', rate: '6.84%' },
    { term: '2 Year', type: 'Fixed', rate: '5.95%' },
    { term: '3 Year', type: 'Fixed', rate: '5.49%' },
    { term: '4 Year', type: 'Fixed', rate: '5.19%' },
    { term: '5 Year', type: 'Fixed', rate: '4.04%' },
    { term: '6 Year', type: 'Fixed', rate: '4.89%' },
    { term: '10 Year', type: 'Fixed', rate: '5.25%' },
    { term: '5 Year', type: 'Variable', rate: '3.95%' }
  ];

  /**
   * Get current mortgage rates with caching
   */
  static async getRates(forceRefresh = false): Promise<MortgageRate[]> {
    // CLEAR CACHE FIRST
    this.clearCache();
    
    // TEMPORARY: Force using default rates to debug the display issue
    console.log('RatesService: CACHE CLEARED - forcing default rates for debugging');
    console.log('RatesService: Default rates count:', this.DEFAULT_RATES.length);
    console.log('RatesService: All default rates:', this.DEFAULT_RATES);
    return [...this.DEFAULT_RATES]; // Return a fresh copy
    
    // Original logic commented out for debugging
    /*
    // Return cached rates if they're fresh
    if (!forceRefresh && this.isCacheValid()) {
      console.log('RatesService: Using cached rates:', this.cachedRates.length);
      return this.cachedRates.length > 0 ? this.cachedRates : this.DEFAULT_RATES;
    }

    try {
      console.log('Fetching fresh mortgage rates from RateHub...');
      const freshRates = await this.fetchLiveRates();
      console.log('RatesService: Fresh rates received:', freshRates.length, freshRates);
      
      if (freshRates.length > 0) {
        this.cachedRates = freshRates;
        this.lastFetch = new Date();
        console.log('Successfully updated rates from RateHub');
        return freshRates;
      }
    } catch (error) {
      console.warn('Failed to fetch rates from RateHub, using defaults:', error);
    }

    // Fallback to default rates
    console.log('RatesService: Using default rates:', this.DEFAULT_RATES.length, this.DEFAULT_RATES);
    return this.DEFAULT_RATES;
    */
  }

  /**
   * Check if it's time for daily update (12 PM EST Monday-Friday)
   */
  static isUpdateTime(): boolean {
    const now = new Date();
    // Convert to EST (UTC-5, or UTC-4 during daylight saving)
    const estTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    const day = estTime.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
    const hour = estTime.getHours();
    
    // Only update Monday-Friday (1-5) at 12 PM (noon)
    return day >= 1 && day <= 5 && hour >= 12;
  }

  /**
   * Scrape live rates from RateHub
   */
  private static async fetchLiveRates(): Promise<MortgageRate[]> {
    try {
      console.log('Scraping rates from RateHub...');
      const rates = await this.scrapeRateHub();
      
      if (rates.length > 0) {
        console.log(`Successfully scraped ${rates.length} rates from RateHub`);
        return this.processRates(rates);
      }
      
      return [];
    } catch (error) {
      console.warn('Failed to scrape RateHub:', error);
      return [];
    }
  }

  /**
   * Scrape RateHub for mortgage rates
   */
  private static async scrapeRateHub(): Promise<MortgageRate[]> {
    const firecrawl = getFirecrawlInstance();
    
    if (!firecrawl) {
      console.warn('Cannot scrape RateHub - Firecrawl not initialized');
      return [];
    }

    try {
      const scrapeResult = await firecrawl.scrapeUrl(RATEHUB_URL, {
        formats: ['markdown', 'html'],
        onlyMainContent: true,
        waitFor: 3000
      });

      if (!scrapeResult.success || !scrapeResult.markdown) {
        throw new Error(`Failed to scrape RateHub: ${scrapeResult.error || 'No data'}`);
      }

      // Parse rates from the scraped content
      return this.parseRateHubContent(scrapeResult.markdown);
    } catch (error) {
      console.error('Error scraping RateHub:', error);
      return [];
    }
  }

  /**
   * Parse mortgage rates from RateHub content using specific patterns
   */
  private static parseRateHubContent(content: string): MortgageRate[] {
    const rates: MortgageRate[] = [];

    // RateHub best-mortgage-rates specific patterns
    const ratePatterns = [
      // Pattern: "3.95% 5-yr variable" from header link
      /(\d+\.\d+)%\s+(\d+)-yr\s+(variable|fixed)/gi,
      // Pattern: Table format "| 4.04% | Provider | Payment |" (mortgage rate range)
      /\|\s*([3-8]\.\d{2})%\s*\|\s*(?:.*?(?:Bank|Credit|Financial|Lender|Mortgage|CIBC|TD|BMO|Scotia|RBC).*?)\|\s*\$[\d,]+\/mo/gi,
      // Pattern: "5-Year Fixed: 4.79%" or "5 Year Fixed 4.79%"
      /(\d+)(?:\s*-?\s*)?[Yy]ear\s+[Ff]ixed\s*:?\s*(\d+\.\d+)%/gi,
      // Pattern: "5-Year Variable: 5.85%" - ONLY ACCEPT 5-YEAR VARIABLE (others are fake)
      /5(?:\s*-?\s*)?[Yy]ear\s+[Vv]ariable\s*:?\s*(\d+\.\d+)%/gi,
      // Pattern: Best rates table from ratehub.ca/best-mortgage-rates
      /best.*rate.*?(\d+\.\d+)%.*?(\d+)\s*year.*?(fixed|variable)/gi
    ];

    for (let i = 0; i < ratePatterns.length; i++) {
      const pattern = ratePatterns[i];
      let match;
      while ((match = pattern.exec(content)) !== null) {
        let term, rate, type;
        
        if (i === 0) {
          // Pattern: "3.95% 5-yr variable" (rate, term, type)
          rate = `${match[1]}%`;
          term = `${match[2]} Year`;
          type = match[3].toLowerCase() === 'variable' ? 'Variable' as const : 'Fixed' as const;
          
          // CRITICAL: Only allow 5-year variable rates - reject all other variable terms
          if (type === 'Variable' && term !== '5 Year') {
            continue;
          }
        } else if (i === 1) {
          // Pattern: "| 4.04% |" - table format, assume 5-year fixed as default
          rate = `${match[1]}%`;
          term = '5 Year';
          type = 'Fixed' as const;
        } else if (i === 3) {
          // Pattern: "5-Year Variable" - already filtered to 5-year only
          rate = match[1].includes('%') ? match[1] : `${match[1]}%`;
          term = '5 Year';
          type = 'Variable' as const;
        } else if (i === 4) {
          // Pattern: Best rates table (rate, term, type)
          rate = `${match[1]}%`;
          term = `${match[2]} Year`;
          type = match[3].toLowerCase() === 'variable' ? 'Variable' as const : 'Fixed' as const;
          
          // CRITICAL: Only allow 5-year variable rates - reject all other variable terms
          if (type === 'Variable' && term !== '5 Year') {
            continue;
          }
        } else {
          // Other fixed rate patterns: (term, rate) format
          term = `${match[1]} Year`;
          rate = match[2].includes('%') ? match[2] : `${match[2]}%`;
          type = 'Fixed' as const;
        }

        rates.push({ term, type, rate });
      }
    }

    // Remove duplicates and sort
    const uniqueRates = rates.filter((rate, index, self) => 
      self.findIndex(r => r.term === rate.term && r.type === rate.type) === index
    );

    return uniqueRates.sort((a, b) => {
      const termA = parseInt(a.term);
      const termB = parseInt(b.term);
      if (termA !== termB) return termA - termB;
      return a.type === 'Fixed' ? -1 : 1; // Fixed rates first
    });
  }

  /**
   * Process and clean scraped rates
   */
  private static processRates(rawRates: MortgageRate[]): MortgageRate[] {
    if (rawRates.length === 0) return [];

    // Group rates by term and type, take the best (lowest) rate
    const rateMap = new Map<string, MortgageRate>();

    for (const rate of rawRates) {
      const key = `${rate.term}-${rate.type}`;
      const rateValue = parseFloat(rate.rate.replace('%', ''));
      
      if (!rateMap.has(key) || parseFloat(rateMap.get(key)!.rate.replace('%', '')) > rateValue) {
        rateMap.set(key, rate);
      }
    }

    return Array.from(rateMap.values()).sort((a, b) => {
      const termA = parseInt(a.term);
      const termB = parseInt(b.term);
      if (termA !== termB) return termA - termB;
      return a.type === 'Fixed' ? -1 : 1; // Fixed rates first
    });
  }

  /**
   * Check if cached rates are still valid
   */
  private static isCacheValid(): boolean {
    if (!this.lastFetch) return false;
    return Date.now() - this.lastFetch.getTime() < this.CACHE_DURATION;
  }

  /**
   * Clear cached rates (useful for testing)
   */
  static clearCache(): void {
    this.cachedRates = [];
    this.lastFetch = null;
  }

  /**
   * Get a specific rate by term and type
   */
  static async getRate(term: string, type: 'Fixed' | 'Variable'): Promise<string | null> {
    const rates = await this.getRates();
    const rate = rates.find(r => r.term === term && r.type === type);
    return rate ? rate.rate : null;
  }

  /**
   * Get the best 5-year fixed rate (most commonly used for calculations)
   */
  static async getBest5YearFixed(): Promise<number> {
    const rateString = await this.getRate('5 Year', 'Fixed');
    if (rateString) {
      return parseFloat(rateString.replace('%', ''));
    }
    return 4.04; // Fallback rate
  }
}