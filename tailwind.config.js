module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.vue',
        './src/**/*.jsx',
    ],
    theme: {},
    customForms: theme => ({
        default: {
            "input, select, textarea": {
                backgroundColor: theme("colors.gray.50"),
                borderRadius: ".5rem",
                borderWidth: "1px",
                borderColor: theme("colors.gray.300"),

                "&:focus": {
                    boxShadow: theme("boxShadow.md"),
                    borderWidth: "1px",
                    backgroundColor: theme("colors.white"),
                },
            },

            checkbox: {
                "&:focus": {
                    boxShadow: undefined,
                },
            },
        },
    }),
    variants: {},
    plugins: [
        require("@tailwindcss/custom-forms"),
        require("@tailwindcss/ui"),
    ],
};
