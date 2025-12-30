import express from 'express'
import { loadCSV } from './infrastructure/utils/csv-loader'


export const app = express()
app.use(express.json())


loadCSV()


app.listen(3000, () => console.log('API running on port 3000'))