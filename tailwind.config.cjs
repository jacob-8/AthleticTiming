const colors = require('tailwindcss/colors');

const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
			colors: {
				orange: colors.orange,
				primary: {
					light: 'hsl(214, 60%, 33%)',
					DEFAULT: 'hsl(214, 60%, 23%)',
				},
			}
		},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
	],
};

module.exports = config;
