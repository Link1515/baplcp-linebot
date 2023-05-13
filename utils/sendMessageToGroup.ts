import { client } from '../plugins/linebot'

export const sendMessageToGroup = (message: string) => {
  const groupId = process.env.GROUP_ID

  if (!groupId) throw Error('Cannot get groupId')

  client.pushMessage(groupId, {
    type: 'text',
    text: message
  })
}
