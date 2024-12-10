<template>
  <div class="bg-white border-b border-gray-200 shadow-sm">
    <!-- 上传图片模块 - 始终显示 -->
    <div class="flex justify-center p-6">
      <el-upload
        class="upload-demo"
        action=""
        :auto-upload="false"
        :on-change="handleImageChange"
        accept="image/*"
        :show-file-list="false"
      >
        <template #trigger>
          <el-button type="primary" size="large" class="upload-btn">
            <el-icon class="mr-2"><Upload /></el-icon>
            Select Image
          </el-button>
        </template>
      </el-upload>
    </div>

    <!-- 颜色选择模块 - 仅在有图片时显示 -->
    <template v-if="hasImage">
      <el-card class="color-picker-card">
        <template #header>
          <div class="card-header">
            <span>Select Seal Color</span>
          </div>
        </template>

        <el-row :gutter="10" class="flex items-center">
          <el-col :span="2">
            <input
              v-model="pickerColor"
              type="color"
              class="w-[50px] h-[32px]"
              @change="addColorFromPicker"
            />
          </el-col>
          <el-col :span="4">
            <el-button
              type="primary"
              class="!bg-blue-500"
              @click="addColorFromPicker"
            >
              Add
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          Seal colors in the image (If the image is blurry, please select
          multiple colors to ensure complete seal extraction)
        </el-row>
      </el-card>

      <el-card class="tolerance-card">
        <el-row align="middle" :gutter="20">
          <el-col :span="3">
            <span>Color Tolerance:</span>
          </el-col>
          <el-col :span="12">
            <el-slider v-model="tolerance" :min="5" :max="99" show-input />
          </el-col>
        </el-row>
        <el-row align="middle" :gutter="20">
          Maximum is 99 to ensure complete seal recognition
        </el-row>
      </el-card>

      <div class="selected-colors">
        <el-tag
          v-for="(color, index) in selectedColors"
          :key="index"
          closable
          :style="{
            backgroundColor: rgbToHex(color.r, color.g, color.b),
            color: isLightColor(color.r, color.g, color.b) ? '#000' : '#fff',
            '--el-tag-close-hover-color': isLightColor(
              color.r,
              color.g,
              color.b
            )
              ? '#000'
              : '#fff',
          }"
          :class="[
            isLightColor(color.r, color.g, color.b)
              ? 'light-close-icon'
              : 'dark-close-icon',
          ]"
          @close="removeColor(index)"
        >
          {{ rgbToHex(color.r, color.g, color.b) }}
        </el-tag>
      </div>
    </template>

    <!-- 按钮组 - 根据条件显示不同按钮 -->
    <el-row type="flex" justify="center" class="button-group">
      <template v-if="hasImage && selectedColors.length > 0">
        <el-col :span="5">
          <el-button type="warning" @click="resetColors">
            Reset Colors
          </el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="extractSeal">
            Extract Seal
          </el-button>
        </el-col>
      </template>

      <!-- 下载按钮只在生成了印章后显示 -->
      <template v-if="hasGeneratedSeal">
        <el-col :span="5">
          <el-button type="primary" @click="downloadSealWithWatermark">
            Download Seal
          </el-button>
        </el-col>
        <el-col :span="5">
          <el-button
            type="success"
            class="premium-button"
            :loading="payLoading"
            @click="downloadSealWithoutWatermark"
          >
            Download without watermark
            <el-tag size="small" effect="dark" class="premium-tag">
              vip
            </el-tag>
          </el-button>
        </el-col>
      </template>
    </el-row>

    <div class="canvas-container">
      <canvas ref="sourceCanvas" />
      <canvas ref="outputCanvas" />
      <canvas ref="tempCanvas" style="display: none" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue' // 添加 watch 导入

const sourceCanvas = ref(null)
const outputCanvas = ref(null)
const selectedColors = ref([])
const sourceImage = ref(null)
const tempCanvas = ref(null)
const payLoading = ref(false)
const pickerColor = ref('#ff0000')
const tolerance = ref(50)

// 添加新的响应式变量来控制显示状态
const hasImage = ref(false)
const hasGeneratedSeal = ref(false)

const rgbColor = reactive({
  r: 255,
  g: 0,
  b: 0,
})

// 下载带水印的印章
const downloadSealWithWatermark = () => {
  if (!outputCanvas.value) {
    ElMessage.warning('Please generate the seal first')
    return
  }

  // 获取带水印的canvas (outputCanvas就是最终显示的带水印的canvas)
  const dataURL = outputCanvas.value.toDataURL('image/png')
  downloadImage(dataURL, 'seal_with_watermark.png')
}

const { handlePayment, isPolling, pollPaymentStatus } = usePayment()
const router = useRouter()

const checkAuth = async () => {
  const session = await useUserSession()

  if (!session.user.value?.email) {
    ElMessage.warning('Please login first')
    router.push('/signin') // 重定向到登录页面
    return false
  }
  return true
}

