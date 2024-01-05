/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  pages: async () => {
    return {
      '/quizPages/myQuiz': { page: './pages/quizPages/myQuiz.jsx' },
      '/quizPages/playQuiz': { page: './pages/quizPages/playQuiz.jsx' },
      // Exclude the problematic page
      // '/quizPages/myQuiz': { do not include this entry },
    };
  },
}
 
module.exports = nextConfig