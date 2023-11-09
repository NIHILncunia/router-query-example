const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [ 'Noto Sans KR', 'sans-serif', ],
        fa: [ 'Font Awesome 5 Free', 'sans-serif', ],
        code: [ 'Cascadia Code', 'sans-serif', ],
      },
      screens: {
        xs: { max: '479px', },
        sm: { min: '480px', max: '767px', },
        md: { min: '768px', max: '1023px', },
        lg: { min: '1024px', },
      },
      borderRadius: {
        0: '0px',
        px: '1px',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },
      colors: {
        'pale-sky': {
          50: '#CDD0D5',
          100: '#C2C5CC',
          200: '#ACB0BA',
          300: '#969BA7',
          400: '#7F8694',
          500: '#6B7280',
          600: '#515761',
          700: '#383C43',
          800: '#1E2024',
          900: '#050506',
        },
        lime: {
          50: '#ffffdb',
          100: '#fdfec9',
          200: '#f8fd99',
          300: '#eff85e',
          400: '#e0ee2d',
          500: '#c2d40e',
          600: '#98aa06',
          700: '#72810a',
          800: '#59650f',
          900: '#4b5611',
        },
        blue: {
          50: '#eff8ff',
          100: '#daeeff',
          200: '#b3deff',
          300: '#91d2ff',
          400: '#5eb8fc',
          500: '#3898f9',
          600: '#227bee',
          700: '#1a64db',
          800: '#1c51b1',
          900: '#1c478c',
        },
        'royal-blue': {
          50: '#eff5ff',
          100: '#dce8fd',
          200: '#c1d7fc',
          300: '#96befa',
          400: '#659bf5',
          500: '#4177f0',
          600: '#2a58e5',
          700: '#2345d2',
          800: '#2239ab',
          900: '#213587',
        },
        'hot-pink': {
          50: '#fef1fa',
          100: '#fee5f7',
          200: '#ffcbf1',
          300: '#ffa1e4',
          400: '#ff70d2',
          500: '#fa3ab8',
          600: '#ea1897',
          700: '#cc0a7a',
          800: '#a80c64',
          900: '#8c0f55',
        },
        black: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#000000',
          base: '#333333',
        },
      },
      animation: {
        'spin-2': 'spin 2s linear infinite',
        'spin-3': 'spin 3s linear infinite',
      },
      fontWeight: {
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900,
      },
      fontSize: {
        small: '1rem',
        normal: '1.2rem',
        h1: '3rem',
        h2: '2.5rem',
        h3: '2.25rem',
        h4: '2rem',
        h5: '1.75rem',
        h6: '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addVariant, }) => {
      addVariant('first', [ '&:first-of-type', ]);
      addVariant('last', [ '&:last-of-type', ]);
      addVariant('not-first', [ '&:not(:first-of-type)', ]);
      addVariant('not-last', [ '&:not(:last-of-type)', ]);
      addVariant('hocus', [ '&:hover', '&:focus', ]);
      addVariant('nth-1', '&:nth-of-type(1)');
      addVariant('nth-2', '&:nth-of-type(2)');
      addVariant('nth-3', '&:nth-of-type(3)');
      addVariant('nth-4', '&:nth-of-type(4)');
      addVariant('nth-5', '&:nth-of-type(5)');
      addVariant('nth-last-1', '&:nth-last-of-type(1)');
      addVariant('nth-last-2', '&:nth-last-of-type(2)');
      addVariant('nth-last-3', '&:nth-last-of-type(3)');
      addVariant('nth-last-4', '&:nth-last-of-type(4)');
      addVariant('nth-last-5', '&:nth-last-of-type(5)');
    }),
  ],
};
