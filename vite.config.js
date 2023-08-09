import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // un-comment while working in local
  // server: {
  //   host: "localhost",  // ip address not store cookies in browser
  //   port: "3002",
  // },
})

