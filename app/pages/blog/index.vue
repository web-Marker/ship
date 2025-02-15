<!-- app/pages/blog/index.vue -->
<script setup lang="ts">
import { postdata } from '../../data/articles/postsList'

definePageMeta({
  layout: 'landing',
})

type Category = 'allPosts' | 'designTips' | 'security' | 'tutorials'

const allPosts = ref<any>(postdata)

useHead({
  title: 'Blog - DigitalSeal Studio',
  meta: [
    {
      name: 'description',
      content:
        'Latest articles about digital seals, stamps, and document authentication.',
    },
  ],
})

// 当前选中的分类
const selectedCategory = ref<Category>('allPosts')

// 分类列表
const categories = ref<Category[]>([
  'allPosts',
  'designTips',
  'security',
  'tutorials',
])

// 根据分类筛选文章
const posts = computed(() => {
  if (selectedCategory.value === 'allPosts') {
    return allPosts.value
  }
  return allPosts.value.filter(
    post => post.category.toLowerCase() === selectedCategory.value
  )
})

// 处理分类点击
const handleCategoryClick = (category: Category) => {
  selectedCategory.value = category
}
</script>

<template>
  <LandingContainer>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">
          {{ $t('blog.title') }}
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          {{ $t('blog.description') }}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div class="text-gray-600 mb-4 sm:mb-0">
          <p class="text-sm">
            {{ $t('blog.articleCount', { count: posts.length }) }}
          </p>
        </div>
        <div class="flex gap-2 flex-wrap justify-center">
          <span
            v-for="category in categories"
            :key="category"
            :class="[
              'px-3 py-1 text-sm rounded-full cursor-pointer transition-colors',
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
            @click="handleCategoryClick(category)"
          >
            {{ $t(`blog.categories.${category}`) }}
          </span>
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="post in posts"
          :key="post.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <NuxtLink :to="`/blog/${post.slug}`" class="block">
            <img
              v-if="post.coverImage"
              :src="post.coverImage"
              :alt="post.title"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h2 class="text-xl font-semibold mb-2 hover:text-primary">
                {{ post.title }}
              </h2>
              <p class="text-gray-600 mb-4 line-clamp-2">
                {{ post.description }}
              </p>
              <div
                class="flex items-center justify-between text-sm text-gray-500"
              >
                <time :datetime="post.publishedAt">
                  {{ new Date(post.publishedAt).toLocaleDateString() }}
                </time>
                <span class="flex items-center">
                  <Icon name="heroicons:user-circle" class="w-4 h-4 mr-1" />
                  {{ post.author }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </LandingContainer>
</template>
<style scoped>
.bg-primary {
  background-color: #3b82f6; /* 或者你的主题色 */
}

.hover\:bg-primary:hover {
  background-color: #2563eb; /* 或者更深一点的主题色 */
}
</style>
