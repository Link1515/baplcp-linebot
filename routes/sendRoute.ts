import express from 'express'
import { sendMessageToGroup } from '../utils'
import { HTTPError } from '@line/bot-sdk'

export const sendRoute = express.Router()

sendRoute.post('/group', async (req, res) => {
  try {
    await sendMessageToGroup(req.body)

    return res.status(200).send('OK')
  } catch (error) {
    if (error instanceof HTTPError) {
      return res.status(error.statusCode).send(error.message)
    }

    return res.status(500).send('server error')
  }
})
