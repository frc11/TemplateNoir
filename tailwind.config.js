/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                stone: {
                    950: '#0c0a09',
                },
                noir: '#0c0a09',
                gold: '#d6bda0',
            },
            fontFamily: {
                display: ['Playfair Display', 'serif'],
                cinzel: ['Cinzel', 'serif'],
                body: ['Manrope', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
