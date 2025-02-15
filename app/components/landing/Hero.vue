<template>
  <div class="bg-white mt-10">
    <div
      class="z-[2] mx-auto mb-5 flex w-max rounded-lg bg-zinc-100 p-1 relative"
    >
      <div
        class="absolute transition-transform duration-300 ease-in-out bg-white rounded-lg"
        :style="{
          transform: `translateX(${activeTab * 100}%)`,
          width: 'calc(100% - 8px)',
          height: 'calc(100% - 8px)',
          top: '4px',
          left: '4px',
        }"
      ></div>

      <!-- Tabs -->
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="relative flex cursor-pointer items-center justify-center px-10 py-2 transition-colors duration-300 rounded-lg text-base font-semibold text-zinc-900 z-10"
        @click="activeTab = index"
      >
        {{ tab }}
      </div>
    </div>
  </div>

  <!--activeTab 等于0-->
  <div v-if="!activeTab" class="flex flex-col">
    <LandingEdit />
  </div>

  <!-- Icon Blocks -->
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Grid -->
    <div class="grid md:grid-cols-2 gap-12">
      <div class="lg:w-3/4">
        <h2 class="text-3xl text-gray-800 font-bold lg:text-4xl">
          {{ $t('hero.title') }}
        </h2>
        <p class="mt-3 text-gray-800">
          {{ $t('hero.description') }}
        </p>
      </div>
      <!-- End Col -->

      <div class="space-y-6 lg:space-y-10">
        <!-- Icon Block -->
        <div class="flex gap-x-5 sm:gap-x-8">
          <!-- Icon -->
          <span
            class="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
          >
            <svg
              class="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </span>
          <div class="grow">
            <h3 class="text-base sm:text-lg font-semibold text-gray-800">
              {{ $t('hero.features.templates.title') }}
            </h3>
            <p class="mt-1 text-gray-600">
              {{ $t('hero.features.templates.description') }}
            </p>
          </div>
        </div>
        <!-- End Icon Block -->

        <!-- Icon Block -->
        <div class="flex gap-x-5 sm:gap-x-8">
          <!-- Icon -->
          <span
            class="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
          >
            <svg
              class="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"
              />
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
            </svg>
          </span>
          <div class="grow">
            <h3 class="text-base sm:text-lg font-semibold text-gray-800">
              {{ $t('hero.features.security.title') }}
            </h3>
            <p class="mt-1 text-gray-600">
              {{ $t('hero.features.security.description') }}
            </p>
          </div>
        </div>
        <!-- End Icon Block -->

        <!-- Icon Block -->
        <div class="flex gap-x-5 sm:gap-x-8">
          <!-- Icon -->
          <span
            class="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
          >
            <svg
              class="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M7 10v12" />
              <path
                d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"
              />
            </svg>
          </span>
          <div class="grow">
            <h3 class="text-base sm:text-lg font-semibold text-gray-800">
              {{ $t('hero.features.customization.title') }}
            </h3>
            <p class="mt-1 text-gray-600">
              {{ $t('hero.features.customization.description') }}
            </p>
          </div>
        </div>
        <!-- End Icon Block -->
      </div>
      <!-- End Col -->
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Icon Blocks -->

  <!-- Card Blog -->
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
      <h2 class="text-2xl font-bold md:text-4xl md:leading-tight">
        {{ $t('hero.blog.sectionTitle') }}
      </h2>
      <p class="mt-1 text-gray-600">
        {{ $t('hero.blog.sectionDescription') }}
      </p>
    </div>
    <!-- Grid -->
    <div class="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
      <!-- Card -->
      <NuxtLink
        to="/blog/online-stamp-maker-free"
        class="group block rounded-xl overflow-hidden focus:outline-none"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div
            class="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44"
          >
            <img
              class="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
              :src="p20"
              alt="online-stamp-maker-free"
            />
          </div>

          <div class="grow">
            <h3
              class="text-xl font-semibold text-gray-800 group-hover:text-gray-600"
            >
              Online Stamp Maker Free: Digital Creation Guide 2025
            </h3>
            <p class="mt-3 text-gray-600">
              Discover how to create professional digital stamps using free
              online tools. Learn about customization features, design
              techniques, and best practices for digital stamp creation.
            </p>
            <p
              class="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500"
            >
              {{ $t('hero.blog.readMore') }}
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </div>
      </NuxtLink>
      <!-- End Card -->

      <!-- Card -->
      <NuxtLink
        to="/blog/custom-seal-typography"
        class="group block rounded-xl overflow-hidden focus:outline-none"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div
            class="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44"
          >
            <img
              class="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
              :src="p14"
              alt="custom-seal-typography"
            />
          </div>

          <div class="grow">
            <h3
              class="text-xl font-semibold text-gray-800 group-hover:text-gray-600"
            >
              Typography Best Practices in Seal Design
            </h3>
            <p class="mt-3 text-gray-600">
              Master the art of selecting and arranging fonts in your digital
              seals. Learn how typography can enhance the...
            </p>
            <p
              class="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500"
            >
              {{ $t('hero.blog.readMore') }}
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </div>
      </NuxtLink>
      <!-- End Card -->
      <!-- Card -->
      <NuxtLink
        to="/blog/healthcare-digital-seals"
        class="group block rounded-xl overflow-hidden focus:outline-none"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div
            class="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44"
          >
            <img
              class="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
              :src="p13_1"
              alt="healthcare-digital-seals"
            />
          </div>

          <div class="grow">
            <h3
              class="text-xl font-semibold text-gray-800 group-hover:text-gray-600"
            >
              Digital Seals in Healthcare: 2024 Implementation Guide
            </h3>
            <p class="mt-3 text-gray-600">
              In 2024, digital seals have become instrumental in healthcare,
              revolutionizing medical documentation, patient records, and
              regulatory compliance. Discover ....
            </p>
            <p
              class="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500"
            >
              {{ $t('hero.blog.readMore') }}
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </div>
      </NuxtLink>
      <!-- End Card -->

      <!-- Card -->
      <NuxtLink
        to="/blog/digital-seal-formats"
        class="group block rounded-xl overflow-hidden focus:outline-none"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div
            class="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44"
          >
            <img
              class="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
              :src="p15"
              alt="digital-seal-formats"
            />
          </div>

          <div class="grow">
            <h3
              class="text-xl font-semibold text-gray-800 group-hover:text-gray-600"
            >
              Choosing the Right Digital Seal Format
            </h3>
            <p class="mt-3 text-gray-600">
              Compare different digital seal formats and their use cases. From
              vector-based designs to...
            </p>
            <p
              class="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500"
            >
              {{ $t('hero.blog.readMore') }}
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </div>
      </NuxtLink>
      <!-- End Card -->

      <!-- Card -->
      <NuxtLink
        to="/blog/custom-seal-design-guide"
        class="group block rounded-xl overflow-hidden focus:outline-none"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div
            class="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44"
          >
            <img
              class="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
              :src="p18"
              alt="seal-design-trends"
            />
          </div>

          <div class="grow">
            <h3
              class="text-xl font-semibold text-gray-800 group-hover:text-gray-600"
            >
              Custom Seal Design: Complete Guide to Creating Professional Seals
              2024
            </h3>
            <p class="mt-3 text-gray-600">
              Master the art of custom seal design with our comprehensive guide
              covering design principles
            </p>
            <p
              class="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500"
            >
              {{ $t('hero.blog.readMore') }}
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </div>
      </NuxtLink>
      <!-- End Card -->

      <!-- Card -->
      <NuxtLink
        to="/blog/seal-design-psychology"
        class="group block rounded-xl overflow-hidden focus:outline-none"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div
            class="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44"
          >
            <img
              class="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
              :src="p19"
              alt="seal-design-trends"
            />
          </div>

          <div class="grow">
            <h3
              class="text-xl font-semibold text-gray-800 group-hover:text-gray-600"
            >
              Seal Design Psychology: Complete Guide 2025
            </h3>
            <p class="mt-3 text-gray-600">
              Explore the psychological principles behind seal design, including
              color psychology, shape symbolism, and emotional design elements.
            </p>
            <p
              class="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500"
            >
              {{ $t('hero.blog.readMore') }}
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </div>
      </NuxtLink>
      <!-- End Card -->

      <!-- Card -->
      <NuxtLink
        to="/blog/ai-seal-innovation"
        class="group block rounded-xl overflow-hidden focus:outline-none"
      >
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div
            class="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44"
          >
            <img
              class="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
              :src="p21"
              alt="seal-design-trends"
            />
          </div>

          <div class="grow">
            <h3
              class="text-xl font-semibold text-gray-800 group-hover:text-gray-600"
            >
              AI in Digital Seal Design: Revolutionizing Custom Seal Creation
              2025
            </h3>
            <p class="mt-3 text-gray-600">
              description: 'Explore how artificial intelligence is transforming
              digital seal design and creation, featuring innovative AI
              applications, automation capabilities, and future trends in smart
              seal technology.'
            </p>
            <p
              class="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500"
            >
              {{ $t('hero.blog.readMore') }}
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </div>
      </NuxtLink>
      <!-- End Card -->
    </div>
    <!-- End Grid -->
    <div class="text-center mt-10">
      <div class="inline-block border shadow-sm rounded-full">
        <div class="py-3 px-4 flex items-center gap-x-2">
          <p class="text-gray-600">{{ $t('hero.blog.wantMore') }}</p>
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
          >
            {{ $t('hero.blog.goHere') }}
            <svg
              class="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <!-- End Card Blog -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import p13 from '@/assets/img/13.jpeg'
import p14 from '@/assets/img/14.jpeg'
import p15 from '@/assets/img/15.jpeg'
import p16 from '@/assets/img/16.jpeg'
import p13_1 from '@/assets/img/13.jpg'
import p17 from '@/assets/img/17.jpg'
import p18 from '@/assets/img/18.jpg'
import p19 from '@/assets/img/19.jpg'
import p20 from '@/assets/img/20.jpg'
import p21 from '@/assets/img/21.jpg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const tabs = ref([t('hero.tabs.generateStamp')])
const activeTab = ref(0)
</script>
<style scoped></style>
