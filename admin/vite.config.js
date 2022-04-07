import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',              //配置./开头相对路径，默认是/开头
  plugins: [vue()],
  build:{
    rollupOptions:{
                output: {
               chunkFileNames: 'static/js/[name]-[hash].js',
               entryFileNames: 'static/js/[name]-[hash].js',
               assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
           },
    }
  }
})
