<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-center text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p class="text-gray-600 text-center mb-6">
        Thank you for your purchase. Your payment has been processed
        successfully.
      </p>
      <div class="flex justify-center">
        <NuxtLink
          to="/"
          class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
