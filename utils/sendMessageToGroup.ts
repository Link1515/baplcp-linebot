import { client } from '../plugins/linebot'

export const sendMessageToGroup = async (message: string) => {
  const groupId = process.env.GROUP_ID

  if (!groupId) throw Error('Cannot get groupId')

  await client.pushMessage(groupId, {
    type: 'text',
    text: message
  })
}
