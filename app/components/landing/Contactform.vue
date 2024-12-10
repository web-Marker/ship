<script setup>
onMounted(() => {
  const form = document.getElementById('form')
  const result = document.getElementById('result')

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    form.classList.add('was-validated')
    if (!form.checkValidity()) {
      form.querySelectorAll(':invalid')[0].focus()
      return
    }
    const formData = new FormData(form)
    const object = Object.fromEntries(formData)

    result.innerHTML = 'Sending...'

    fetch('/api/messages/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    })
      .then(async response => {
        let json = await response.json()
        if (response.ok) {
          result.classList.remove('text-red-500')
          result.classList.add('text-green-500')
          result.innerHTML = 'Message sent successfully!'
        } else {
          result.classList.remove('text-green-500')
          result.classList.add('text-red-500')
          result.innerHTML = json.message || 'Something went wrong!'
        }
      })
      .catch(error => {
        console.error(error)
        result.classList.add('text-red-500')
        result.innerHTML = 'Failed to send message'
      })
      .finally(() => {
        form.reset()
        form.classList.remove('was-validated')
        setTimeout(() => {
          result.innerHTML = ''
        }, 5000)
      })
  })
})
</script>

<template>
  <form id="form" class="needs-validation" novalidate>
    <div class="mb-5">
      <input
        type="text"
        placeholder="Full Name"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
        name="name"
      />
      <div class="hidden-feedback text-red-400 text-sm mt-1">
        Please provide your full name.
      </div>
    </div>
    <div class="mb-5">
      <label for="email_address" class="sr-only">Email Address</label>
      <input
        id="email_address"
        type="email"
        placeholder="Email Address"
        name="email"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
      />
      <div class="hidden-feedback text-red-400 text-sm mt-1">
        Please provide your email address.
      </div>
      <div class="hidden-feedback-invalid text-red-400 text-sm mt-1">
        Please provide a valid email address.
      </div>
    </div>
    <div class="mb-3">
      <textarea
        name="message"
        required
        placeholder="Your Message"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
      ></textarea>
      <div class="hidden-feedback text-red-400 text-sm mt-1">
        Please enter your message.
      </div>
    </div>
    <LandingButton type="submit" size="lg" block>Send Message</LandingButton>
    <div id="result" class="mt-3 text-center"></div>
  </form>
</template>

<style scoped>
.hidden-feedback,
.hidden-feedback-invalid {
  display: none;
}

/* 只有当表单被验证且字段为空时显示基本错误提示 */
.was-validated :placeholder-shown:invalid ~ .hidden-feedback {
  display: block;
}

/* 只有当表单被验证且字段有无效值时显示无效格式提示 */
.was-validated :not(:placeholder-shown):invalid ~ .hidden-feedback-invalid {
  display: block;
}

/* 添加无效输入的边框样式 */
.was-validated :invalid {
  border-color: #dc3545;
}
</style>
