import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
const fs = require("fs")
const path = require("path")
export default defineConfig({
  plugins: [
    vue(),
    vueJsx() //插件使用
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      }
    }
  },
  resolve: {
    alias:{
    '@': path.resolve(__dirname, './src')
    }
  },
});