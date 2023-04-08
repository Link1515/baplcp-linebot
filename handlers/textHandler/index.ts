import { MessageEvent, TextEventMessage, EventSource } from '@line/bot-sdk'
import { replyText } from '../../utils'
import { errorMsg } from './errorMsg'

export const textHandler = (
  message: TextEventMessage,
  replyToken: MessageEvent['replyToken'],
  source: EventSource
) => {
  switch (message.text) {
    // message start with "go "
    case 'hi':
      return replyText(replyToken, 'hihi')
    default:
      return errorMsg(replyToken)
  }
}
