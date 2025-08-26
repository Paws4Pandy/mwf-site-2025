
import type { Config } from "tailwindcss";
import { brandColors } from "./src/lib/design-system";

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
				
				// UNIFIED BRAND COLORS - FROM SINGLE SOURCE: design-system.ts
				'design-black': brandColors.primary.black,
				'design-white': brandColors.primary.white,
				'design-red': brandColors.primary.red,
				'design-gold': '#F7A279',
				'design-green': brandColors.primary.green,
				'design-teal': brandColors.primary.teal,
				'design-azure': brandColors.supporting.azure,
				'design-crimson': brandColors.supporting.crimson,
				'design-brand-red': brandColors.supporting.brandRed,
				'design-gray-orange': brandColors.supporting.grayOrange,
				'design-charcoal': brandColors.supporting.charcoal,
				'design-lilac': brandColors.supporting.lilac,
				'design-sage': brandColors.supporting.sage,
				'design-cream': brandColors.supporting.cream,
				
				// Legacy support - NOW REFERENCES SINGLE SOURCE (use design-* versions instead)
				'pure-black': brandColors.primary.black,
				'pure-white': brandColors.primary.white,
				'muted-red': brandColors.primary.red,
				'light-azure': brandColors.supporting.azure,
				'light-crimson': brandColors.supporting.crimson,
				'brand-red': brandColors.supporting.brandRed,
				'hunter-green': brandColors.primary.green,
				'gray-orange': brandColors.supporting.grayOrange,
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
