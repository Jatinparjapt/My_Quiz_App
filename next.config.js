/** @type {import('next').NextConfig} */

module.exports =  { output: {
  // Use the following line for static HTML export
  pages: async () => {
    return {
      '/': { page: './pages/index.js' },  // Example: Map the root URL to the index page
      '/createQuiz': { page: './pages/quizPages/createQuiz.js' },
      '/myQuiz': { page: './pages/quizPages/myQuiz.js' },
      '/playQuiz': { page: './pages/quizPages/playQuiz.js' },
      '/resultQuiz': { page: './pages/quizPages/resultQuiz.js' },
    };
  },
},}
