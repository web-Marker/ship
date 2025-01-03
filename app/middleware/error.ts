export default defineEventHandler(event => {
  event.res.on('error', err => {
    console.error('Response error:', err)
  })
})
