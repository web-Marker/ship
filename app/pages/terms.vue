<template>
  <LandingContainer>
    <div class="terms-conditions">
      <h1 class="policy-title">
        <strong>{{ $t('terms.title') }}</strong>
      </h1>
      <p class="last-updated">{{ $t('terms.lastUpdated') }}</p>

      <h2 class="section-title">
        <strong>{{ $t('terms.sections.general.title') }}</strong>
      </h2>
      <p>{{ $t('terms.sections.general.content') }}</p>
      <p>{{ $t('terms.sections.general.liability') }}</p>

      <h2 class="section-title">
        <strong>{{ $t('terms.sections.license.title') }}</strong>
      </h2>
      <p>{{ $t('terms.sections.license.content') }}</p>

      <h2 class="section-title">
        <strong>{{ $t('terms.sections.contact.title') }}</strong>
      </h2>
      <p>{{ $t('terms.sections.contact.content') }}</p>
    </div>
  </LandingContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
</script>

<style scoped>
.terms-conditions {
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
