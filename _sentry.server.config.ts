import * as Sentry from '@sentry/nuxt'

Sentry.init({
  dsn: 'https://608d38821f5b395808780686abfd53de@o4508606660083712.ingest.us.sentry.io/4508606695669760',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
