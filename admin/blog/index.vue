<!-- app/pages/admin/blog/index.vue -->
<script setup lang="ts">
definePageMeta({
  middleware: ['admin'],
})

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
}

const formData = reactive({
  title: '',
  slug: '',
  description: '',
  content: '',
  keywords: '',
  coverImage: '',
  published: false,
  author: 'DigitalSeal', // 添加作者字段，可以设置默认值
  publishedAt: '', // 添加发布时间字段
})

watch(
  () => formData.title,
  newTitle => {
    formData.slug = generateSlug(newTitle)
  }
)

const { data: posts, refresh } = await useFetch('/api/blog/posts')

// 编辑文章
const editPost = (post: any) => {
  formData.title = post.title
  formData.slug = post.slug
  formData.description = post.description
  formData.content = post.content
  formData.keywords = post.keywords
  formData.coverImage = post.coverImage
  formData.published = post.published
  currentEditId.value = post.id
}

// 删除文章
const deletePost = async (id: number) => {
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to delete this article?',
      'Warning',
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )

    await useFetch(`/api/blog/posts/${id}`, {
      method: 'DELETE',
    })

    ElMessage.success('Article deleted successfully')
    refresh()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Failed to delete article')
    }
  }
}

// 用于跟踪当前编辑的文章ID
const currentEditId = ref<number | null>(null)

// 提交表单
const submitForm = async () => {
  try {
    // 设置发布时间
    if (formData.published && !formData.publishedAt) {
      formData.publishedAt = new Date().toISOString()
    }

    const method = currentEditId.value ? 'PUT' : 'POST'
    const url = currentEditId.value
      ? `/api/blog/posts/${currentEditId.value}`
      : '/api/blog/posts'

    await useFetch(url, {
      method,
      body: formData,
    })

    ElMessage.success(
      currentEditId.value
        ? 'Article updated successfully'
        : 'Article published successfully'
    )

    // 重置表单
    formData.title = ''
    formData.slug = ''
    formData.description = ''
    formData.content = ''
    formData.keywords = ''
    formData.coverImage = ''
    formData.published = false
    formData.author = 'DigitalSeal' // 重置为默认作者
    formData.publishedAt = ''
    currentEditId.value = null

    // 刷新文章列表
    refresh()
  } catch (error) {
    ElMessage.error('Operation failed')
  }
}

// 图片上传相关
const uploadRef = ref()
const handleUploadSuccess = response => {
  // element-plus 会自动处理响应中的 url
  if (response?.url) {
    formData.coverImage = response.url
    ElMessage.success('Image uploaded successfully')
  } else {
    ElMessage.warning('Upload succeeded but no URL returned')
  }
}

// 添加上传错误处理
const handleUploadError = error => {
  console.error('Upload error:', error)
  ElMessage.error(
    'Failed to upload image: ' + (error.message || 'Unknown error')
  )
}

const beforeUpload = file => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('Only image files are allowed!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('Image size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-6">
        {{ currentEditId ? 'Edit Article' : 'Create New Article' }}
      </h1>
      <el-form
        :model="formData"
        label-width="120px"
        class="bg-white p-6 rounded-lg shadow"
      >
        <el-form-item label="Title">
          <el-input v-model="formData.title" />
        </el-form-item>

        <el-form-item label="Slug">
          <el-input v-model="formData.slug" />
        </el-form-item>

        <el-form-item label="Keywords">
          <el-input v-model="formData.keywords" />
        </el-form-item>

        <el-form-item label="Author">
          <el-input v-model="formData.author" />
        </el-form-item>

        <el-form-item label="Description">
          <el-input v-model="formData.description" type="textarea" :rows="3" />
        </el-form-item>

        <el-form-item label="Cover Image">
          <div class="flex items-center gap-4">
            <el-upload
              ref="uploadRef"
              class="avatar-uploader"
              action="/api/blog/upload"
              :headers="{
                Accept: 'application/json',
              }"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :before-upload="beforeUpload"
            >
              <img
                v-if="formData.coverImage"
                :src="formData.coverImage"
                alt="seal design coverImage"
                class="w-[100px] h-[100px] object-cover rounded"
              />
              <el-button v-else type="primary">Upload Image</el-button>
            </el-upload>
            <el-input
              v-model="formData.coverImage"
              placeholder="Or input image URL directly"
            />
          </div>
        </el-form-item>

        <el-form-item label="Content">
          <el-input v-model="formData.content" type="textarea" :rows="15" />
        </el-form-item>

        <el-form-item label="Status">
          <el-switch v-model="formData.published" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">
            {{ currentEditId ? 'Update' : 'Publish' }}
          </el-button>
          <el-button
            v-if="currentEditId"
            @click="
              () => {
                currentEditId = null
                formData = {
                  title: '',
                  slug: '',
                  description: '',
                  content: '',
                  keywords: '',
                  coverImage: '',
                  published: false,
                  author: 'DigitalSeal',
                  publishedAt: '',
                }
              }
            "
          >
            Cancel Edit
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Article List</h2>

      <el-table :data="posts" style="width: 100%">
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="author" label="Author" />
        <el-table-column prop="publishedAt" label="Publish Date">
          <template #default="{ row }">
            {{
              row.publishedAt
                ? new Date(row.publishedAt).toLocaleDateString()
                : 'Not published'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="published" label="Status">
          <template #default="{ row }">
            <el-tag :type="row.published ? 'success' : 'info'">
              {{ row.published ? 'Published' : 'Draft' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operations" width="200">
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" type="primary" @click="editPost(row)">
                Edit
              </el-button>
              <el-button size="small" type="danger" @click="deletePost(row.id)">
                Delete
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped>
.avatar-uploader {
  :deep(.el-upload) {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
  }
}
</style>
