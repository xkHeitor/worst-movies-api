import { app } from './infrastructure/http/server'
import { loadCSV } from './infrastructure/utils/csv-loader'

loadCSV()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`API running on port ${PORT}`))