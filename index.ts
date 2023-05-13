import express from 'express'
import 'dotenv/config'

import { reloadSchedule } from './schedule'
import { webhookRoute, sendRoute } from './routes'

reloadSchedule()

const app = express()
const PORT = process.env.PORT || 3000

app.use('/webhook', webhookRoute)

app.use(express.json())
app.use('/send', sendRoute)

app.use('*', (_, res) => {
  res.status(404).send('not found')
})

app.listen(PORT, () => {
  console.log(`linebot server running at port: ${PORT} ...`)
})
