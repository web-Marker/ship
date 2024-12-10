<template>
  <!-- 顶部工具栏(原左侧工具栏) -->
  <div class="h-26 bg-white border-b border-gray-200 shadow-sm">
    <div class="mx-auto flex flex-col h-full">
      <!-- 第一行：标题 -->
      <div class="flex items-center h-12 border-b border-gray-100 pb-2">
        <!-- Stamp template -->
        <div
          class="flex items-center cursor-pointer group"
          @click="activeMenu = -1"
        >
          <el-icon class="text-[14px] text-gray-600 group-hover:text-blue-600">
            <Search />
          </el-icon>
          <span
            class="ml-1.5 text-sm font-medium text-gray-700 group-hover:text-blue-600"
          >
            Stamp template
          </span>
        </div>
      </div>

      <!-- 第二行：菜单项和设置 -->
      <div class="flex items-center flex-wrap h-26 mt-1">
        <!-- Stamp Setting -->
        <div class="flex items-center">
          <span class="ml-1.5 text-sm font-medium text-gray-700">
            Stamp Setting
          </span>
        </div>

        <!-- 分隔线 -->
        <div class="h-4 w-px bg-gray-300 mx-3"></div>

        <!-- 菜单项 -->
        <div
          v-for="(item, index) in menuItems"
          :key="index"
          class="pr-5 py-3 px-2 flex items-center hover:bg-gray-100 cursor-pointer transition-colors group border-b-2 text-sm"
          :class="[
            activeMenu === item.id
              ? 'border-blue-500 bg-gray-100 '
              : 'border-transparent hover:border-blue-500',
          ]"
          @click="activeMenu = item.id"
        >
          <el-icon class="text-gray-600 group-hover:text-blue-600 text-[14px]">
            <component :is="item.icon" />
          </el-icon>
          <span class="ml-1.5 text-gray-700 group-hover:text-blue-600">
            {{ item.text }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <!-- 主要内容区域 -->
  <div class="flex-1 flex p-4">
    <!-- Canvas 区域 -->
    <div class="flex-1 bg-white rounded-lg shadow-sm overflow-hidden mr-4">
      <div class="w-full h-full flex items-center justify-center">
        <canvas ref="stampCanvas"></canvas>
      </div>
    </div>

    <!-- 右侧设置区域(原底部设置区域) -->
    <div
      class="setting w-72 bg-white rounded-lg shadow-sm flex flex-col"
      style="height: 600px"
    >
      <!-- 模板列表，仅在 Stamp template 激活时显示 -->
      <div class="flex-1 overflow-y-auto p-4">
        <div v-show="activeMenu === -1" class="template-list">
          <div class="template-category">
            <div class="flex flex-col space-y-4">
              <div
                v-for="(template, index) in defaultTemplates"
                :key="'default-' + index"
                class="template-item cursor-pointer hover:opacity-80 transition-opacity flex flex-col items-center"
                @click="loadDefaultTemplate(template)"
              >
                <div
                  class="template-preview w-24 h-24 rounded overflow-hidden border border-gray-200"
                  :class="{
                    'template-active': currentTemplateIndex === -1 - index,
                  }"
                >
                  <img
                    :src="template.preview"
                    alt="模板预览"
                    class="w-full h-full object-contain"
                  />
                </div>
                <div class="template-info mt-2">
                  <span class="template-name text-sm text-gray-600">
                    {{ template.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Basic 设置 -->
        <div v-show="activeMenu === 0">
          <div class="flex flex-col items-center w-full max-w-[600px] mx-auto">
            <div class="w-full space-y-4">
              <!-- 印章宽度 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Seal Width</label
                >
                <el-input-number
                  v-model="drawStampWidth"
                  :min="1"
                  :max="50"
                  :step="1"
                  class="w-[200px]"
                >
                  <template #suffix>mm</template>
                </el-input-number>
              </div>

              <!-- 印章高度 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Seal Height</label
                >
                <el-input-number
                  v-model="drawStampHeight"
                  :min="1"
                  :max="50"
                  :step="1"
                  class="w-[200px]"
                >
                  <template #suffix>mm</template>
                </el-input-number>
              </div>

              <!-- 圆形边框宽度 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Circle Border Width</label
                >
                <el-input-number
                  v-model="circleBorderWidth"
                  :min="0.1"
                  :max="10"
                  :step="0.1"
                  class="w-[200px]"
                >
                  <template #suffix>mm</template>
                </el-input-number>
              </div>

              <!-- 印章颜色 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Seal Color</label
                >
                <input
                  v-model="primaryColor"
                  type="color"
                  class="w-[200px] h-[32px] rounded border border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Text 1 设置 -->
        <div
          v-show="activeMenu === 1"
          class="flex flex-col items-center w-full max-w-[600px] mx-auto"
        >
          <div class="flex flex-col items-center w-full max-w-[600px] mx-auto">
            <div
              v-for="(company, index) in companyList"
              :key="index"
              class="w-full mb-6 rounded"
            >
              <!-- 标题行 -->
              <div class="flex justify-between items-center mb-4">
                <span class="text-gray-600">Row {{ index + 1 }}</span>
                <el-button
                  type="danger"
                  size="small"
                  @click="removeCompany(index)"
                  >Delete</el-button
                >
              </div>

              <!-- 表单内容 -->
              <div class="space-y-4">
                <!-- 公司名称 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Company Name</label
                  >
                  <el-input v-model="company.companyName" class="flex-1" />
                </div>

                <!-- 字体 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Font</label
                  >
                  <div class="flex gap-2 flex-1">
                    <el-select
                      v-model="company.fontFamily"
                      class="flex-1"
                      @change="updateFontPreview"
                    >
                      <el-option
                        v-for="font in systemFonts"
                        :key="font"
                        :label="font"
                        :value="font"
                        :style="{ fontFamily: font }"
                      />
                    </el-select>
                  </div>
                </div>

                <!-- 字体大小 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Font Size (mm)</label
                  >
                  <el-input-number
                    v-model="company.fontHeight"
                    :min="1"
                    :max="10"
                    :step="0.1"
                    size="default"
                    class="w-[200px]"
                  />
                </div>

                <!-- 字体粗细 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Font Weight</label
                  >
                  <el-select v-model="company.fontWeight" class="w-[200px]">
                    <el-option label="normal" value="normal" />
                    <el-option label="bold" value="bold" />
                    <el-option label="100" value="100" />
                    <el-option label="200" value="200" />
                    <el-option label="300" value="300" />
                    <el-option label="400" value="400" />
                    <el-option label="500" value="500" />
                    <el-option label="600" value="600" />
                    <el-option label="700" value="700" />
                    <el-option label="800" value="800" />
                    <el-option label="900" value="900" />
                  </el-select>
                </div>

                <!-- 压缩比例 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Compression Ratio</label
                  >
                  <el-input-number
                    v-model="company.compression"
                    :min="0.5"
                    :max="1.5"
                    :step="0.05"
                    :precision="2"
                    class="w-[200px]"
                  />
                </div>

                <!-- 分布因子 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Distribution Factor</label
                  >
                  <el-input-number
                    v-model="company.textDistributionFactor"
                    :min="0"
                    :max="50"
                    :step="0.1"
                    :precision="2"
                    class="w-[200px]"
                  />
                </div>

                <!-- 边距 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Margin (mm)</label
                  >
                  <el-input-number
                    v-model="company.borderOffset"
                    :min="-10"
                    :max="10"
                    :step="0.05"
                    class="w-[200px]"
                  />
                </div>

                <!-- 调整椭圆文字 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"></label>
                  <el-checkbox v-model="company.adjustEllipseText"
                    >Adjust Ellipse Text</el-checkbox
                  >
                </div>

                <!-- 椭圆文字调整 -->
                <div v-if="company.adjustEllipseText" class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >adjustmen</label
                  >
                  <el-input-number
                    v-model="company.adjustEllipseTextFactor"
                    :min="0"
                    :max="2"
                    :step="0.01"
                    :precision="2"
                    class="w-[200px]"
                  />
                </div>

                <!-- 开始角度 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Start Angle</label
                  >
                  <el-input-number
                    v-model="company.startAngle"
                    :min="-6.5"
                    :max="6.5"
                    :step="0.01"
                    :precision="2"
                    class="w-[200px]"
                  />
                </div>

                <!-- 旋转方向 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Rotation Direction</label
                  >
                  <el-select
                    v-model="company.rotateDirection"
                    class="w-[200px]"
                  >
                    <el-option label="Clockwise" value="clockwise" />
                    <el-option
                      label="Counterclockwise"
                      value="counterclockwise"
                    />
                  </el-select>
                </div>
              </div>
            </div>

            <!-- 添加按钮 -->
            <el-button type="primary" class="mt-4" @click="addNewCompany"
              >Add New Row</el-button
            >
          </div>
        </div>

        <!-- Text 2 设置 -->
        <div v-show="activeMenu === 2">
          <div class="flex flex-col items-center w-full max-w-[600px] mx-auto">
            <div
              v-for="(type, index) in stampTypeList"
              :key="index"
              class="w-full mb-6 bg-white rounded"
            >
              <!-- 标题行 -->
              <div class="flex justify-between items-center mb-4">
                <span class="text-gray-600">Row {{ index + 1 }}</span>
                <el-button type="danger" size="small" @click="removeStampType"
                  >Delete</el-button
                >
              </div>

              <!-- 表单内容 -->
              <div class="space-y-4">
                <!-- 文字内容 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Text Content</label
                  >
                  <el-input v-model="type.stampType" class="flex-1" />
                </div>

                <!-- 字体大小 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Font Size (mm)</label
                  >
                  <el-input-number
                    v-model="type.fontHeight"
                    :min="1"
                    :max="10"
                    :step="0.1"
                    size="default"
                    class="w-[200px]"
                  />
                </div>

                <!-- 字体 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Font</label
                  >
                  <div class="flex gap-2 flex-1">
                    <el-select v-model="type.fontFamily" class="flex-1">
                      <el-option
                        v-for="font in systemFonts"
                        :key="font"
                        :label="font"
                        :value="font"
                        :style="{ fontFamily: font }"
                      />
                    </el-select>
                    <el-input
                      v-model="type.fontFamily"
                      placeholder="Enter Font Name"
                      class="flex-1"
                    />
                  </div>
                </div>

                <!-- 字体粗细 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Font Weight</label
                  >
                  <el-select v-model="type.fontWeight" class="w-[200px]">
                    <el-option label="normal" value="normal" />
                    <el-option label="bold" value="bold" />
                    <el-option label="100" value="100" />
                    <el-option label="200" value="200" />
                    <el-option label="300" value="300" />
                    <el-option label="400" value="400" />
                    <el-option label="500" value="500" />
                    <el-option label="600" value="600" />
                    <el-option label="700" value="700" />
                    <el-option label="800" value="800" />
                    <el-option label="900" value="900" />
                  </el-select>
                </div>

                <!-- 压缩比例 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Compression Ratio</label
                  >
                  <el-input-number
                    v-model="type.compression"
                    :min="0.1"
                    :max="1.5"
                    :step="0.05"
                    :precision="2"
                    class="w-[200px]"
                  />
                </div>

                <!-- 字符间距 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Letter Spacing (mm)</label
                  >
                  <el-input-number
                    v-model="type.letterSpacing"
                    :min="-1"
                    :max="10"
                    :step="0.05"
                    :precision="2"
                    class="w-[200px]"
                  />
                </div>

                <!-- 垂直位置 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Vertical Position (mm)</label
                  >
                  <el-input-number
                    v-model="type.positionY"
                    :min="-20"
                    :max="20"
                    :step="0.5"
                    class="w-[200px]"
                  />
                </div>
              </div>
            </div>

            <!-- 添加按钮 -->
            <el-button type="primary" class="mt-4" @click="addNewStampType"
              >Add New Row</el-button
            >
          </div>
        </div>

        <!-- Text 3 设置 -->
        <div v-show="activeMenu === 3">
          <div class="flex flex-col items-center w-full max-w-[600px] mx-auto">
            <div class="w-full space-y-4">
              <!-- 印章编码 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Seal Code</label
                >
                <el-input v-model="stampCode" class="flex-1" />
              </div>

              <!-- 字体选择 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600">Font</label>
                <div class="flex gap-2 flex-1">
                  <el-select
                    v-model="codeFontFamily"
                    class="flex-1"
                    @change="updateFontPreview"
                  >
                    <el-option
                      v-for="font in systemFonts"
                      :key="font"
                      :label="font"
                      :value="font"
                      :style="{ fontFamily: font }"
                    />
                  </el-select>
                </div>
              </div>

              <!-- 字体大小 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600">
                  Font Size (mm)</label
                >
                <el-input-number
                  v-model="codeFontSizeMM"
                  :step="0.1"
                  class="w-[200px]"
                />
              </div>

              <!-- 字体粗细 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Font Weight</label
                >
                <el-select v-model="codeFontWeight" class="w-[200px]">
                  <el-option label="normal" value="normal" />
                  <el-option label="bold" value="bold" />
                  <el-option label="100" value="100" />
                  <el-option label="200" value="200" />
                  <el-option label="300" value="300" />
                  <el-option label="400" value="400" />
                  <el-option label="500" value="500" />
                  <el-option label="600" value="600" />
                  <el-option label="700" value="700" />
                  <el-option label="800" value="800" />
                  <el-option label="900" value="900" />
                </el-select>
              </div>

              <!-- 压缩比例 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Compression Ratio</label
                >
                <el-input-number
                  v-model="codeCompression"
                  :min="0.0"
                  :max="3"
                  :step="0.01"
                  :precision="2"
                  class="w-[200px]"
                />
              </div>

              <!-- 分布因子 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Distribution Factor</label
                >
                <el-input-number
                  v-model="codeDistributionFactor"
                  :min="0"
                  :max="100"
                  :step="0.5"
                  :precision="1"
                  class="w-[200px]"
                />
              </div>

              <!-- 边距 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Margin (mm)</label
                >
                <el-input-number
                  v-model="codeMarginMM"
                  :min="-10"
                  :max="20"
                  :step="0.05"
                  class="w-[200px]"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Text 4 设置 -->
        <div v-show="activeMenu === 4">
          <div class="flex flex-col items-center w-full max-w-[600px] mx-auto">
            <div class="w-full space-y-4">
              <!-- 税号 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >ID number</label
                >
                <el-input v-model="taxNumberValue" class="w-[200px]" />
              </div>

              <!-- 字体 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600">Font</label>
                <div class="flex gap-2 w-[200px]">
                  <el-select
                    v-model="taxNumberFontFamily"
                    class="w-1/2"
                    @change="updateFontPreview"
                  >
                    <el-option
                      v-for="font in systemFonts"
                      :key="font"
                      :label="font"
                      :value="font"
                      :style="{ fontFamily: font }"
                    />
                  </el-select>
                </div>
              </div>

              <!-- 字体粗细 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Font Weight</label
                >
                <el-select v-model="taxNumberFontWeight" class="w-[200px]">
                  <el-option label="normal" value="normal" />
                  <el-option label="bold" value="bold" />
                  <el-option label="100" value="100" />
                  <el-option label="200" value="200" />
                  <el-option label="300" value="300" />
                  <el-option label="400" value="400" />
                  <el-option label="500" value="500" />
                  <el-option label="600" value="600" />
                  <el-option label="700" value="700" />
                  <el-option label="800" value="800" />
                  <el-option label="900" value="900" />
                </el-select>
              </div>

              <!-- 压缩比例 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Compression Ratio</label
                >
                <el-input-number
                  v-model="taxNumberCompression"
                  :min="0"
                  :max="3"
                  :step="0.01"
                  :precision="2"
                  class="w-[200px]"
                />
              </div>

              <!-- 字符间距 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Letter Spacing</label
                >
                <el-input-number
                  v-model="taxNumberLetterSpacing"
                  :min="-1"
                  :max="20"
                  :step="0.05"
                  :precision="2"
                  class="w-[200px]"
                >
                </el-input-number>
              </div>

              <!-- 垂直位置调整 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Vertical Position</label
                >
                <el-input-number
                  v-model="taxNumberPositionY"
                  :min="-10"
                  :max="10"
                  :step="0.1"
                  :precision="1"
                  class="w-[200px]"
                >
                </el-input-number>
              </div>
            </div>
          </div>
        </div>

        <!-- Image 设置 -->
        <div v-show="activeMenu === 5">
          <div class="flex flex-col items-center w-full max-w-[600px] mx-auto">
            <div class="w-full space-y-4">
              <el-card
                v-for="(image, index) in imageList"
                :key="index"
                class="w-full"
              >
                <!-- 图片标题和删除按钮 -->
                <template #header>
                  <div class="flex justify-between items-center">
                    <span class="font-medium">Image {{ index + 1 }}</span>
                    <el-button
                      type="danger"
                      size="small"
                      :icon="Delete"
                      @click="removeImage(index)"
                      >Delete</el-button
                    >
                  </div>
                </template>

                <div class="space-y-4">
                  <!-- 图片预览 -->
                  <div v-if="image.imageUrl" class="w-full flex justify-center">
                    <el-image
                      :src="image.imageUrl"
                      fit="contain"
                      class="max-h-[200px] object-contain"
                    />
                  </div>

                  <!-- 选择图片 -->
                  <div class="flex items-center">
                    <label class="min-w-[120px] text-sm text-gray-600"
                      >Select Image</label
                    >
                    <el-upload
                      class="w-[200px]"
                      accept="image/*"
                      :auto-upload="false"
                      :show-file-list="false"
                      @change="file => handleImageUpload(file, index)"
                    >
                      <el-button type="primary">Select Image</el-button>
                    </el-upload>
                  </div>

                  <!-- 图片宽度 -->
                  <div class="flex items-center">
                    <label class="min-w-[120px] text-sm text-gray-600">
                      Image Width</label
                    >

                    <el-input-number
                      v-model="image.imageWidth"
                      :min="1"
                      :max="100"
                      :step="0.5"
                      :precision="1"
                      class="w-[200px]"
                      :controls-position="'right'"
                    >
                      <template #append>mm</template>
                    </el-input-number>
                  </div>

                  <!-- 图片高度 -->
                  <div class="flex items-center">
                    <label class="min-w-[120px] text-sm text-gray-600"
                      >Image Height</label
                    >
                    <el-input-number
                      v-model="image.imageHeight"
                      :min="1"
                      :max="100"
                      :step="0.5"
                      :precision="1"
                      class="w-[200px]"
                      :controls-position="'right'"
                    >
                      <template #append>mm</template>
                    </el-input-number>
                  </div>

                  <!-- 水平位置 -->
                  <div class="flex items-center">
                    <label class="min-w-[120px] text-sm text-gray-600"
                      >Horizontal Position</label
                    >
                    <el-input-number
                      v-model="image.positionX"
                      :min="-20"
                      :max="20"
                      :step="0.5"
                      :precision="1"
                      class="w-[200px]"
                      :controls-position="'right'"
                    >
                      <template #append>mm</template>
                    </el-input-number>
                  </div>

                  <!-- 垂直位置 -->
                  <div class="flex items-center">
                    <label class="min-w-[120px] text-sm text-gray-600">
                      Vertical Position</label
                    >
                    <el-input-number
                      v-model="image.positionY"
                      :min="-20"
                      :max="20"
                      :step="0.5"
                      :precision="1"
                      class="w-[200px]"
                      :controls-position="'right'"
                    >
                      <template #append>mm</template>
                    </el-input-number>
                  </div>

                  <!-- 保持宽高比 -->
                  <div class="flex items-center">
                    <label class="min-w-[120px] text-sm text-gray-600"
                      >Keep Aspect Ratio</label
                    >
                    <el-switch v-model="image.keepAspectRatio" />
                  </div>
                </div>
              </el-card>
            </div>

            <!-- 添加按钮 -->
            <div class="flex justify-center mt-4">
              <el-button type="primary" :icon="Plus" @click="addNewImage"
                >Add Pictures</el-button
              >
            </div>
          </div>
        </div>

        <!-- Anti-counterfeiting 设置 -->
        <div v-show="activeMenu === 6">
          <div class="flex flex-col items-center w-full max-w-[600px] mx-auto">
            <div class="w-full space-y-4">
              <!-- 启用防伪纹路 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Enable Security Pattern</label
                >
                <el-switch v-model="securityPatternEnabled" />
              </div>

              <!-- 刷新按钮 -->
              <el-button type="primary" @click="drawStamp(true, false)">
                Refresh Pattern
              </el-button>

              <!-- 纹路数量 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Pattern Count</label
                >
                <el-input-number
                  v-model="securityPatternCount"
                  :min="1"
                  :max="100"
                  :step="1"
                  class="w-[200px]"
                />
              </div>

              <!-- 纹路长度 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Pattern Length (mm)</label
                >
                <el-input-number
                  v-model="securityPatternLength"
                  :min="0.1"
                  :max="100"
                  :step="0.1"
                  :precision="1"
                  class="w-[200px]"
                />
              </div>

              <!-- 纹路宽度 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Pattern Width (mm)</label
                >
                <el-input-number
                  v-model="securityPatternWidth"
                  :min="0.05"
                  :max="0.5"
                  :step="0.05"
                  :precision="2"
                  class="w-[200px]"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Burr effect settings -->
        <div v-show="activeMenu === 7">
          <div class="flex flex-col items-center w-full max-w-[600px] mx-auto">
            <div class="w-full space-y-4">
              <!-- 启用毛边效果 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Enable Burr Effect</label
                >
                <el-switch v-model="shouldDrawRoughEdge" />
              </div>

              <!-- 毛边相关设置 -->
              <template v-if="shouldDrawRoughEdge">
                <!-- 毛边宽度 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Burr Width (mm)</label
                  >
                  <el-input-number
                    v-model="roughEdgeWidth"
                    :min="0.05"
                    :max="0.5"
                    :step="0.05"
                    :precision="2"
                    class="w-[200px]"
                  />
                </div>

                <!-- 毛边高度 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Burr Height (mm)</label
                  >
                  <el-input-number
                    v-model="roughEdgeHeight"
                    :min="0.1"
                    :max="5"
                    :step="0.1"
                    :precision="1"
                    class="w-[200px]"
                  />
                </div>

                <!-- 毛边概率 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Burr Probability</label
                  >
                  <el-input-number
                    v-model="roughEdgeProbability"
                    :min="0"
                    :max="1"
                    :step="0.1"
                    :precision="2"
                    class="w-[200px]"
                  />
                </div>

                <!-- 毛边偏移 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600">
                    Burr Offset (mm)</label
                  >
                  <el-input-number
                    v-model="roughEdgeShift"
                    :min="-10"
                    :max="10"
                    :step="0.1"
                    :precision="2"
                    class="w-[200px]"
                  />
                </div>

                <!-- 毛边点数 -->
                <div class="flex items-center">
                  <label class="min-w-[120px] text-sm text-gray-600"
                    >Burr Points</label
                  >
                  <el-input-number
                    v-model="roughEdgePoints"
                    :min="100"
                    :max="1000"
                    :step="10"
                    class="w-[200px]"
                  />
                </div>

                <!-- 刷新按钮 -->
                <el-button
                  type="primary"
                  @click="drawStamp(false, false, true)"
                >
                  Refresh Burr
                </el-button>
              </template>
            </div>
          </div>
        </div>

        <!-- Stamp aging 设置 -->
        <div v-show="activeMenu === 8">
          <div class="flex flex-col items-center w-full max-w-[600px] mx-auto">
            <div class="w-full space-y-4">
              <!-- 启用做旧效果 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Enable Aging Effect</label
                >
                <el-switch v-model="applyAging" />
              </div>

              <!-- 手动做旧 -->
              <div class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600">
                  Manual Aging</label
                >
                <el-switch v-model="manualAging" />
              </div>

              <!-- 做旧强度 -->
              <div v-if="applyAging" class="flex items-center">
                <label class="min-w-[120px] text-sm text-gray-600"
                  >Aging Intensity</label
                >
                <el-input-number
                  v-model="agingIntensity"
                  :min="0"
                  :max="100"
                  :step="1"
                  class="w-[200px]"
                />
              </div>

              <!-- 刷新按钮 -->
              <el-button type="primary" @click="drawStamp(false, true)">
                Refresh Aging
              </el-button>
            </div>
          </div>
          <!-- Stamp aging 的具体设置内容 -->
        </div>

        <!-- Inner circle 设置 -->
        <div v-show="activeMenu === 9">
          <div class="flex flex-col items-center w-full max-w-[600px] mx-auto">
            <div class="w-full space-y-4">
              <el-button type="primary" @click="addNewInnerCircle">
                Add New Row
              </el-button>

              <!-- 内圈配置列表 -->
              <div
                v-for="(innerCircle, index) in innerCircleList"
                :key="index"
                class="w-full p-4 bg-gray-50 rounded-lg space-y-4"
              >
                <!-- 标题和删除按钮 -->
                <div class="flex items-center justify-between mb-4">
                  <span class="text-lg font-medium">Row {{ index + 1 }} </span>
                  <el-button
                    type="danger"
                    size="small"
                    @click="removeInnerCircle(index)"
                  >
                    Delete
                  </el-button>
                </div>

                <!-- 内圈圆线宽 -->
                <div class="flex items-center justify-between w-full">
                  <label class="text-sm text-gray-600 w-[100px]"
                    >Width (mm)</label
                  >
                  <el-input-number
                    v-model="innerCircle.innerCircleLineWidth"
                    :min="0.05"
                    :max="0.5"
                    :step="0.05"
                    :precision="2"
                  />
                </div>

                <!-- 内圈圆半径X -->
                <div class="flex items-center justify-between w-full">
                  <label class="text-sm text-gray-600 w-[100px]"
                    >Inner Circle Radius X (mm)</label
                  >
                  <el-input-number
                    v-model="innerCircle.innerCircleLineRadiusX"
                    :min="1"
                    :max="50"
                    :step="0.1"
                    :precision="1"
                  />
                </div>

                <!-- 内圈圆半径Y -->
                <div class="flex items-center justify-between w-full">
                  <label class="text-sm text-gray-600 w-[100px]"
                    >Inner Circle Radius Y (mm)</label
                  >
                  <el-input-number
                    v-model="innerCircle.innerCircleLineRadiusY"
                    :min="1"
                    :max="50"
                    :step="0.1"
                    :precision="1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 下载按钮只有 -->

  <el-col :span="5">
    <el-button type="primary" @click="downloadWithWatermark">
      Download Seal
    </el-button>
  </el-col>
  <el-col :span="5">
    <el-button
      type="success"
      class="premium-button"
      :loading="payLoading"
      @click="confirmSave"
    >
      Download Seal Without Watermark
    </el-button>
  </el-col>
  <el-col :span="5">
    <el-button
      type="warning"
      class="unlimited-button"
      @click="navigateToPricing"
    >
      Unlimited Downloads
      <el-icon class="el-icon--right"><ArrowRight /></el-icon>
    </el-button>
  </el-col>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { DrawStampUtils } from '@/utils/DrawStampUtils'
import { getSystemFonts } from '@/utils/fontUtils'
import contractStamp1 from '@/assets/templates/contractStamp1.json'
import companyStamp1 from '@/assets/templates/companyStamp1.json'
import companyStamp2 from '@/assets/templates/companyStamp2.json'
import type {
  ICode,
  ICompany,
  IDrawImage,
  IDrawStampConfig,
  IDrawStar,
  IInnerCircle,
  IRoughEdge,
  ISecurityPattern,
  IStampType,
  ITaxNumber,
} from '@/utils/DrawStampTypes'
// 添加默认模板的类型定义和数据
const defaultTemplates = ref<Template[]>([
  {
    name: 'Contract Seal',
    preview: '',
    config: contractStamp1 as any,
  },
  {
    name: 'Company Seal 1',
    preview: '',
    config: companyStamp1 as any,
  },
  {
    name: 'Company Seal 2',
    preview: '',
    config: companyStamp2 as any,
  },
])

const router = useRouter()

const navigateToPricing = () => {
  router.push('/pricing')
}

const payLoading = ref(false)

// 使用computed创建响应式引用
const computedImageList = computed({
  get: () => imageList.value,
  set: newValue => {
    imageList.value = newValue
    drawStamp()
  },
})
const activeMenu = ref(-1)
const menuItems = [
  { text: 'Basic', icon: House, id: 0 },
  { text: 'Text 1', icon: EditPen, id: 1 },
  { text: 'Text 2', icon: EditPen, id: 2 },
  { text: 'Text 3', icon: EditPen, id: 3 },
  { text: 'Text 4', icon: EditPen, id: 4 },
  { text: 'Image', icon: Picture, id: 5 },
  { text: 'Anti-counterfeiting', icon: Lock, id: 6 },
  { text: 'Anti-aliasing', icon: Lock, id: 7 },
  { text: 'Stamp aging', icon: MagicStick, id: 8 },
  { text: 'Inner circle', icon: Help, id: 9 },
]
import {
  Setting,
  Edit,
  EditPen,
  Picture,
  Lock,
  MagicStick,
  Help,
  Search,
  House,
  Delete,
  Plus,
} from '@element-plus/icons-vue'
const editorControls = ref<HTMLDivElement | null>(null)
const stampCanvas = ref<HTMLCanvasElement | null>(null)
const MM_PER_PIXEL = 10 // 毫米换算像素

// 添加响应式数据
const companyName = ref('绘制印章有限责任公司')
// 印章编码
const stampCode = ref('1234567890123')
// 税号
const taxNumberValue = ref('000000000000000000')
// 公司名称字体大小（毫米）
const companyFontFamily = ref('Songti SC')
const companyFontSizeMM = ref(4.2)
const codeFontFamily = ref('SimSun')
// 编码字体大小（毫米）
const codeFontSizeMM = ref(1.2)
// 编码字体宽度（毫米）
const codeFontWidthMM = ref(1.2)
// 圆形印章半径（毫米）
const circleRadius = ref(20)
// 圆形边框宽度（毫米）
const circleBorderWidth = ref(1)
// 主题颜色
const primaryColor = ref('#ff0000')
// 五角星直径（毫米）
const starDiameter = ref(14)
// 做旧效果
const applyAging = ref(false)
// 手动做旧
const manualAging = ref(false)
// 添加新的响应式数据
const agingIntensity = ref(50)
// 文字分布因子，控制公司名称文字在椭圆上的分布范围
const textDistributionFactor = ref(3)
// 调整椭圆文字
const adjustEllipseText = ref(false)
// 调整椭圆文字因子
const adjustEllipseTextFactor = ref(0.5)
// 文字边距，控制公司名称文字距离椭圆边缘的距离（单位：毫米）
const textMarginMM = ref(1) // 默认值为1mm
// 编码边距，控制印章编码距离椭圆边缘的距离（单位毫米）
const codeMarginMM = ref(1) // 默认值为1mm
// 编码分布因子，控制印章编码在椭圆下方的分布范围
const codeDistributionFactor = ref(20) // 默认值可以根据需要调整
// 印章印章类型
const bottomText = ref('合同专用章')
// 印章类型大小，默认 4mm
const bottomTextFontFamily = ref('SimSun')
const bottomTextFontSizeMM = ref(4.6)
const bottomTextFontWidthMM = ref(3)
// 印章类型字符间距，默认 0
const bottomTextLetterSpacing = ref(0)
// 五角星垂直位置调整，认 0
const starPositionY = ref(0)
// 印章类型垂直位置调整，默认 0
const bottomTextPositionY = ref(-5)
const companyNameCompression = ref(1)
const companyNameFontWeight = ref(400)
const bottomTextFontWeight = ref(400)
const codeFontWeight = ref(400)
const taxNumberFontFamily = ref('Songti SC')
const taxNumberFontWeight = ref('400')
const bottomTextCompression = ref(1)
const codeCompression = ref(1)
// 防伪纹路
const securityPatternEnabled = ref(true)
const securityPatternDensity = ref(0.5)
const securityPatternWidth = ref(0.2) // 纹路宽度，单位为毫米
const securityPatternColor = ref('#FF0000')
const securityPatternCount = ref(5) // 防伪纹路数量
const securityPatternLength = ref(2) // 纹路长度，单为毫米
const showFullRuler = ref(false)
const shouldDrawStar = ref(false) // 默认绘制五角星
const taxNumberCompression = ref(1) // 税号文字宽度缩放比例
const taxNumberLetterSpacing = ref(0.3) // 税号文字间距（单位：毫米）
const taxNumberPositionY = ref(0) // 税号垂直位置调，默认为0
const drawInnerCircle = ref(true) // 是否绘制内圈圆
const innerCircleLineWidth = ref(0.5) // 内圈圆线宽，单位为毫米
const innerCircleWidth = ref(15) // 内圈圆宽度，单位为毫米
const innerCircleHeight = ref(12) // 内圈圆高度，单位为毫米
const drawOutThinCircle = ref(true) // 是否绘制内圈圆
const outThinCircleLineWidth = ref(0.5) // 内圈圆线宽，单位为毫米
const outThinCircleWidth = ref(25) // 内圈圆宽度，单位为毫米
const outThinCircleHeight = ref(22) // 内圈圆高度，单位为毫米
const stampImageRef = ref<HTMLImageElement | null>(null)
const shouldDrawRoughEdge = ref(false) // 是否绘制毛边
const roughEdgeWidth = ref(0.2) // 毛边宽度，单位为毫米
const roughEdgeHeight = ref(5) // 毛边高度，单位为毫米
const roughEdgeProbability = ref(0.5) // 毛边概率
const roughEdgeShift = ref(8) // 毛边偏移
const roughEdgePoints = ref(360) // 毛边点数
const showLegalDialog = ref(false) // 是否显示法律提示弹窗
// 添加印章类型列表的响式数据
const stampTypeList = ref<IStampType[]>([
  {
    stampType: '印章类型',
    fontHeight: 4.6,
    fontFamily: 'SimSun',
    compression: 0.75,
    letterSpacing: 0,
    positionY: -3,
    fontWeight: 'normal',
    lineSpacing: 2,
    fontWidth: 3,
  },
])
// 添加公司列表的响应式数据
const companyList = ref<ICompany[]>([
  {
    companyName: '绘制印章有限责任公司',
    compression: 1,
    borderOffset: 1,
    textDistributionFactor: 3,
    fontFamily: 'SimSun',
    fontHeight: 4.2,
    fontWeight: 'normal',
    shape: 'ellipse',
    adjustEllipseText: false,
    adjustEllipseTextFactor: 0.5,
    startAngle: 0,
    rotateDirection: 'counterclockwise',
  },
])
// 添加新的响应式变量
const useStarImage = ref(false)
const starImageWidth = ref(10) // 图片宽度，单位mm
const starImageHeight = ref(10) // 图片高度，单位mm
const keepAspectRatio = ref(true) // 是否保持宽高比
// 添加内圈列表的响应式数据
const innerCircleList = ref<IInnerCircle[]>([
  {
    drawInnerCircle: true,
    innerCircleLineWidth: 0.5,
    innerCircleLineRadiusX: 36,
    innerCircleLineRadiusY: 27,
  },
  {
    drawInnerCircle: true,
    innerCircleLineWidth: 0.5,
    innerCircleLineRadiusX: 16,
    innerCircleLineRadiusY: 12,
  },
])
const templateFileInput = ref<HTMLInputElement | null>(null)
// 添加图片列表的响应式数据
const imageList = ref<any>([
  {
    imageUrl: '', // 提供默认值
    imageWidth: 10,
    imageHeight: 10,
    positionX: 0,
    positionY: 0,
    keepAspectRatio: true,
  },
])

const handleNumberChange = (
  index: number,
  key: keyof IDrawImage,
  value: number
) => {
  imageList.value[index] = {
    ...imageList.value[index],
    [key]: value,
  }
  drawStamp()
}

// 添加新图片
const addNewImage = () => {
  if (imageList.value === undefined || imageList.value === null) {
    imageList.value = []
  }
  console.log('imageList', imageList)
  if (imageList.value.length < 10) {
    imageList.value.push({
      imageUrl: '',
      imageWidth: 10,
      imageHeight: 10,
      positionX: 0,
      positionY: 0,
      keepAspectRatio: true,
    })
  }
}

// 删除图片
const removeImage = (index: number) => {
  imageList.value.splice(index, 1)
}

// 保存模板
const saveAsTemplate = () => {
  const drawConfigs = drawStampUtils.getDrawConfigs()
  const jsonStr = JSON.stringify(drawConfigs, null, 2)

  // 创建 Blob
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  // 创建下载链接
  const link = document.createElement('a')
  link.href = url
  link.download = '印章模板.json'
  document.body.appendChild(link)
  link.click()

  // 清理
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// 触发文件选择
const triggerTemplateLoad = () => {
  templateFileInput.value?.click()
}

// 载模板
const loadTemplate = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()

    reader.onload = e => {
      try {
        if (e.target?.result) {
          const jsonStr = e.target.result as string
          const configs = JSON.parse(jsonStr)

          // 设置新的配置
          drawStampUtils.setDrawConfigs(configs)

          // 恢复界面显示
          restoreDrawConfigs()

          // 刷新印章显示
          drawStamp()
        }
      } catch (error) {
        console.error('加载模板失败:', error)
        alert('加载模板失败，请确保文件格式正确')
      }
    }

    reader.readAsText(file)
  }

  // 清除文件选择，确保同一文件可以重复选择
  target.value = ''
}

// 修改图片上传处理函数
const handleImageUpload = (uploadFile: any, index: number) => {
  const file = uploadFile.raw // el-upload 会将文件包装在uploadFile.raw中
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      if (e.target?.result) {
        imageList.value[index].imageUrl = e.target.result as string
        drawStamp()
      }
    }
    reader.readAsDataURL(file)
  }
}

