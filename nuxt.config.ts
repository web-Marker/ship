// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    'nuxt-icon',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@element-plus/nuxt',
    'nuxt-auth-utils',
  ],
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy':
            "frame-ancestors 'self' https://pay.google.com https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com;",
          'X-Frame-Options': 'SAMEORIGIN',
        },
      },
    },
  },
  auth: {
    hash: {
      scrypt: {
        cost: 16384, // CPU/内存成本参数
        blockSize: 8, // 块大小参数
        parallelization: 1, // 并行化参数
        saltSize: 16, // 盐值大小（字节）
        keyLength: 64, // 期望的密钥长度（字节）
      },
    },
  },
  // https://devtools.nuxt.com
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      title: 'DigitalSeal Studio - Free AI Seal Maker | Custom Stamp Creator',
      meta: [
        // Primary Meta Tags
        {
          name: 'description',
          content:
            'Create professional digital seals and stamps for free with AI technology. No signup required. Design custom seals with vintage effects, multiple colors, and instant download. Free online tool for business documents and artworks.',
        },
        {
          name: 'keywords',
          content:
            'free seal maker, free stamp creator, free digital seal, online seal generator, free business seal, AI stamp maker, custom seal design, free stamp tool, no cost seal creator, free download seal maker, free business stamp',
        },
        // Open Graph / Facebook
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:title',
          content: 'Free Digital Seal Maker - Create Custom Stamps Online',
        },
        {
          property: 'og:description',
          content:
            'Create professional digital seals and stamps for free. AI-powered design tools with instant download. No registration needed.',
        },
        {
          property: 'og:site_name',
          content: 'DigitalSeal Studio',
        },
        // Twitter
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Free Digital Seal Maker - AI-Powered Stamp Creator',
        },
        {
          name: 'twitter:description',
          content:
            'Design professional seals and stamps for free. AI-powered tools, no signup required, instant download.',
        },
        // Additional SEO
        {
          name: 'author',
          content: 'DigitalSeal Studio',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
      ],

      script: [
        {
          src: 'https://docs.opencv.org/master/opencv.js',
          async: true,
        },
        {
          src: `https://www.googletagmanager.com/gtag/js?id=G-SPT6210FEJ`,
          async: true,
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SPT6210FEJ');
          `,
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    public: {
      sessionPassword: process.env.NUXT_SESSION_PASSWORD,
      appUrl: process.env.NUXT_APP_URL,
      stripe: {
        publicKey: process.env.STRIPE_PUBLIC_KEY,
      },
    },
    oauth: {
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
        redirectUri: 'https://sealsdigital.com/api/auth/google/callback', // 确保这个回调 URL 和 Google Console 中配置的一致
        scope: ['email', 'profile'],
      },
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publicKey: process.env.STRIPE_PUBLIC_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      prices: {
        oneTime: process.env.STRIPE_ONE_TIME_PRICE_ID, // $1.99
        subscription: process.env.STRIPE_SUBSCRIPTION_PRICE_ID, // $9.99/month
      },
    },
  },
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',
  hub: {
    kv: true,
    database: true,
  },
  // https://hub.nuxt.com/docs/getting-started/installation#options
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  robots: {
    allow: '/',
    sitemap: 'https://sealsdigital.com/sitemap.xml',
  },

  sitemap: {
    urls: ['https://sealsdigital.com'],
  },
})
