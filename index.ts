import express from 'express'
import 'dotenv/config'
import { client } from './plugins/linebot'

import webhookRoute from './routes/webhookRoute'

const app = express()
const PORT = process.env.PORT || 3000

app.use('/webhook', webhookRoute)

if (process.env.GROUP_ID) {
  client.pushMessage(process.env.GROUP_ID, {
    type: 'text',
    text: 'test123'
  })
}

app.use('*', (_, res) => {
  res.status(404).send('not found')
})

app.listen(PORT, () => {
  console.log(`linebot server running at port: ${PORT} ...`)
})
