<template>
  <!-- ========== FOOTER ========== -->
  <footer class="mt-20 bg-gray-900 w-full dark:bg-neutral-950 z-[99]">
    <div
      class="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto"
    >
      <!-- Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div class="col-span-full lg:col-span-1">
          <a
            class="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
            href="#"
            aria-label="Brand"
            >{{ $t('brand.seal') }} {{ $t('brand.digital') }}</a
          >
          <div class="mt-4 text-gray-400 font-medium">Review</div>
          <div class="flex items-center mt-2">
            <a
              href="https://www.sitejabber.com/reviews/sealsdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              title="sealsdigital.com sitejabber "
            >
              <img :src="sitejabber" alt="Sitejabber" class="w-5 mr-2" />
            </a>
            <a
              href="https://climate.stripe.com/keyjOX"
              target="_blank"
              rel="noopener noreferrer"
              title="sealsdigital.com stripe "
            >
              <img :src="stripe" alt="Stripe" class="w-5 mr-2" />
            </a>
            <!-- <a
              href="https://www.google.com/maps/place/SealsDigital+Studio/@37.7749296,-122.4194157,15z/data=!4m2!3m1!1s0x808f7e3117277777:0x1242978289282828"
              target="_blank"
              rel="noopener noreferrer"
              title="sealsdigital.com google map "
            >
              <img :src="googleMap" alt="Google Map" class="w-5 mr-2" />
            </a> -->
            <a
              href="https://www.producthunt.com/products/digitalseal-studio"
              target="_blank"
              rel="noopener noreferrer"
              title="sealsdigital.com producthunt"
            >
              <img :src="productHunt" alt="Product Hunt " class="w-5 mr-2" />
            </a>
          </div>
        </div>
        <!-- End Col -->

        <div class="col-span-1">
          <h4 class="font-semibold text-gray-100">
            {{ $t('footer.product') }}
          </h4>

          <div class="mt-3 grid space-y-3">
            <p>
              <NuxtLink
                to="/"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                {{ $t('nav.edit') }}</NuxtLink
              >
            </p>
            <p>
              <NuxtLink
                to="/pricing"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                {{ $t('nav.pricing') }}</NuxtLink
              >
            </p>
            <p>
              <NuxtLink
                to="https://climate.stripe.com/keyjOX"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                {{ $t('footer.stripeClimate') }}</NuxtLink
              >
            </p>
          </div>
        </div>
        <!-- End Col -->

        <div class="col-span-1">
          <h4 class="font-semibold text-gray-100">
            {{ $t('footer.company') }}
          </h4>

          <div class="mt-3 grid space-y-3">
            <p>
              <NuxtLink
                to="/blog"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                {{ $t('nav.blog') }}</NuxtLink
              >
            </p>
            <p>
              <NuxtLink
                to="/contact"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                {{ $t('nav.contact') }}</NuxtLink
              >
            </p>
            <p>
              <NuxtLink
                to="/privacy"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                {{ $t('footer.privacy') }}</NuxtLink
              >
            </p>
            <p>
              <NuxtLink
                to="/terms"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                {{ $t('footer.terms') }}</NuxtLink
              >
            </p>
          </div>
        </div>
        <!-- End Col -->

        <div class="col-span-2">
          <h4 class="font-semibold text-gray-100">
            {{ $t('footer.stayUpdated') }}
          </h4>

          <form>
            <div
              class="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-lg p-2 dark:bg-neutral-900"
            >
              <div class="w-full">
                <label for="hero-input" class="sr-only">{{
                  $t('footer.subscribe')
                }}</label>
                <input
                  id="hero-input"
                  v-model="email"
                  type="email"
                  name="hero-input"
                  class="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  :placeholder="$t('footer.enterEmail')"
                />
              </div>
              <span
                class="w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                @click="handleSend"
              >
                {{ $t('footer.subscribe') }}
              </span>
            </div>
          </form>
        </div>
        <!-- End Col -->
      </div>
      <!-- End Grid -->

      <div
        class="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-center sm:items-center"
      >
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-400 dark:text-neutral-400">
            {{ $t('footer.copyright', { year: new Date().getFullYear() }) }}
          </p>
        </div>
        <!-- End Col -->
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import sitejabber from '@/assets/img/sitejabbe.png'
import stripe from '@/assets/img/stripe.jpg'
import googleMap from '@/assets/img/google-map.svg'
import productHunt from '@/assets/img/product-hunt.svg'

const email = ref('')
const { t } = useI18n()

const handleSend = () => {
  if (!email.value) {
    ElMessage.warning(t('footer.pleaseEnterEmail'))
    return
  }
  ElMessage.success(t('footer.subscribeSuccess'))
}
</script>
