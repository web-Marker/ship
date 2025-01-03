<script setup lang="ts">
import { articleContents } from '../../data/articles/articleContents.js'
import { postdata } from '../../data/articles/postsList'

// 获取路由参数
const route = useRoute()
const { slug } = route.params as { slug: string }
console.log('🚀 ~ slug:', slug)

// 从文章列表中获取当前文章的基本信息
const allPosts = ref(postdata)
const currentArticle = computed(() =>
  allPosts.value.find(post => post.slug === slug)
)
console.log('🚀 ~ currentArticle:', currentArticle.value)

// 获取文章内容
const articleContent = computed(
  () => articleContents[slug as keyof typeof articleContents]
)

// SEO优化
useHead(() => ({
  title: currentArticle.value?.title + ' - DigitalSeal Studio',
  meta: [
    {
      name: 'description',
      content: currentArticle.value?.description,
    },
    // Open Graph
    {
      property: 'og:title',
      content: currentArticle.value?.title,
    },
    {
      property: 'og:description',
      content: currentArticle.value?.description,
    },
    {
      property: 'og:image',
      content: currentArticle.value?.coverImage,
    },
    // Twitter Card
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: currentArticle.value?.title,
    },
    {
      name: 'twitter:description',
      content: currentArticle.value?.description,
    },
  ],
  // 结构化数据
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: currentArticle.value?.title,
        description: currentArticle.value?.description,
        image: currentArticle.value?.coverImage,
        datePublished: currentArticle.value?.publishedAt,
        author: {
          '@type': 'Person',
          name: currentArticle.value?.author,
        },
      }),
    },
  ],
}))
</script>

<template>
  <LandingContainer>
    <article v-if="currentArticle" class="max-w-4xl mx-auto px-4 py-12">
      <!-- 文章头部 -->
      <header class="mb-8">
        <h1 class="text-4xl font-bold mb-4" itemprop="headline">
          {{ currentArticle.title }}
        </h1>
        <div class="flex items-center text-gray-600 mb-6">
          <time :datetime="currentArticle.publishedAt" itemprop="datePublished">
            {{ new Date(currentArticle.publishedAt).toLocaleDateString() }}
          </time>
          <span class="mx-2">·</span>
          <span itemprop="author">{{ currentArticle.author }}</span>
          <span class="mx-2">·</span>
          <span>{{ currentArticle.category }}</span>
        </div>
      </header>

      <!-- 特色图片 -->
      <div class="mb-8">
        <img
          :src="currentArticle.coverImage"
          :alt="currentArticle.title"
          class="w-full h-[400px] object-cover rounded-lg shadow-lg"
          itemprop="image"
        />
      </div>

      <!-- 广告位置1 -->
      <div class="my-8 text-center">
        <!-- Google AdSense 广告位 -->
        <div class="ad-slot-1"></div>
      </div>

      <!-- 文章内容 -->
      <div class="prose lg:prose-xl mx-auto" itemprop="articleBody">
        <template v-if="articleContent">
          <div
            v-for="(section, index) in articleContent.content.sections"
            :key="index"
          >
            <!-- 介绍部分 -->
            <div v-if="section.type === 'intro'" class="mb-8">
              <p class="text-lg leading-relaxed">{{ section.text }}</p>
            </div>

            <!-- 普通段落 -->
            <div v-else-if="section.type === 'section'" class="mb-12">
              <h2 class="text-2xl font-bold mb-4">{{ section.title }}</h2>
              <div
                v-for="(content, contentIndex) in section.content"
                :key="contentIndex"
              >
                <!-- 子标题部分 -->
                <div v-if="content.type === 'subsection'" class="mb-6">
                  <h3 class="text-xl font-semibold mb-3">
                    {{ content.title }}
                  </h3>
                  <p class="mb-4">{{ content.text }}</p>
                  <ul v-if="content.list" class="list-disc pl-6 mb-4">
                    <li
                      v-for="(item, itemIndex) in content.list"
                      :key="itemIndex"
                      class="mb-2"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <!-- 文本内容 -->
                <p v-else-if="content.type === 'text'" class="mb-4">
                  {{ content.content }}
                </p>

                <!-- 列表内容 -->
                <ul
                  v-else-if="content.type === 'list'"
                  class="list-disc pl-6 mb-6"
                >
                  <li
                    v-for="(item, itemIndex) in content.items"
                    :key="itemIndex"
                    class="mb-2"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- 广告位置2 -->
      <div class="my-8 text-center">
        <!-- Google AdSense 广告位 -->
        <div class="ad-slot-2"></div>
      </div>

      <!-- 文章页脚 -->
      <footer class="mt-12 pt-8 border-t">
        <!-- 标签 -->
        <div class="flex flex-wrap gap-2 mb-8">
          <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">
            #DigitalSeals
          </span>
          <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">
            #{{ currentArticle.category }}
          </span>
        </div>

        <!-- 作者信息 -->
        <div class="flex items-center bg-gray-50 p-6 rounded-lg">
          <Icon name="heroicons:user-circle" class="w-12 h-12 mr-4" />
          <div>
            <h3 class="font-semibold">{{ currentArticle.author }}</h3>
            <p class="text-gray-600">Digital Seal Expert</p>
          </div>
        </div>
      </footer>
    </article>
  </LandingContainer>
</template>

<style scoped>
.prose {
  max-width: 65ch;
  margin: 0 auto;
}

.prose h2 {
  color: #1a1a1a;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}

.prose h3 {
  color: #2a2a2a;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose p {
  color: #374151;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.prose ul {
  color: #374151;
  margin-bottom: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}
</style>