// 添加新的印章类型行
const addNewStampType = () => {
  let newPositionY = -3
  if (stampTypeList.value.length > 0) {
    const lastStampType: any =
      stampTypeList.value[stampTypeList.value.length - 1]
    newPositionY = lastStampType.positionY + lastStampType.fontHeight
  }
  stampTypeList.value.push({
    stampType: '新印章类型',
    fontHeight: 4.0,
    fontFamily: 'SimSun',
    compression: 0.75,
    letterSpacing: 0,
    positionY: newPositionY,
    fontWeight: 'normal',
    lineSpacing: 2,
    fontWidth: 3,
  })
}

// 删除指定的印章型行
const removeStampType = (index: number) => {
  stampTypeList.value.splice(index, 1)
}

// 添加新的公司行
const addNewCompany = () => {
  let newBorderOffset = 1
  if (companyList.value.length > 0) {
    const lastCompany: any = companyList.value[companyList.value.length - 1]
    newBorderOffset = lastCompany.borderOffset + lastCompany.fontHeight
  }
  companyList.value.push({
    companyName: '新公司名称',
    compression: 1,
    borderOffset: newBorderOffset,
    textDistributionFactor: 3,
    fontFamily: 'SimSun',
    fontHeight: 4.2,
    fontWeight: 'normal',
    shape: 'ellipse',
    adjustEllipseText: false,
    adjustEllipseTextFactor: 0.5,
    startAngle: 0,
    rotateDirection: 'counterclockwise',
  })
}

