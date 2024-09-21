// import tailwindcss from 'tailwindcss';
// import autoprefixer from 'autoprefixer';

// /** @type {import('postcss-load-config').Config} */
// export default {
//   plugins: [
//     tailwindcss('./tailwind.config.js'),
//     autoprefixer,
//   ],
// };


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './src/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     tailwindcss('./tailwind.config.js'),
//     autoprefixer,
//   ],
// };


/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;