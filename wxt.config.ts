import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    web_accessible_resources: [
      {
        matches: ['*://*.google.com/*'],
        resources: ['assets/injection.css'],
      },
    ],
  },
})
