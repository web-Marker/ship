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
  <div v-if="!activeTab" class="flex flex-col bg-gray-100">
    <LandingEdit />
  </div>

  <!--activeTab 等于1-->
  <!-- <div v-else class="flex flex-col bg-gray-100">
    <LandingExtractstamp />
  </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ref(['Generate Stamp'])
const activeTab = ref(0)
</script>
<style scoped></style>