// 删除指定的公司行
const removeCompany = (index: number) => {
  companyList.value.splice(index, 1)
}

const saveStampAsPNG = () => {
  confirmSave()
  // showLegalDialog.value = true
}

const drawStampWidth = ref(40)
const drawStampHeight = ref(30)

// 添加新的响应式变量
const bottomTextLineSpacing = ref(1.2) // 默认行间距为1.2mm

// 绘制工具
let drawStampUtils: DrawStampUtils
// 初始化绘制印章参数
const initDrawStampUtils = () => {
  drawStampUtils = new DrawStampUtils(stampCanvas.value, MM_PER_PIXEL)
}

const drawStamp = (
  refreshSecurityPattern: boolean = false,
  refreshOld: boolean = false,
  refreshRoughEdge: boolean = false
) => {
  // 使用drawstamputils进行绘制
  drawStampUtils.refreshStamp(
    refreshSecurityPattern,
    refreshOld,
    refreshRoughEdge
  )
}

// 添加新内圈
const addNewInnerCircle = () => {
  innerCircleList.value.push({
    drawInnerCircle: true,
    innerCircleLineWidth: 0.5,
    innerCircleLineRadiusX: 16,
    innerCircleLineRadiusY: 12,
  })
}

// 删除内圈
const removeInnerCircle = (index: number) => {
  innerCircleList.value.splice(index, 1)
}

