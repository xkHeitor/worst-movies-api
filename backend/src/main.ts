import { app } from './infrastructure/http/server'
import { loadCSV } from './infrastructure/utils/csv-loader'
import { Logger } from './infrastructure/utils/logger'

const PORT = process.env.PORT || 3000

async function start() {
  try {
    await loadCSV()
    app.listen(PORT, () => Logger.info(`API running on port ${PORT}`))
  } catch (error) {
    Logger.error('Failed to start server', error)
    process.exit(1)
  }
}

start()