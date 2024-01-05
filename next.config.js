/** @type {import('next').NextConfig} */

module.exports =  {exportPathMap: async function () {
  return {
    '/': { page: './pages/index.js' },  // Example: Map the root URL to the index page
    '/createQuiz': { page: './pages/quizPages/createQuiz.js' },
    '/myQuiz': { page: './pages/quizPages/myQuiz.js' },
    '/playQuiz': { page: './pages/quizPages/playQuiz.js' },
    '/resultQuiz': { page: './pages/quizPages/resultQuiz.js' },
  };
},}