// 更新绘制配置
const updateDrawConfigs = () => {
  const drawConfigs = drawStampUtils.getDrawConfigs()
  // 做旧效果
  const agingEffect = drawConfigs.agingEffect
  agingEffect.applyAging = applyAging.value
  agingEffect.agingIntensity = agingIntensity.value
  drawConfigs.openManualAging = manualAging.value

  // 防伪纹路
  const securityPattern: ISecurityPattern = drawConfigs.securityPattern
  securityPattern.openSecurityPattern = securityPatternEnabled.value
  securityPattern.securityPatternCount = securityPatternCount.value
  securityPattern.securityPatternWidth = securityPatternWidth.value
  securityPattern.securityPatternLength = securityPatternLength.value

  // 公司名称
  const company: ICompany = drawConfigs.company
  company.companyName = companyName.value
  company.textDistributionFactor = textDistributionFactor.value
  company.borderOffset = textMarginMM.value
  company.fontHeight = companyFontSizeMM.value
  company.fontFamily = companyFontFamily.value
  company.compression = companyNameCompression.value
  company.fontWeight = companyNameFontWeight.value
  company.adjustEllipseText = adjustEllipseText.value
  company.adjustEllipseTextFactor = adjustEllipseTextFactor.value

  // 税号
  const taxNumber: ITaxNumber = drawConfigs.taxNumber
  taxNumber.code = taxNumberValue.value
  taxNumber.compression = taxNumberCompression.value
  taxNumber.positionY = taxNumberPositionY.value
  taxNumber.letterSpacing = taxNumberLetterSpacing.value
  taxNumber.fontFamily = taxNumberFontFamily.value
  taxNumber.fontWeight = taxNumberFontWeight.value

  // 印章类型
  const stampType: IStampType = drawConfigs.stampType
  stampType.stampType = bottomText.value
  stampType.fontFamily = bottomTextFontFamily.value
  stampType.fontHeight = bottomTextFontSizeMM.value
  stampType.fontWidth = bottomTextFontWidthMM.value
  stampType.letterSpacing = bottomTextLetterSpacing.value
  stampType.positionY = bottomTextPositionY.value
  stampType.compression = bottomTextCompression.value
  stampType.fontWeight = bottomTextFontWeight.value
  stampType.lineSpacing = bottomTextLineSpacing.value // 新增：置行间距

  // 印章编码
  const code: ICode = drawConfigs.stampCode
  code.code = stampCode.value
  code.compression = codeCompression.value
  code.fontFamily = codeFontFamily.value
  code.fontHeight = codeFontSizeMM.value
  code.fontWidth = codeFontWidthMM.value
  code.borderOffset = codeMarginMM.value
  code.textDistributionFactor = codeDistributionFactor.value
  code.fontWeight = codeFontWeight.value
  // 印章配置
  drawConfigs.primaryColor = primaryColor.value
  drawConfigs.borderWidth = circleBorderWidth.value
  drawConfigs.width = drawStampWidth.value
  drawConfigs.height = drawStampHeight.value

  // 五角星/图片配置
  const drawStar: IDrawStar = drawConfigs.drawStar
  drawStar.drawStar = shouldDrawStar.value
  drawStar.useImage = useStarImage.value
  drawStar.imageWidth = starImageWidth.value
  drawStar.imageHeight = starImageHeight.value
  drawStar.keepAspectRatio = keepAspectRatio.value
  drawStar.starDiameter = starDiameter.value
  drawStar.starPositionY = starPositionY.value

  // 毛边
  const roughEdge: IRoughEdge = drawConfigs.roughEdge
  roughEdge.drawRoughEdge = shouldDrawRoughEdge.value
  roughEdge.roughEdgeWidth = roughEdgeWidth.value
  roughEdge.roughEdgeHeight = roughEdgeHeight.value
  roughEdge.roughEdgeProbability = roughEdgeProbability.value
  roughEdge.roughEdgeShift = roughEdgeShift.value
  roughEdge.roughEdgePoints = roughEdgePoints.value

  // 内圈圆
  const innerCircle: IInnerCircle = drawConfigs.innerCircle
  innerCircle.drawInnerCircle = drawInnerCircle.value
  innerCircle.innerCircleLineWidth = innerCircleLineWidth.value
  innerCircle.innerCircleLineRadiusX = innerCircleWidth.value
  innerCircle.innerCircleLineRadiusY = innerCircleHeight.value

  // 外部细圈
  const outThinCircle: IInnerCircle = drawConfigs.outThinCircle
  outThinCircle.drawInnerCircle = drawOutThinCircle.value
  outThinCircle.innerCircleLineWidth = outThinCircleLineWidth.value
  outThinCircle.innerCircleLineRadiusX = outThinCircleWidth.value
  outThinCircle.innerCircleLineRadiusY = outThinCircleHeight.value

  // 更新印章类型列表
  drawConfigs.stampTypeList = stampTypeList.value

  // 更新公司列表
  drawConfigs.companyList = companyList.value
  // 更新内圈列表
  drawConfigs.innerCircleList = innerCircleList.value
  // 更新图片列表
  drawConfigs.imageList = imageList.value

  drawStamp()
}

