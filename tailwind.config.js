/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
export default {
  darkMode: 'selector',
  // ...

  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
    './index.html'
  ],
  theme: {
    fontSize: {
      8:['0.5rem',],
      10: ['0.625rem',], // fontSize: 10px, lineHeight: 12px
      11: ['0.6875rem',], // fontSize: 11px, lineHeight: 12px
      xs: ['0.75rem',],    // fontSize: 12px, lineHeight: 14px
      13:['0.8125rem',],  // fontSize: 13px
      sm: ['0.875rem'],    // fontSize: 14px, lineHeight: 16px
      base: ['1rem',],   // fontSize: 16px, lineHeight: 18px
      18: ['1.125rem',],   // fontSize: 18px, lineHeight: 18px
      lg: ['1.25rem',],  // fontSize: 20px, lineHeight: 22px
      22: ['1.375rem',],  // fontSize: 22px, lineHeight: 22px
      xl: ['1.5rem',],   // fontSize: 24px, lineHeight: 26px
      28: ['1.75rem',]  // fontSize: 28px, lineHeight: 26px
    },
    extend: {
      screens: {
        '3xl': '1920px',
      },
      colors: {
        'kakaoBg': '#B2C7DA',
        'red-500':"#FF453A",
        't-lv0' :'#000000',
        't-lv1' :'#404040',
        't-lv2' :'#7D7C78',
        't-lv3' :'#999999',
        't-lv4' :'#C1C1C1',
        't-lv5' :'#FFFFFF',

        'p-lv0' :'#292D77',
        'p-lv1' :'#233CF9',
        'p-lv2' :'#0176F9',
        'p-lv3' :'#409AFF',
        'p-lv4' :'#00AEF2',
        'p-lv5' :'#E2F0FF',
        'p-lv6' :'#C2D7FF',
        'p-lv7' :'#ABC9FB',
        'p-lv8' :'#78BBFF',

        'l-lv0' :'#727981',
        'l-lv1' :'#',
        'l-lv2' :'#C1C1C1',
        'l-lv3' :'#E5E5EC',
        'l-lv4' :'#E4E5E9',
        'l-lv5' :'#F6F6F6',

        's-lv1' : "#6AB2BE",

        'bg-lv1':"#F8F9FA",

        
        
        sky: {
          500: '#00AEF2', // 기본 sky.500 색상 변경
        },
      },
      boxShadow: {
        'custom': '0 2px 2px 0 rgba(0, 0, 0, 0.06)',
        'custom-y': '0 -4px 4px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('ios', '&.ios &', { respectImportant: false });
    }),
  ],
}


