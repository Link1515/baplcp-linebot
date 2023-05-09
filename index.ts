import express from 'express'
import 'dotenv/config'

import { webhookRoute, sendRoute } from './routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/webhook', webhookRoute)
app.use('/send', sendRoute)

app.use('*', (_, res) => {
  res.status(404).send('not found')
})

app.listen(PORT, () => {
  console.log(`linebot server running at port: ${PORT} ...`)
})
