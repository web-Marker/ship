import { consola } from 'consola'
import { migrate } from 'drizzle-orm/d1/migrator'
import { useDrizzle } from '../utils/drizzle' // 添加这行导入

export default defineNitroPlugin(async () => {
  try {
    await onHubReady(async () => {
      const db = useDrizzle()
      // 添加数据库连接检查
      if (!db) {
        consola.error('Failed to initialize database connection')
        return
      }
      try {
        await migrate(db, {
          migrationsFolder: 'server/database/migrations',
        })
        consola.success('Database migrations done')
      } catch (err) {
        // 只记录错误，不中断程序
        consola.warn('Migration warning:', err)

        // 如果是严重错误，可以抛出
        if (err.code === 'FATAL') {
          throw err
        }
      }
    })
  } catch (error) {
    // 只记录错误，不中断程序
    consola.warn('Hub ready warning:', error)
    consola.error('Database initialization failed:', {
      error: error.message,
      stack: error.stack,
      code: error.code,
    })
  }
})
