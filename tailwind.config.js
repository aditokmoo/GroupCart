/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			height: {
				'custom-screen': 'calc(100vh - 300px)',
				'list-screen': 'calc(100dvh - 182px)'
			},
			backgroundColor: {
				primary: '#FF6347',
				'light-primary': '#fff2ee',
				success: '#1AFF8C',
				'light-success': '#c8f7e0',
				pending: '#FF1A1A',
				'light-pending': '#f2c7c7',
				"light-green": '#2DBAA2'
			},
			colors: {
				primary: {
					DEFAULT: '#FF6347',
					foreground: 'hsl(var(--primary-foreground))'
				},
				success: '#019512',
				pending: '#FF1A1A',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontSize: {
				xs: '1.2rem',
				sm: '1.4rem',
				base: '1.6rem',
				lg: '1.8rem',
				xl: '2rem',
				'2xl': '2.4rem',
				'3xl': '2.8rem',
				'4xl': '3.2rem',
				'5xl': '3.6rem'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
	plugins: [require("tailwindcss-animate")],
}