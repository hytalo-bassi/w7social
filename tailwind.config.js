module.exports = {
    purge: {
        enabled: true,
        content: [
            './**/*.html'
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {},
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss')
    ],
  }