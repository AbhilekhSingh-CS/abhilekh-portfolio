import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During development the React app runs on :5173 and the Express API on
// :5001. The proxy below forwards API calls and uploaded videos to Express,
// so the frontend can simply fetch('/api/...') with no CORS headaches.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
      '/uploads': 'http://localhost:5001',
    },
  },
});
