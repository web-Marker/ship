// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'

export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@element-plus/nuxt',
    'nuxt-auth-utils',
    // '@sentry/nuxt/module',
    '@nuxtjs/i18n',
  ],

  vite: {
    build: {
      assetsInlineLimit: 10,
    },
  },

  nitro: {
    minify: false,
    prerender: {
      routes: ['/blog'], // 预渲染博客列表页
      crawlLinks: true, // 自动爬取链接
    },
    routeRules: {
      '/blog': { prerender: true },
      '/blog/**': { prerender: true },

      '/**': {
        headers: {
          'Content-Security-Policy':
            "frame-ancestors 'self' https://pay.google.com https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com;",
          'X-Frame-Options': 'SAMEORIGIN',
        },
      },
    },
  },

  hooks: {
    // 'nitro:config': (nitroConfig) => {
    //   // 如果需要,你可以在这里修改 nitro 配置
    // },
    'nitro:init': async nitro => {
      // 获取所有博客文章的路径
      const blogSlugs = await Promise.resolve([
        'legal-requirements-digital-seals',
        'custom-seal-typography',
        'digital-seal-formats',
        'seal-design-trends-2024',
        'seal-automation-workflow',
        'cultural-seal-designs',
        'digital-seal-history',
        'business-seal-guide',
        'digital-signatures-vs-seals',
        'ai-seal-design',
        'seal-security-features',
        'creative-seal-designs',
        'healthcare-digital-seals',
        'digital-seal-verification',
        'stamp-maker-online',
        'financial-digital-seals',
        'seal-seo-optimization',
        'custom-seal-design-guide',
        'seal-design-psychology',
        'online-stamp-maker-free',
      ])

      // 添加到预渲染队列
      blogSlugs.forEach(slug => {
        nitro.options.prerender.routes.push(`/blog/${slug}`)
      })
    },
  },

  experimental: {
    payloadExtraction: true, // 启用 payload 提取优化
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
      title:
        'AI Online Stamp Maker Free - Create Custom Digital Stamps & Seals',
      meta: [
        // Primary Meta Tags
        {
          name: 'description',
          content:
            'Create professional stamps online with our free stamp maker. Design custom digital seals and stamps using AI-powered stamp maker online. Easy to use templates and secure stamp making tools.',
        },

        // Open Graph / Facebook
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:title',
          content:
            'Online Stamp Maker Free - Create Custom Digital Stamps & Seals',
        },
        {
          property: 'og:description',
          content:
            'Create professional stamps online with our free stamp maker. Design custom digital seals and stamps using AI-powered stamp maker online. Easy to use templates and secure stamp making tools.',
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
          content:
            'Online Stamp Maker Free - Create Custom Digital Stamps & Seals',
        },
        {
          name: 'twitter:description',
          content:
            'Create professional stamps online with our free stamp maker. Design custom digital seals and stamps using AI-powered stamp maker online. Easy to use templates and secure stamp making tools.',
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
        {
          name: 'google-adsense-account',
          content: 'ca-pub-5518561944394588',
        },
      ],

      script: [
        // {
        //   src: 'https://docs.opencv.org/master/opencv.js',
        //   async: true,
        // },
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
    session: {
      // 确保 cookie 配置正确
      cookie: {
        sameSite: 'lax', // 设置 SameSite 属性
        secure: process.env.NODE_ENV === 'production', // 生产环境使用 secure
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7天
      },
    },
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
    // blob: true,
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

  // sentry: {
  //   sourceMapsUploadOptions: {
  //     org: 'zyp-17',
  //     project: 'javascript-nuxt',
  //   },
  // },

  sourcemap: {
    client: 'hidden',
  },

  i18n: {
    baseUrl: 'https://sealsdigital.com',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    detectBrowserLanguage: false, // 禁用浏览器语言检测

    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        language: 'en-US',
        isCatchallLocale: true,
      },
      {
        code: 'fr',
        name: 'Français',
        file: 'fr.json',
        language: 'fr-FR',
      },
      {
        code: 'ru',
        name: 'Русский',
        file: 'ru.json',
        language: 'ru-RU',
      },
      {
        code: 'cz',
        name: 'Čeština',
        file: 'cz.json',
        language: 'cs-CZ',
      },
      {
        code: 'dk',
        name: 'Dansk',
        file: 'dk.json',
        language: 'da-DK',
      },
      {
        code: 'el',
        name: 'Ελληνικά',
        file: 'el.json',
        language: 'el-GR',
      },

      {
        code: 'hu',
        name: 'Magyar',
        file: 'hu.json',
        language: 'hu-HU',
      },
      {
        code: 'id',
        name: 'Indonesia',
        file: 'id.json',
        language: 'id-ID',
      },
      {
        code: 'it',
        name: 'Italiano',
        file: 'it.json',
        language: 'it-IT',
      },
      {
        code: 'ja',
        name: '日本語',
        file: 'ja.json',
        language: 'ja-JP',
      },
      {
        code: 'ko',
        name: '한국어',
        file: 'ko.json',
        language: 'ko-KR',
      },
      {
        code: 'de',
        name: 'Deutsch',
        file: 'de.json',
        language: 'de-DE',
      },
      {
        code: 'ar',
        name: 'العربية',
        file: 'ar.json',
        language: 'ar-AE',
      },
      {
        code: 'pt',
        name: 'Português',
        file: 'pt.json',
        language: 'pt-PT',
      },
      {
        code: 'pl',
        name: 'Polski',
        file: 'pl.json',
        language: 'pl-PL',
      },
      {
        code: 'ur',
        name: 'اردو',
        file: 'ur.json',
        language: 'ur-PK',
      },
    ],
  },
})
