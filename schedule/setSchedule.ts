import { scheduleJob } from 'node-schedule'
import { prisma } from '../prisma'
import { sendMessageToGroup } from '../utils'

export const setSchedule = async ({
  dateTime,
  message
}: {
  dateTime: Date
  message: string
}) => {
  const { id } = await prisma.schedule.create({
    data: {
      dateTime,
      message
    }
  })

  scheduleJob(dateTime, async () => {
    sendMessageToGroup(message)
    await prisma.schedule.delete({
      where: { id }
    })

    await prisma.$disconnect()
  })
}
