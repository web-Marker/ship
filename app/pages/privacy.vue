<template>
  <LandingContainer>
    <div class="privacy-policy">
      <h1 class="policy-title">
        <strong>{{ $t('privacy.title') }}</strong>
      </h1>
      <p class="last-updated">{{ $t('privacy.lastUpdated') }}</p>

      <h2 class="section-title">
        <strong>{{ $t('privacy.sections.introduction.title') }}</strong>
      </h2>
      <p>
        {{ $t('privacy.sections.introduction.content') }}
      </p>

      <h2 class="section-title">
        <strong>{{ $t('privacy.sections.interpretation.title') }}</strong>
      </h2>
      <p>{{ $t('privacy.sections.interpretation.content') }}</p>
      <ul>
        <li>
          {{ $t('privacy.sections.interpretation.terms.service') }}
        </li>
        <li>
          {{ $t('privacy.sections.interpretation.terms.user') }}
        </li>
        <li>
          {{ $t('privacy.sections.interpretation.terms.personalData') }}
        </li>
        <li>
          {{ $t('privacy.sections.interpretation.terms.usageData') }}
        </li>
      </ul>

      <h2 class="section-title"><strong>Information We Collect</strong></h2>
      <p><strong>1. Personal Information:</strong></p>
      <ul>
        <li>Email address (for registered users)</li>
        <li>Account credentials</li>
        <li>Payment information (when purchasing premium features)</li>
      </ul>

      <p><strong>2. Usage Data:</strong></p>
      <ul>
        <li>Browser type and version</li>
        <li>Generated seal designs</li>
        <li>
          Time spent using our
          <NuxtLink to="/" class="link">stamp generator</NuxtLink>
        </li>
        <li>IP address and device information</li>
      </ul>

      <h2 class="section-title">
        <strong>How We Use Your Information</strong>
      </h2>
      <p>We use collected data to:</p>
      <ul>
        <li>Provide our digital seal creation service</li>
        <li>Process your premium feature purchases</li>
        <li>
          Improve our <NuxtLink to="/" class="link">seal templates</NuxtLink>
        </li>
        <li>Send service updates and notifications</li>
        <li>Ensure platform security</li>
      </ul>

      <h2 class="section-title"><strong>Data Security</strong></h2>
      <p>We implement industry-standard security measures to protect your:</p>
      <ul>
        <li>Seal designs</li>
        <li>Account information</li>
        <li>Payment details</li>
        <li>Personal data</li>
      </ul>

      <h2 class="section-title"><strong>User Rights</strong></h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate information</li>
        <li>Delete your account</li>
        <li>Export your seal designs</li>
        <li>Opt-out of marketing communications</li>
      </ul>

      <h2 class="section-title"><strong>Cookie Policy</strong></h2>
      <p>We use cookies to:</p>
      <ul>
        <li>Remember your preferences</li>
        <li>Maintain login sessions</li>
        <li>Analyze usage patterns</li>
        <li>
          Improve our
          <NuxtLink to="/pricing" class="link">service offerings</NuxtLink>
        </li>
      </ul>

      <h2 class="section-title"><strong>Third-Party Services</strong></h2>
      <p>We may use trusted third-party services for:</p>
      <ul>
        <li>Payment processing</li>
        <li>Analytics</li>
        <li>Cloud storage</li>
        <li>Customer support</li>
      </ul>

      <h2 class="section-title"><strong>Children's Privacy</strong></h2>
      <p>
        Our service is not intended for users under 13 years of age. We do not
        knowingly collect data from children.
      </p>

      <h2 class="section-title"><strong>Changes to Privacy Policy</strong></h2>
      <p>
        We may update this policy occasionally. Significant changes will be
        notified via email or website announcement.
      </p>

      <h2 class="section-title"><strong>Contact Us</strong></h2>
      <p>
        For privacy-related questions, contact us through our
        <NuxtLink to="/contact" class="link">contact page</NuxtLink>.
      </p>
    </div>
  </LandingContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
</script>

<style scoped>
.privacy-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.policy-title {
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
}

.last-updated {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.section-title {
  margin-top: 30px;
  margin-bottom: 15px;
  color: #333;
}

p {
  margin-bottom: 15px;
  line-height: 1.6;
}

ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

.link {
  text-decoration: underline;
  color: #007bff;
}

.link:hover {
  color: #0056b3;
}
</style>
