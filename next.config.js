/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pages: async () => {
    return {
      '/': { page: './pages/index.js' },
      // Exclude the problematic page
      // '/quizPages/myQuiz': { do not include this entry },
    };
  },
}
 
module.exports = nextConfig