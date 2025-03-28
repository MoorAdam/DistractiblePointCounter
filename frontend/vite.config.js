import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
 base: "/",
 plugins: [
    react(), 
    tailwindcss()],
 preview: {
  port: 8080,
  strictPort: true,
 },
 server: {
  open : true,
  port: 8080,
  strictPort: true,
  host: true,
  origin: "http://0.0.0.0:8080",
  proxy :{
   "/api": process.env.VITE_API_URL || "http://localhost:3000"
  }
 },
});