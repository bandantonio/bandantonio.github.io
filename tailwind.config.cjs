/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: { sans: ['Quicksand', 'system-ui'] },
		screens: {
			'sm': '480px',
			'md': '768px',
			'lg': '976px',
			'xl': '1280px',
		},
		extend: {
			colors: {
				'mg-primary': '#222226',
				'mg-accent': '#FFAD05',
				'mg-green': '#00B865',
				'mg-red': '#FF476F',
				'mg-blue': '#1E96FC'
			},
			animation: {
				wave: 'wave 2s linear infinite',
			},
			keyframes: {
				wave: {
					'0%': { transform: 'rotate(0deg)' },
					'10%': { transform: 'rotate(14deg)' },
					'20%': { transform: 'rotate(-8deg)' },
					'30%': { transform: 'rotate(14deg)' },
					'40%': { transform: 'rotate(-4deg)' },
					'50%': { transform: 'rotate(10deg)' },
					'60%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(0deg)' },
				},
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
