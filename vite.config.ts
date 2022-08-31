import { defineConfig } from 'vite'
import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from 'path'
import preact from '@preact/preset-vite'

type Mode = 'development' | 'production' | 'uat' | 'preview' | 'test'
// https://vitejs.dev/ config/
export default ({ command, mode }: { command: string; mode: Mode }) => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.tsx'),
        name: 'TianshuFeedbackSDK',
        formats: ['umd'],
        fileName: (format) => mode === 'test' ? `feedback-sdk.test.js` : `feedback-sdk.js`
      },
      rollupOptions: {
        plugins: [visualizer()],
      },
    },
    plugins: [preact()],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    }
  }
}
