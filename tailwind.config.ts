/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                link: {
                    DEFAULT: '#449aff',
                },
                primary: { DEFAULT: '#01745F', light: '#67ac9f' },
                error: {
                    DEFAULT: '#ff3333',
                },
                text: {
                    primary: {
                        DEFAULT: '#222',
                        dark: '#FFFFFF',
                    },
                    secondary: {
                        DEFAULT: '#7a7a7a',
                        dark: '#FFFFFF',
                    },
                },
            },
            animation: {
                progress: 'progress 1s infinite linear',
            },
            keyframes: {
                progress: {
                    '0%': { transform: ' translateX(0) scaleX(0)' },
                    '40%': { transform: 'translateX(0) scaleX(0.4)' },
                    '100%': { transform: 'translateX(100%) scaleX(0.5)' },
                },
            },
            transformOrigin: {
                'left-right': '0% 50%',
            },
        },
    },

    plugins: [],
};
