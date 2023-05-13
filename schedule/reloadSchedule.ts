import { scheduleJob } from 'node-schedule'
import { prisma } from '../prisma'
import { sendMessageToGroup } from '../utils'

export const reloadSchedule = async () => {
  const scheduleList = await prisma.schedule.findMany()

  scheduleList.forEach((schedule) => {
    scheduleJob(new Date(schedule.dateTime), async () => {
      sendMessageToGroup(schedule.message)

      await prisma.schedule.delete({
        where: { id: schedule.id }
      })
    })
  })

  await prisma.$disconnect()
}
