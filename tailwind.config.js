/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333',
            'h2,h3,h4': {
              color: '#111',
              fontWeight: '600',
            },
            table: {
              width: '100%',
            },
            'thead th': {
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              backgroundColor: '#f9fafb',
            },
            'tbody td': {
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
            },
            'ul > li': {
              paddingLeft: '1.5em',
              position: 'relative',
            },
            'ul > li::before': {
              content: '""',
              width: '0.375em',
              height: '0.375em',
              position: 'absolute',
              top: '0.6875em',
              left: '0.25em',
              borderRadius: '50%',
              backgroundColor: '#d1d5db',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 