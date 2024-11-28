module.exports = {
  plugins: {
    require('tailwindcss')('./tailwind.config.js'), // Tailwind CSS 설정 파일 경로
    require('autoprefixer'), // Autoprefixer 플러그인
    require('@tailwindcss/forms'), // Tailwind Forms 플러그인
    // tailwindcss: {
    //   config: './tailwind.config.js',
    //   // 테일윈드 폼 플러그인을 적용할 폴더 경로 지정
    //   includeFiles: ['./src/components/input/Checkbox.vue'],
    // },
    // autoprefixer: {},
    // require('tailwindcss'),
    // require('autoprefixer'),

  },
};
