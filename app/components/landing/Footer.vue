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
            >Seal Digital</a
          >
        </div>
        <!-- End Col -->

        <div class="col-span-1">
          <h4 class="font-semibold text-gray-100">Product</h4>

          <div class="mt-3 grid space-y-3">
            <p>
              <NuxtLink
                to="/"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                Edit</NuxtLink
              >
            </p>
            <p>
              <NuxtLink
                to="/pricing"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                Pricing</NuxtLink
              >
            </p>
          </div>
        </div>
        <!-- End Col -->

        <div class="col-span-1">
          <h4 class="font-semibold text-gray-100">Company</h4>

          <div class="mt-3 grid space-y-3">
            <p>
              <NuxtLink
                to="/blog"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                Blog</NuxtLink
              >
            </p>
            <p>
              <NuxtLink
                to="/contact"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                Contact</NuxtLink
              >
            </p>
            <p>
              <NuxtLink
                to="/privacy"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                Privacy</NuxtLink
              >
            </p>
            <p>
              <NuxtLink
                to="/terms"
                class="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
              >
                Terms & Conditions</NuxtLink
              >
            </p>
          </div>
        </div>
        <!-- End Col -->

        <div class="col-span-2">
          <h4 class="font-semibold text-gray-100">Stay up to date</h4>

          <form>
            <div
              class="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-lg p-2 dark:bg-neutral-900"
            >
              <div class="w-full">
                <label for="hero-input" class="sr-only">Subscribe</label>
                <input
                  id="hero-input"
                  v-model="email"
                  type="email"
                  name="hero-input"
                  class="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter your email"
                />
              </div>
              <span
                class="w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                @click="handleSend"
              >
                Subscribe
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
            Copyright © {{ new Date().getFullYear() }} SealDigital. All rights
            reserved.
          </p>
        </div>
        <!-- End Col -->
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

const handleSend = () => {
  if (!email.value) {
    ElMessage.warning('Please enter your email')
    return
  }
  ElMessage.success('Subscribe sent successfully!')
}
</script>
