import express from 'express'
import { scheduleJob } from 'node-schedule'
import { z } from 'zod'
import { prisma } from '../prisma'
import { ErrorWithCode, badRequestError } from '../errors'
import { sendMessageToGroup } from '../utils'
import { setSchedule } from '../schedule'

export const sendRoute = express.Router()

sendRoute.post('/', async (req, res) => {
  try {
    const bodyValidator = z.object(
      {
        message: z.string({
          required_error: 'message is required.',
          invalid_type_error: 'message must be a string.'
        }),
        sendAt: z
          .string({
            invalid_type_error: 'sendAt must be a date string.'
          })
          .optional()
      },
      { required_error: 'Request body is required.' }
    )

    const { message, sendAt } = bodyValidator.parse(req.body)

    if (sendAt) {
      const dateTime = new Date(sendAt)
      if (isNaN(dateTime.getTime()))
        throw badRequestError('Invalid Date (sendAt)')

      setSchedule({ dateTime, message })
    } else {
      sendMessageToGroup(message)
    }

    await prisma.$disconnect()

    return res.status(200).send('OK')
  } catch (error) {
    await prisma.$disconnect()
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send(error.issues.map((issue) => issue.message).join(' '))
    } else if (error instanceof ErrorWithCode) {
      return res.status(error.code).send(error.message)
    }

    return res.status(500).send('server error')
  }
})
