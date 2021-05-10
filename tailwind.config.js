const colors = require('tailwindcss/colors')
module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.jsx',
    ],
    theme: {
         extend: {
             colors: {
                 teal: colors.teal
             }
         }
    },
    plugins: [
        require("@tailwindcss/forms"),
    ],
};
