/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				display: ['Playfair Display', 'Georgia', 'serif'],
				sans: ['DM Sans', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				border: '#d4cfbf',
				input: '#e8e5de',
				ring: '#4a7c59',
				background: '#f5f3ed',
				foreground: '#3d2c1f',
				primary: {
					DEFAULT: '#4a7c59',
					foreground: '#f5f3ed',
				},
				secondary: {
					DEFAULT: '#6b9b7a',
					foreground: '#3d2c1f',
				},
				accent: {
					DEFAULT: '#f9a620',
					foreground: '#3d2c1f',
				},
				destructive: {
					DEFAULT: '#b7472a',
					foreground: '#f5f3ed',
				},
				muted: {
					DEFAULT: '#e8e5de',
					foreground: '#6b6b6b',
				},
				popover: {
					DEFAULT: '#ffffff',
					foreground: '#3d2c1f',
				},
				card: {
					DEFAULT: '#ffffff',
					foreground: '#3d2c1f',
				},
				botanical: {
					fern: '#4a7c59',
					marigold: '#f9a620',
					terracotta: '#b7472a',
					cream: '#f5f3ed',
					forest: '#2d4a36',
					moss: '#6b9b7a',
					bark: '#3d2c1f',
					sage: '#9caf88',
					petal: '#fff8f0',
				},
			},
			borderRadius: {
				lg: '1rem',
				md: '0.75rem',
				sm: '0.5rem',
				xl: '1.25rem',
				'2xl': '1.5rem',
			},
			boxShadow: {
				'botanical': '0 4px 20px -2px rgba(74, 124, 89, 0.15)',
				'botanical-lg': '0 8px 30px -4px rgba(74, 124, 89, 0.2)',
				'warm': '0 4px 20px -2px rgba(61, 44, 31, 0.1)',
				'warm-lg': '0 8px 30px -4px rgba(61, 44, 31, 0.15)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'leaf-sway': {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(2deg)' },
				},
				moveHorizontal: {
					"0%": {
						transform: "translateX(-50%) translateY(-10%)",
					},
					"50%": {
						transform: "translateX(50%) translateY(10%)",
					},
					"100%": {
						transform: "translateX(-50%) translateY(-10%)",
					},
				},
				moveInCircle: {
					"0%": {
						transform: "rotate(0deg)",
					},
					"50%": {
						transform: "rotate(180deg)",
					},
					"100%": {
						transform: "rotate(360deg)",
					},
				},
				moveVertical: {
					"0%": {
						transform: "translateY(-50%)",
					},
					"50%": {
						transform: "translateY(50%)",
					},
					"100%": {
						transform: "translateY(-50%)",
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'leaf-sway': 'leaf-sway 3s ease-in-out infinite',
				first: "moveVertical 30s ease infinite",
				second: "moveInCircle 20s reverse infinite",
				third: "moveInCircle 40s linear infinite",
				fourth: "moveHorizontal 40s ease infinite",
				fifth: "moveInCircle 20s ease infinite",
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}