
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import inject from '@rollup/plugin-inject'

var polyfills = {
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert/"),
    url: require.resolve("url/"),
    buffer: require.resolve("buffer/"),
    process: require.resolve("process/"),
}

import { Buffer } from "buffer/"

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  plugins: [vue()],
  optimizeDeps: {
    exclude: [
      '@lokavaluto/lokapi-backend-comchain',
    ]
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
	  plugins: [inject({ Buffer: ['Buffer', 'Buffer'] })],
	},
  },
  resolve: {
    alias: {
      // "@": path.resolve(__dirname, "./src"),
      // crypto: require.resolve("crypto-browserify"),
      // http: require.resolve("stream-http"),
      // https: require.resolve("https-browserify"),
      // stream: require.resolve("stream-browserify"),
      // assert: require.resolve("assert/"),
      // url: require.resolve("url/"),
      // buffer: require.resolve("buffer/"),
      // process: require.resolve("process/"),
      "@": path.resolve(__dirname, "./src"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert/"),
      url: require.resolve("url/"),
      buffer: require.resolve("buffer/"),
      process: require.resolve("process/"),
    },
  },
})