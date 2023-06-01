import { Message } from '@line/bot-sdk'
import { client } from '../plugins/linebot'

export const sendMessageToGroup = async (Message: Message) => {
  const groupId = process.env.GROUP_ID

  if (!groupId) throw Error('Cannot get groupId')

  await client.pushMessage(groupId, Message)
}
