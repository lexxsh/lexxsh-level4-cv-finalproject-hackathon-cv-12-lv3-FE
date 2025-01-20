const { fontFamily } = require(`tailwindcss/defaultTheme`)
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{html,ts,tsx,js}',
    './node_modules/flowbite/**/*.js',
    './components/**/*.{html,js,jsx,tsx}',
  ],
  important: true,
  // Active dark mode on class basis
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Fira Sans', ...fontFamily.sans],
      },

      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US',
      },
      purge: {
        content: ['./pages/**/*.tsx', './components/**/*.tsx'],
        // These options are passed through directly to PurgeCSS
      },
      spacing: {
        8: '2rem', // 8을 2rem으로 변경
        16: '4rem', // 16을 4rem으로 변경
        64: '16rem', // 64를 16rem으로 추가
        128: '60rem', // 64를 16rem으로 추가
      },
      borderRadius: {
        '2xl': '1.5rem', // 2xl을 1.5rem으로 변경
      },
      backgroundImage: (theme) => ({
        check: "url('/icons/check.svg')",
        landscape: "url('/images/landscape/2.jpg')",
      }),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.current'),
            },
          },
        },
      }),
    },
    plugins: [require('flowbite/plugin')],
    future: {
      purgeLayersByDefault: true,
    },

    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      gray: colors.slate,
      primary: colors.purple,
      secondary: colors.rose,
      tertiary: colors.emerald,
      indigo: {
        100: '#ebf4ff',
        200: '#c3dafe',
        300: '#a3bffa',
        400: '#7f9cf5',
        500: '#667eea',
        600: '#5a67d8', // 여기에 추가
        700: '#4c51bf',
        800: '#434190',
        900: '#3c366b',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
  },
}
