import express from 'express'
import { z } from 'zod'
import { sendMessageToGroup } from '../utils'

export const sendRoute = express.Router()

sendRoute.post('/', async (req, res) => {
  try {
    const bodyValidator = z.object(
      {
        message: z.string({
          required_error: 'message is required.',
          invalid_type_error: 'message must be a string.'
        })
      },
      { required_error: 'Request body is required.' }
    )

    const { message } = bodyValidator.parse(req.body)

    sendMessageToGroup(message)

    return res.status(200).send('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send(error.issues.map((issue) => issue.message).join(' '))
    }

    return res.status(500).send('server error')
  }
})