// 下载带水印的印章
const downloadWithWatermark = () => {
  const outputSize = 512
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = outputSize
  tempCanvas.height = outputSize
  const ctx = tempCanvas.getContext('2d')
  if (!ctx || !stampCanvas.value) return

  // 设置2%的边距
  const margin = outputSize * 0.01
  const drawSize = outputSize - 2 * margin

  // 首先隐藏标尺和辅助线
  const originalConfig = drawStampUtils.getDrawConfigs()
  originalConfig.ruler.showCrossLine = false
  originalConfig.ruler.showRuler = false
  originalConfig.ruler.showDashLine = false
  originalConfig.ruler.showSideRuler = false
  originalConfig.ruler.showFullRuler = false
  originalConfig.ruler.showCurrentPositionText = false
  drawStampUtils.setDrawConfigs(originalConfig)
  drawStampUtils.refreshStamp()

  // 等待短暂延时确保重绘完成
  setTimeout(() => {
    // 清除画布
    ctx.clearRect(0, 0, outputSize, outputSize)

    // 计算原始 canvas 中印章的位置和大小
    const originalStampSize =
      (Math.max(originalConfig.width, originalConfig.height) + 2) *
      drawStampUtils.mmToPixel

    const sourceX =
      (stampCanvas.value!.width - originalStampSize) / 2 +
      drawStampUtils.stampOffsetX * drawStampUtils.mmToPixel
    const sourceY =
      (stampCanvas.value!.height - originalStampSize) / 2 +
      drawStampUtils.stampOffsetY * drawStampUtils.mmToPixel

    // 绘制印章（使用正确的源区域）
    ctx.drawImage(
      stampCanvas.value!,
      sourceX,
      sourceY,
      originalStampSize,
      originalStampSize,
      margin,
      margin,
      drawSize,
      drawSize
    )

    // 如果启用了做旧效果，添加做旧效果
    if (originalConfig.agingEffect.applyAging) {
      drawStampUtils.addAgingEffect(ctx, outputSize, outputSize, false)
    }

    // 添加水印
    ctx.save()
    ctx.globalAlpha = 0.2 // 水印透明度
    ctx.fillStyle = '#999'
    ctx.font = `${outputSize * 0.03}px Arial`

    // 计算水印文本
    const text = 'Seal Digital'
    const textMetrics = ctx.measureText(text)
    const textWidth = textMetrics.width

    // 在印章区域内绘制水印网格
    ctx.translate(outputSize / 2, outputSize / 2)
    ctx.rotate(-Math.PI / 4)

    const gridSpacing = textWidth * 1.5
    const gridSize = Math.sqrt(2) * outputSize

    for (let x = -gridSize / 2; x < gridSize / 2; x += gridSpacing) {
      for (let y = -gridSize / 2; y < gridSize / 2; y += gridSpacing) {
        ctx.fillText(text, x, y)
      }
    }

    ctx.restore()

    // 下载图片
    const link = document.createElement('a')
    link.download = '印章.png'
    link.href = tempCanvas.toDataURL('image/png')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 恢复原始配置
    originalConfig.ruler.showCrossLine = true
    originalConfig.ruler.showRuler = true
    originalConfig.ruler.showDashLine = true
    originalConfig.ruler.showSideRuler = true
    originalConfig.ruler.showFullRuler = true
    originalConfig.ruler.showCurrentPositionText = true
    drawStampUtils.setDrawConfigs(originalConfig)
    drawStampUtils.refreshStamp()
  }, 50)
}

