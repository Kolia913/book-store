// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "nuxt-security", "@vee-validate/nuxt"],

  pinia: {
    storesDirs: ["./stores/**"],
  },
  app: {
    head: {
      script: [
        {
          src: 'https://secure.wayforpay.com/server/pay-widget.js',
          async: true,
          defer: true
        }
      ]
    }
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        "frame-src": ["'self'", "https://secure.wayforpay.com", "https://widget.wayforpay.com"],
        "frame-ancestors": ["'self'", "https://secure.wayforpay.com"],
        "form-action": ["'self'", "https://secure.wayforpay.com", "https://widget.wayforpay.com"],
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "https://secure.wayforpay.com",
          "https://widget.wayforpay.com"
        ],
        "connect-src": ["'self'",
           "https://secure.wayforpay.com",
           "https://api.wayforpay.com",
          "https://api.novaposhta.ua"]
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      crossOriginResourcePolicy: "cross-origin",
      xFrameOptions: false 
    }
  },

  nitro: {
    routeRules: {
      '/api/wayforpay/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': 'https://obert.com.ua',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Expose-Headers': '*'
        }
      
      },
      '/api/**': {
        cors: true, 
        headers: {
          'Access-Control-Allow-Origin': 'https://obert.com.ua',
          'Access-Control-Allow-Credentials': 'true'
        },
      }
    }
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      siteUrl: 'https://obert.com.ua',
      wayforpayUrl: 'https://secure.wayforpay.com'
    },
    jwtSecret: process.env.JWT_SECRET,
    wayforpayMerchantLogin: process.env.WAYFORPAY_MERCHANT_LOGIN,
    wayforpaySecretKey: process.env.WAYFORPAY_SECRET_KEY,
    wayforpayCallbackUrl: process.env.WAYFORPAY_CALLBACK_URL,
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['lodash']
    }
  }
});