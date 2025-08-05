
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
				'league-spartan': ['League Spartan', 'sans-serif'],
				'times-italic': ['Times', '"Times New Roman"', 'serif'],
				'hammersmith': ['Hammersmith One', 'sans-serif'],
				'opensauce': ['Open Sauce One', 'sans-serif'],
				// Legacy fonts (keep for backward compatibility)
				'anton': ['Anton', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				sans: ['Montserrat', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
			},
			colors: {
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
				// New Professional Brand Colors
				'brand-burgundy': '#962547',    // Primary brand color
				'warm-cream': '#efe0df',        // Light backgrounds
				'charcoal': '#1d1b1e',          // Dark text/backgrounds  
				'soft-white': '#fff3f0',        // Off-white backgrounds
				'bronze': '#8c5504',            // Accent color
				'slate-blue': '#35444b',        // Secondary text color
				// Legacy colors (deprecated)
				'pure-black': '#000000',
				'pure-white': '#ffffff', 
				'muted-red': '#8c3839',
				'light-azure': '#cedeeb',
				'light-crimson': '#ffd3db',
				'brand-red': '#da7073',
				'hunter-green': '#2b4743',
				'gray-orange': '#dda83f',
				// Legacy colors (keep for backward compatibility)
				brx: {
					dark: '#2D243B',        // Deep violet
					green: '#2E5D4B',       // Hunter green
					'deep-green': '#1A3C2A', // Darker hunter green
					'emerald': '#2A5541',   // Emerald green (new)
					black: '#14151A',        // Near black
					accent: '#8A5BAF',       // Light violet accent
					cream: '#F7F3E3',        // Cream
					beige: '#E8E3D0',        // Beige/off-white
					white: '#FFFFFF',        // Pure white
				},
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
						transform: 'translateY(-10px)'
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
				'glow': 'glow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