// 添加水印的方法
const addWatermark = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  // 设置水印样式
  ctx.save()
  ctx.globalAlpha = 0.2 // 水印透明度
  ctx.fillStyle = '#999'
  ctx.font = '16px Arial'

  // 计算水印文本
  const text = 'Seal Digital' // 替换为你的水印文本
  const textWidth = ctx.measureText(text).width

  // 旋转画布并绘制多个水印
  ctx.translate(width / 2, height / 2)
  ctx.rotate(-Math.PI / 4) // 45度角旋转

  // 绘制水印网格
  for (let i = -width; i < width; i += textWidth + 40) {
    for (let j = -height; j < height; j += 30) {
      ctx.fillText(text, i, j)
    }
  }

  ctx.restore()
}

const { handlePayment } = usePayment()
const { trackEvent } = useAnalytics()

// 添加登录状态检查
const checkAuth = async () => {
  const session = await useUserSession()

  if (!session.user.value?.email) {
    ElMessage.warning('Please login first')
    router.push('/signin') // 重定向到登录页面
    return false
  }
  return true
}

// 确认保存
const confirmSave = async () => {
  // 跟踪按钮点击
  try {
    trackEvent('download_button_click', {
      button_name: 'seal_download',
      button_type: 'main_download',
    })
  } catch (error) {}

  if (!(await checkAuth())) return

  payLoading.value = true
  try {
    const session = await useUserSession()
    const { data: paymentStatus } = await useFetch('/api/user/payment-status')

    console.log('Payment status check:', paymentStatus.value)

    if (paymentStatus.value?.subscription) {
      console.log('User has active subscription')
      drawStampUtils.saveStampAsPNG(512)
      trackEvent('download_success', {
        download_type: paymentStatus.value?.subscription
          ? 'subscription'
          : 'one_time',
        payment_status: 'paid',
      })
      return
    }

    // if (paymentStatus.value?.hasOneTimePurchase) {
    //   console.log('User has unused one-time purchase')
    //   const kv = hubKV()
    //   await kv.set(`user:${session.user.value?.email}:oneTimePurchase`, {
    //     active: true,
    //     purchased: Date.now(),
    //     used: true,
    //   })
    //   drawStampUtils.saveStampAsPNG(512)
    //   return
    // }

    console.log('No active subscription or one-time purchase found')

    // 确保回调函数被正确传入和执行
    handlePayment('one_time', () => {
      console.log('支付成功回调执行，开始下载图片')
      drawStampUtils.saveStampAsPNG(512)
      trackEvent('download_after_payment', {
        payment_type: 'one_time',
        download_type: 'seal',
      })
    })
  } catch (error) {
    console.error('Save error:', error)
    ElMessage.error('Failed to process the request')
    trackEvent('download_error', {
      error_type: error.message || 'unknown',
      payment_status: 'failed',
    })
  } finally {
    payLoading.value = false
  }
}
const restoreDrawConfigs = () => {
  const drawConfigs = drawStampUtils.getDrawConfigs()

  // 做旧效果
  applyAging.value = drawConfigs.agingEffect.applyAging
  agingIntensity.value = drawConfigs.agingEffect.agingIntensity
  manualAging.value = drawConfigs.openManualAging

  // 防伪纹路
  securityPatternEnabled.value = drawConfigs.securityPattern.openSecurityPattern
  securityPatternCount.value = drawConfigs.securityPattern.securityPatternCount
  securityPatternWidth.value = drawConfigs.securityPattern.securityPatternWidth
  securityPatternLength.value =
    drawConfigs.securityPattern.securityPatternLength

  // 毛边效果
  shouldDrawRoughEdge.value = drawConfigs.roughEdge.drawRoughEdge
  roughEdgeWidth.value = drawConfigs.roughEdge.roughEdgeWidth
  roughEdgeHeight.value = drawConfigs.roughEdge.roughEdgeHeight
  roughEdgeProbability.value = drawConfigs.roughEdge.roughEdgeProbability
  roughEdgeShift.value = drawConfigs.roughEdge.roughEdgeShift
  roughEdgePoints.value = drawConfigs.roughEdge.roughEdgePoints

  // 印章基本设置
  drawStampWidth.value = drawConfigs.width
  drawStampHeight.value = drawConfigs.height
  circleBorderWidth.value = drawConfigs.borderWidth
  primaryColor.value = drawConfigs.primaryColor

  // 公司名称
  companyName.value = drawConfigs.company.companyName
  companyFontSizeMM.value = drawConfigs.company.fontHeight
  companyNameCompression.value = drawConfigs.company.compression
  textDistributionFactor.value = drawConfigs.company.textDistributionFactor
  textMarginMM.value = drawConfigs.company.borderOffset
  companyList.value = drawConfigs.companyList

  // 印章编码
  const stampCodeConfig: ICode = drawConfigs.stampCode
  stampCode.value = stampCodeConfig.code
  codeFontSizeMM.value = stampCodeConfig.fontHeight
  codeFontWidthMM.value = stampCodeConfig.fontWidth
  codeDistributionFactor.value = stampCodeConfig.textDistributionFactor
  codeMarginMM.value = stampCodeConfig.borderOffset
  codeFontFamily.value = stampCodeConfig.fontFamily
  codeFontWeight.value = stampCodeConfig.fontWeight
  codeCompression.value = stampCodeConfig.compression

  // 税号
  const taxNumber: ITaxNumber = drawConfigs.taxNumber
  taxNumberValue.value = taxNumber.code
  taxNumberCompression.value = taxNumber.compression
  taxNumberLetterSpacing.value = taxNumber.letterSpacing
  taxNumberPositionY.value = taxNumber.positionY
  taxNumberFontFamily.value = taxNumber.fontFamily
  taxNumberFontWeight.value = taxNumber.fontWeight

  // 印章类型
  const stampTypeConfig: IStampType = drawConfigs.stampType
  bottomText.value = stampTypeConfig.stampType
  bottomTextFontSizeMM.value = stampTypeConfig.fontHeight
  bottomTextFontWidthMM.value = stampTypeConfig.fontWidth
  bottomTextLetterSpacing.value = stampTypeConfig.letterSpacing
  bottomTextPositionY.value = stampTypeConfig.positionY
  bottomTextFontFamily.value = stampTypeConfig.fontFamily
  bottomTextFontWeight.value = stampTypeConfig.fontWeight
  bottomTextCompression.value = stampTypeConfig.compression
  bottomTextLineSpacing.value = stampTypeConfig.lineSpacing
  stampTypeList.value = drawConfigs.stampTypeList

  // 五角星/图片配置
  shouldDrawStar.value = drawConfigs.drawStar.drawStar
  useStarImage.value = drawConfigs.drawStar.useImage
  starImageWidth.value = drawConfigs.drawStar.imageWidth
  starImageHeight.value = drawConfigs.drawStar.imageHeight
  keepAspectRatio.value = drawConfigs.drawStar.keepAspectRatio
  starDiameter.value = drawConfigs.drawStar.starDiameter
  starPositionY.value = drawConfigs.drawStar.starPositionY

  // 内圈圆形
  drawInnerCircle.value = drawConfigs.innerCircle.drawInnerCircle
  innerCircleLineWidth.value = drawConfigs.innerCircle.innerCircleLineWidth
  innerCircleWidth.value = drawConfigs.innerCircle.innerCircleLineRadiusX
  innerCircleHeight.value = drawConfigs.innerCircle.innerCircleLineRadiusY
  innerCircleList.value = drawConfigs.innerCircleList

  // 外部细圈
  drawOutThinCircle.value = drawConfigs.outThinCircle.drawInnerCircle
  outThinCircleLineWidth.value = drawConfigs.outThinCircle.innerCircleLineWidth
  outThinCircleWidth.value = drawConfigs.outThinCircle.innerCircleLineRadiusX
  outThinCircleHeight.value = drawConfigs.outThinCircle.innerCircleLineRadiusY

  // 图片列表
  imageList.value = drawConfigs.imageList || []
}

