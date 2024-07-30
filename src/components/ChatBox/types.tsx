export enum MessageType {
  TEXT =  'text',
  AUDIO = 'audio',
  FILE = 'file',
  VIDEO = 'video',
  IMAGE = 'image'
}

export const DEFAULT_MESSAGE_TYPE: MessageType = MessageType.TEXT;

export interface Message {
  to: string,
  from: string,
  content: string,
  isRead?: boolean;
  type: MessageType;
  timestamp?: Date
}
