/** @type {import('next').NextConfig} */

module.exports =  {exportPathMap: async function () {
  return {
    '/': { page: './pages/index.js' },  // Example: Map the root URL to the index page
  };
},}
