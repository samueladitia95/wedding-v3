import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				"ca-orange": "#C25414",
				"ca-creme": "#F0E9D7",
				"ca-brown": "#4C4A44",
				"ca-blue": "#1E51A1",
				"ca-black": "#222222",
			},
			fontFamily: {
				"homemade-apple": ["Homemade Apple", ...defaultTheme.fontFamily.sans],
			},
		},
		container: {
			center: true,
			padding: "2rem",
		},
	},
	plugins: [],
};