// 添加系统字体列表
const systemFonts = ref<string[]>([])

// 加载系统字体
const loadSystemFonts = async () => {
  systemFonts.value = await getSystemFonts()
}

onMounted(async () => {
  await loadSystemFonts()
  initDrawStampUtils()
  restoreDrawConfigs()
  drawStamp()

  // 初始化所有字体选择器的预览
  const elements = document.querySelectorAll('.font-select, .font-input')
  elements.forEach(element => {
    if (element instanceof HTMLElement) {
      const value = (element as HTMLSelectElement | HTMLInputElement).value
      if (value) {
        updateFontPreview(value)
      }
    }
  })
})

// 监听所有响应式数据的变化
watch(
  [
    companyName,
    companyFontFamily,
    stampCode,
    companyFontSizeMM,
    codeFontSizeMM,
    circleRadius,
    circleBorderWidth,
    primaryColor,
    starDiameter,
    codeDistributionFactor,
    textDistributionFactor,
    textMarginMM,
    codeMarginMM,
    agingIntensity,
    bottomText,
    bottomTextFontFamily,
    bottomTextFontSizeMM,
    bottomTextLetterSpacing,
    bottomTextPositionY,
    taxNumberValue,
    applyAging,
    agingIntensity,
    companyNameCompression,
    bottomTextCompression,
    codeCompression,
    bottomTextLetterSpacing,
    securityPatternColor,
    securityPatternDensity,
    securityPatternColor,
    securityPatternEnabled,
    securityPatternCount,
    securityPatternLength,
    securityPatternWidth,
    drawStampWidth,
    drawStampHeight,
    shouldDrawStar,
    starPositionY,
    taxNumberCompression,
    taxNumberFontFamily,
    taxNumberLetterSpacing,
    taxNumberPositionY,
    starDiameter,
    drawInnerCircle,
    innerCircleLineWidth,
    innerCircleWidth,
    innerCircleHeight,
    outThinCircleLineWidth,
    outThinCircleWidth,
    outThinCircleHeight,
    drawOutThinCircle,
    manualAging,
    shouldDrawRoughEdge,
    roughEdgeWidth,
    roughEdgeHeight,
    roughEdgeProbability,
    roughEdgeShift,
    roughEdgePoints,
    companyNameFontWeight,
    bottomTextFontWeight,
    codeFontWeight,
    codeFontFamily,
    taxNumberFontWeight,
    adjustEllipseText,
    adjustEllipseTextFactor,
    bottomTextLineSpacing,
    stampTypeList,
    companyList,
    useStarImage,
    starImageWidth,
    starImageHeight,
    keepAspectRatio,
    innerCircleList,
    imageList,
  ],
  () => {
    updateDrawConfigs()
  },
  { deep: true }
)

