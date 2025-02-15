<script setup>
const i18nHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}))
</script>

<template>
  <LandingNavbar></LandingNavbar>
  <slot></slot>
  <LandingFooter />
</template>
