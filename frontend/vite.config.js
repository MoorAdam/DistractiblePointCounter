import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
 base: "/",
 plugins: [
    react(), 
    tailwindcss()],
 preview: {
  port: 8070,
  strictPort: true,
 },
 server: {
  open : true,
  port: 8070,
  strictPort: true,
  host: true,
  origin: "http://0.0.0.0:8070",
  proxy :{
   "/api" : "http://localhost:3000"
  }
 },
});