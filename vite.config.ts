/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: 'prompt',
      includeAssets: [
        'favicon.ico',
        'images/apple-touch-icon.png',
        'images/catedral.svg',
        'images/logo.svg',
        'images/location.png',
        'images/Marathon.webp',
        'images/pwa-192.png',
        'images/pwa-512.png',
        'images/pwa-maskable-512.png',
      ],
      workbox: {
        navigateFallback: '/index.html',
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,

        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp,webmanifest}',
          'tickets/7-BRAINDED.enc',
        ],

        runtimeCaching: [
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin &&
              url.pathname.startsWith('/tickets/') &&
              url.pathname.endsWith('.enc'),

            handler: 'CacheFirst',

            options: {
              cacheName: 'sitges-encrypted-tickets',

              cacheableResponse: {
                statuses: [200],
              },

              expiration: {
                maxEntries: 40,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin && url.pathname.startsWith('/images/'),

            handler: 'StaleWhileRevalidate',

            options: {
              cacheName: 'sitges-images',

              cacheableResponse: {
                statuses: [0, 200],
              },

              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },

      manifest: {
        name: 'Sitges 2026',
        short_name: 'Sitges',
        description: 'Companion app for Sitges Film Festival 2026',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#FF0042',
        background_color: '#000000',

        icons: [
          {
            src: '/images/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/images/pwa-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],

  server: {
    allowedHosts: true,
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