// 添加新的类型定义
interface StampTypePreset {
  id: string
  name: string
  text: string
  fontSize: number
  letterSpacing: number
  lineSpacing: number
  positionY: number
  compression: number
}

// 添加预设数据
const stampTypePresets = ref<StampTypePreset[]>([
  {
    id: 'contract',
    name: '合同专用章',
    text: '合同专用章',
    fontSize: 4.6,
    letterSpacing: 0,
    lineSpacing: 1.2,
    positionY: -5,
    compression: 1,
  },
  {
    id: 'invoice',
    name: '印章类型',
    text: '发票专章\n增值税专用',
    fontSize: 4.2,
    letterSpacing: 0,
    lineSpacing: 1.5,
    positionY: -4,
    compression: 0.9,
  },
  {
    id: 'finance',
    name: '财务专用章',
    text: '财务专用章\n仅限报销使用',
    fontSize: 4.0,
    letterSpacing: 0,
    lineSpacing: 1.8,
    positionY: -3,
    compression: 0.85,
  },
])

// 可以选择性地添加持久化存储功能
const savePresetsToLocalStorage = () => {
  localStorage.setItem(
    'stampTypePresets',
    JSON.stringify(stampTypePresets.value)
  )
}

const loadPresetsFromLocalStorage = () => {
  const saved = localStorage.getItem('stampTypePresets')
  if (saved) {
    stampTypePresets.value = JSON.parse(saved)
  }
}

// 在组件挂载时加载保存的预设
onMounted(() => {
  loadPresetsFromLocalStorage()
})

// 在预设变化时保存
watch(
  stampTypePresets,
  () => {
    savePresetsToLocalStorage()
  },
  { deep: true }
)

// 字体预览更新函数
const updateFontPreview = (value: string) => {
  const fontFamily = value

  // 更新字体预览样式
  const container = document.querySelector('.flex.gap-2') as HTMLElement
  if (container) {
    container.style.setProperty('--current-font', fontFamily)

    // 更新所有字体预览元素的样式
    const previewElements = container.querySelectorAll('.font-preview')
    previewElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.setProperty('--current-font', fontFamily)
      }
    })
  }
}

// 添加展开/折叠状态控制
const expandedGroups = ref({
  basic: false,
  company: false,
  stampType: false,
  code: false,
  taxNumber: false,
  star: false,
  security: false,
  roughEdge: false,
  aging: false,
  innerCircle: false,
  images: false, // 新增图片列表设置
})

// 切换组的展开/折叠状态
const toggleGroup = (groupName: string) => {
  expandedGroups.value[groupName] = !expandedGroups.value[groupName]
}

// 添加模板相关的类型定义
interface Template {
  name: string
  preview: string
  config: IDrawStampConfig
}

// 添加模板相关的响应式数据
const currentTemplateIndex = ref(-1)

// 保存当前设置为模板
const saveCurrentAsTemplate = async () => {
  const name = prompt('请输入模板名称')
  if (!name) return
  // 保存到本地存储
  saveTemplatesToStorage()
}

// 加载模板
const loadDefaultTemplate = (template: Template) => {
  try {
    const newConfig = JSON.parse(
      JSON.stringify(template.config)
    ) as IDrawStampConfig
    newConfig.ruler.showRuler = true
    newConfig.ruler.showFullRuler = true
    newConfig.ruler.showSideRuler = true
    newConfig.ruler.showCrossLine = true
    newConfig.ruler.showCurrentPositionText = true
    newConfig.ruler.showDashLine = true
    newConfig.company.startAngle = template.config.company.startAngle
    newConfig.company.rotateDirection = template.config.company.rotateDirection

    console.log('load template', template, newConfig)
    // 设置新的配置
    drawStampUtils.setDrawConfigs(newConfig)
    // 恢复界面显示
    restoreDrawConfigs()
    // 刷新印章显示
    drawStamp()
    // 更新当前选中的模板索引（使用负数表示默认模板）
    currentTemplateIndex.value =
      -1 - defaultTemplates.value.findIndex(t => t === template)
  } catch (error) {
    console.error('加载默认模板失败:', error)
    alert('加载默认模板失败')
  }
}

// 保存模板列表到本地存储
const saveTemplatesToStorage = () => {
  localStorage.setItem('stampTemplates', JSON.stringify(templateList.value))
}

// 从本地存储加载模板列表
const loadTemplatesFromStorage = () => {
  // 生成默认模板的预览图
  defaultTemplates.value.forEach(async template => {
    // 临时创建一个 canvas 生成预览图

    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = 400
    tempCanvas.height = 400
    const tempDrawStampUtils = new DrawStampUtils(tempCanvas, MM_PER_PIXEL)
    template.config.ruler.showRuler = false
    // 设置模板配置
    tempDrawStampUtils.setDrawConfigs(template.config)
    tempDrawStampUtils.refreshStamp()
    // 生成预览图
    template.preview = tempCanvas.toDataURL('image/png')
  })
}

// 在组件挂载时加载保存的模板
onMounted(() => {
  loadTemplatesFromStorage()

  const canvas = stampCanvas.value
  if (!canvas) return // 添加空值检查

  const container = canvas.parentElement
  if (!container) return // 添加父元素空值检查

  // 设置 canvas 的实际尺寸为容器的宽度和高度
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight
})
</script>

<style scoped>
.el-icon {
  font-size: 14px;
}

/* 容器样式 - 需要添加到父元素 */
.menu-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem; /* 间距可以根据需要调整 */
}

.template-active {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.35;
    border-radius: inherit;
    background-color: #ffd843;
  }
}

.template-name {
  text-align: center;
}

.setting :deep(.el-form-item__label) {
  font-size: 13px;
  padding-bottom: 4px;
  color: #606266;
  line-height: 1.5;
}
</style>
