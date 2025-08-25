
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				// UNIFIED FONT SYSTEM - Single Source
				'anton': ['Anton', 'sans-serif'],           // Display/Headings
				'roboto-flex': ['Roboto Flex', 'sans-serif'], // Body/UI
				'sans': ['Roboto Flex', 'sans-serif'],       // Default
			},
			colors: {
				// Shadcn UI Colors (keep for component compatibility)
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				
				// UNIFIED BRAND COLORS - Single Source from design-system.ts
				'design-black': '#000000',      // Primary text
				'design-white': '#ffffff',      // Background  
				'design-red': '#8c3839',        // Primary accent
				'design-gold': '#DAB453',       // Premium CTAs
				'design-green': '#2b4743',      // Hunter green
				'design-azure': '#cedeeb',      // Light backgrounds
				'design-crimson': '#ffd3db',    // Soft accents
				'design-brand-red': '#da7073',  // CTA highlights
				'design-gray-orange': '#dda83f', // Warning
				'design-charcoal': '#423E3A',   // Authoritative text
				'design-lilac': '#A79FC7',      // Sophisticated accent
				'design-sage': '#BBCEC9',       // Supporting backgrounds
				'design-cream': '#EFE0DF',      // Warm background
				
				// Legacy support (use design-* versions instead)
				'pure-black': '#000000',
				'pure-white': '#ffffff', 
				'muted-red': '#8c3839',
				'light-azure': '#cedeeb',
				'light-crimson': '#ffd3db',
				'brand-red': '#da7073',
				'hunter-green': '#2b4743',
				'gray-orange': '#dda83f',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'glow': {
					'0%': {
						textShadow: '0 0 3px rgba(244, 114, 182, 0.7)'
					},
					'50%': {
						textShadow: '0 0 10px rgba(244, 114, 182, 0.9), 0 0 20px rgba(244, 114, 182, 0.4)'
					},
					'100%': {
						textShadow: '0 0 3px rgba(244, 114, 182, 0.7)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-6px)'
					}
				},
				'premium-glow': {
					'0%': {
						boxShadow: '0 4px 14px 0 rgba(218, 180, 83, 0.15), 0 2px 4px 0 rgba(218, 180, 83, 0.1)'
					},
					'100%': {
						boxShadow: '0 8px 32px 0 rgba(218, 180, 83, 0.25), 0 4px 8px 0 rgba(218, 180, 83, 0.15)'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fade-in-delay-1': 'fade-in 0.6s ease-out 0.2s forwards',
				'fade-in-delay-2': 'fade-in 0.6s ease-out 0.4s forwards',
				'fade-in-delay-3': 'fade-in 0.6s ease-out 0.6s forwards',
				'fade-in-delay-4': 'fade-in 0.6s ease-out 0.8s forwards',
				'fade-in-delay-5': 'fade-in 0.6s ease-out 1.0s forwards',
				'fade-in-delay-6': 'fade-in 0.6s ease-out 1.2s forwards',
				'glow': 'glow 3s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'premium-glow': 'premium-glow 0.3s ease-in-out forwards',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			}
		}
	},
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require("tailwindcss-animate")
	],
} satisfies Config;