// 下载无水印印章
const downloadSealWithoutWatermark = async () => {
  if (!(await checkAuth())) return

  if (!tempCanvas.value) {
    ElMessage.warning('Please generate the seal first')
    return
  }

  if (!(await checkAuth())) return
  const dataURL = tempCanvas.value.toDataURL('image/png')

  payLoading.value = true
  try {
    const session = await useUserSession()
    const { data: paymentStatus } = await useFetch('/api/user/payment-status')

    console.log('Payment status check:', paymentStatus.value)

    if (paymentStatus.value?.subscription) {
      console.log('User has active subscription')

      // 获取无水印的canvas (tempCanvas是生成水印之前的临时canvas)
      downloadImage(dataURL, 'seal_without_watermark.png')
      return
    }

    console.log('No active subscription or one-time purchase found')

    // 确保回调函数被正确传入和执行
    handlePayment('one_time', () => {
      console.log('支付成功回调执行，开始下载图片')
      // 获取无水印的canvas (tempCanvas是生成水印之前的临时canvas)
      downloadImage(dataURL, 'seal_without_watermark.png')
    })
  } catch (error) {
    console.error('Save error:', error)
    ElMessage.error('Failed to process the request')
  } finally {
    payLoading.value = false
  }
}

// 通用的下载图片方法
const downloadImage = (dataURL, filename) => {
  try {
    const link = document.createElement('a')
    link.download = filename
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    ElMessage.success('Download successful')
  } catch (error) {
    console.error('Download error:', error)
    ElMessage.error('Download failed')
  }
}

// 修改 handleImageChange 函数
const handleImageChange = file => {
  if (file.raw) {
    const reader = new FileReader()
    reader.onload = event => {
      sourceImage.value = new Image()
      sourceImage.value.onload = () => {
        const canvas = sourceCanvas.value
        canvas.width = sourceImage.value.width
        canvas.height = sourceImage.value.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(sourceImage.value, 0, 0)
        hasImage.value = true // 设置图片已上传标志
        hasGeneratedSeal.value = false // 重置生成印章标志
      }
      sourceImage.value.src = event.target.result
    }
    reader.readAsDataURL(file.raw)
  }
}
const addColorFromPicker = () => {
  const colorHex = pickerColor.value
  const r = parseInt(colorHex.substr(1, 2), 16)
  const g = parseInt(colorHex.substr(3, 2), 16)
  const b = parseInt(colorHex.substr(5, 2), 16)
  addSelectedColor(r, g, b)
}

// 新增 RGB 转 HEX 的函数
const rgbToHex = (r, g, b) => {
  const toHex = n => {
    const hex = n.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// 判断颜色是否为浅色，用于决定文字颜色
const isLightColor = (r, g, b) => {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128
}

const addColorFromRGB = () => {
  const { r, g, b } = rgbColor
  if (
    isNaN(r) ||
    isNaN(g) ||
    isNaN(b) ||
    r < 0 ||
    r > 255 ||
    g < 0 ||
    g > 255 ||
    b < 0 ||
    b > 255
  ) {
    ElMessage.error('Please enter valid RGB values (0-255)')
    return
  }
  addSelectedColor(r, g, b)
}

const addSelectedColor = (r, g, b) => {
  selectedColors.value.push({ r, g, b })
}

const removeColor = index => {
  selectedColors.value.splice(index, 1)
}

const rgbToHsv = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    v = max

  const d = max - min
  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 180),
    s: Math.round(s * 255),
    v: Math.round(v * 255),
  }
}

