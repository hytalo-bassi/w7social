const colors = require('tailwindcss/colors')
module.exports = {
    purge: {
        enabled: true,
        content: [
            './**/*.html'
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            gray: colors.trueGray,
            red: colors.red,
            blue: colors.lightBlue,
            yellow: colors.amber,
        },
      extend: {},
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss')
    ],
    // corePlugins:{
    //     textColor: true
    // }
  }