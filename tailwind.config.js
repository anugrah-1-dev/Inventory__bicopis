import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            colors: {
                'primary': {
                    50: '#eff8ff',
                    100: '#d1e9ff',
                    200: '#b2ddff',
                    300: '#84caff',
                    400: '#53b1fd',
                    500: '#2e90fa',
                    600: '#1570ef',
                    700: '#175cd3',
                    800: '#1849a9',
                    900: '#194185',
                },
            },
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
