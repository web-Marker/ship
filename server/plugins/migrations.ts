import { consola } from 'consola'
import { migrate } from 'drizzle-orm/d1/migrator'
import { useDrizzle } from '../utils/drizzle' // 添加这行导入

export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return

  try {
    await onHubReady(async () => {
      try {
        await migrate(useDrizzle(), {
          migrationsFolder: 'server/database/migrations',
        })
        consola.success('Database migrations done')
      } catch (err) {
        // 只记录错误，不中断程序
        consola.warn('Migration warning:', err)
      }
    })
  } catch (error) {
    // 只记录错误，不中断程序
    consola.warn('Hub ready warning:', error)
  }
})
