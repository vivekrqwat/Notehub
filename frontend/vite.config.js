import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{'/apii':{
      target:'https://notehub-1-v9ea.onrender.com',
      changeOrigin: true,
        secure: false,

    }
  }
  }
})