const extractSeal = async () => {
  if (!sourceImage.value || selectedColors.value.length === 0) {
    ElMessage.warning('Please upload an image and select colors first')
    return
  }

  try {
    const src = cv.imread(sourceCanvas.value)
    const hsv = new cv.Mat()
    cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB)
    cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV)

    const mask = new cv.Mat.zeros(hsv.rows, hsv.cols, cv.CV_8UC1)

    for (const color of selectedColors.value) {
      const hsv_color = rgbToHsv(color.r, color.g, color.b)

      const hueRange = Math.min(30, tolerance.value * 0.3)
      const satRange = Math.min(100, tolerance.value * 1.2)
      const valRange = Math.min(100, tolerance.value * 1.2)

      const lowH = (hsv_color.h - hueRange + 180) % 180
      const highH = (hsv_color.h + hueRange) % 180

      const lowS = Math.max(0, hsv_color.s - satRange)
      const highS = Math.min(255, hsv_color.s + satRange)

      const lowV = Math.max(0, hsv_color.v - valRange)
      const highV = Math.min(255, hsv_color.v + valRange)

      const colorMask = new cv.Mat()

      if (lowH > highH) {
        const mask1 = new cv.Mat()
        const mask2 = new cv.Mat()

        const low1 = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [
          0,
          lowS,
          lowV,
          0,
        ])
        const high1 = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [
          highH,
          highS,
          highV,
          255,
        ])

        const low2 = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [
          lowH,
          lowS,
          lowV,
          0,
        ])
        const high2 = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [
          179,
          highS,
          highV,
          255,
        ])

        cv.inRange(hsv, low1, high1, mask1)
        cv.inRange(hsv, low2, high2, mask2)
        cv.bitwise_or(mask1, mask2, colorMask)

        low1.delete()
        high1.delete()
        low2.delete()
        high2.delete()
        mask1.delete()
        mask2.delete()
      } else {
        const low = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [
          lowH,
          lowS,
          lowV,
          0,
        ])
        const high = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [
          highH,
          highS,
          highV,
          255,
        ])
        cv.inRange(hsv, low, high, colorMask)
        low.delete()
        high.delete()
      }

      cv.bitwise_or(mask, colorMask, mask)
      colorMask.delete()
    }

    const kernelSize = Math.max(
      3,
      Math.min(7, Math.floor(tolerance.value / 25))
    )
    const kernel = cv.getStructuringElement(
      cv.MORPH_ELLIPSE,
      new cv.Size(kernelSize, kernelSize)
    )
    const kernelBig = cv.getStructuringElement(
      cv.MORPH_ELLIPSE,
      new cv.Size(kernelSize + 2, kernelSize + 2)
    )

    cv.morphologyEx(mask, mask, cv.MORPH_CLOSE, kernel)
    cv.morphologyEx(mask, mask, cv.MORPH_OPEN, kernel)
    cv.morphologyEx(mask, mask, cv.MORPH_CLOSE, kernelBig)

    const dst = new cv.Mat()
    src.copyTo(dst, mask)

    // 设置临时canvas的尺寸
    tempCanvas.value.width = dst.cols
    tempCanvas.value.height = dst.rows

    // 将处理后的图像绘制到临时canvas
    cv.imshow(tempCanvas.value, dst)

    // cv.imshow(outputCanvas.value, dst)
    // 设置输出canvas的尺寸
    outputCanvas.value.width = dst.cols
    outputCanvas.value.height = dst.rows

    // 获取输出canvas的上下文
    const outputCtx = outputCanvas.value.getContext('2d')

    // 清空输出canvas
    outputCtx.clearRect(
      0,
      0,
      outputCanvas.value.width,
      outputCanvas.value.height
    )

    // 将临时canvas的内容绘制到输出canvas
    outputCtx.drawImage(tempCanvas.value, 0, 0)

    // 添加水印
    addWatermark(outputCanvas.value)

    outputCanvas.value.style.display = 'block'

    src.delete()
    hsv.delete()
    mask.delete()
    kernel.delete()
    kernelBig.delete()
    dst.delete()
    hasGeneratedSeal.value = true // 设置已生成印章标志
  } catch (error) {
    console.error('Error processing image:', error)
    ElMessage.error('Error processing image: ' + error.message)
  }
}
const resetColors = () => {
  selectedColors.value = []
  hasGeneratedSeal.value = false // 重置生成印章标志
}

// 添加 watch
watch(
  tolerance,
  newValue => {
    // 确保已经上传了图片并选择了颜色才执行
    if (sourceImage.value && selectedColors.value.length > 0) {
      extractSeal()
    }
  },
  {
    // 可选配置
    immediate: false, // 初始化时不执行
    debounce: 300, // 添加防抖，避免频繁执行
  }
)

// 添加水印函数
const addWatermark = (canvas, text) => {
  const ctx = canvas.getContext('2d')
  const { width, height } = canvas

  // 保存当前的canvas状态
  ctx.save()

  // 设置水印文字样式
  ctx.font = '16px Arial'
  ctx.fillStyle = 'rgba(128, 128, 128, 0.5)' // 半透明灰色
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // 旋转画布并绘制多行水印
  ctx.translate(width / 2, height / 2)
  ctx.rotate(-Math.PI / 6) // 倾斜 -30 度

  const watermarkText = text || 'Seal Digital'
  const lineHeight = 100
  const columnWidth = 200

  for (let y = -height; y < height; y += lineHeight) {
    for (let x = -width; x < width; x += columnWidth) {
      ctx.fillText(watermarkText, x, y)
    }
  }

  // 恢复canvas状态
  ctx.restore()
}
</script>

<style scoped>
.box-card {
  margin: 20px;
}

.color-picker-card,
.tolerance-card {
  margin-top: 20px;
}

.selected-colors {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.button-group {
  margin: 20px 0;
}

.canvas-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

canvas {
  max-width: 45%;
  height: auto;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 32px;
}

.color-input {
  width: 50px;
  height: 32px;
}

.rgb-container {
  display: flex;
  align-items: center;
  height: 32px;
}

.form-container {
  display: flex;
  align-items: center;
}

.color-input {
  width: 50px;
  height: 32px;
}

:deep(.light-close-icon .el-tag__close) {
  color: #000;
}

:deep(.dark-close-icon .el-tag__close) {
  color: #fff;
}

:deep(.el-tag__close:hover) {
  background-color: transparent;
}

.upload-btn {
  padding: 12px 24px;
  font-size: 16px;
}

:deep(.el-upload-list) {
  display: none;
}
</style>
