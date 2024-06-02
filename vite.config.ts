import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/guvis/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src' // 이 경로를 조정하여 올바르게 매핑되도록 설정
    }
  }
})
