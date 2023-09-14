/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				light: {
					20: "#EAEBEB",
					30: "#D3D4D4",
					60: "#929393",
					80: "#777777",
				},
				primary: {
					10: "#DDEFFC",
					30: "#9ACEF7",
					40: "#78BDF4",
					70: "#138CEC",
					80: "#1078CA",
					100: "#0C5A98",
				},
				secondary: {
					10: "#FEEDDF",
					80: "#F87304",
					100: "#D16104",
				},
				green: {
					10: "#E1F8EB",
					80: "#27AE60",
				},
				yellow: {
					20: "#FCF2D2",
					100: "#DEAB10",
				},
				red: {
					10: "#FCE7E7",
					80: "#E84040",
				},
				dark: {
					40: "#292929",
				},
			},
		},
	},
	plugins: [],
};
