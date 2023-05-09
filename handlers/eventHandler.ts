import { WebhookEvent } from '@line/bot-sdk'
import { replyText } from '../utils'
import { textHandler } from './textHandler'
import fixedMessage from '../data/fixedMessage.json'

export const eventHandler = (event: WebhookEvent) => {
  if (
    event.source.type === 'group' &&
    event.source.groupId !== process.env.GROUP_ID
  ) {
    return
  }

  const { type: eventType } = event

  switch (eventType) {
    case 'message': {
      const { message } = event

      switch (message.type) {
        case 'text':
          return textHandler(message, event.replyToken, event.source)
      }
    }

    case 'follow':
      return replyText(event.replyToken, fixedMessage.follow)

    case 'join':
      return replyText(event.replyToken, fixedMessage.join)

    default:
      return console.log(`Unknown event: ${JSON.stringify(event)}`)
  }
}
