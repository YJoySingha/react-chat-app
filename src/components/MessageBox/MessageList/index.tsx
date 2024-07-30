import { Message } from "../../ChatBox/types"
import { format } from 'timeago.js';

export const MessageList = ({messages, currentUser, lastMessageRef}: {
  messages: Message[],
  currentUser: string,
  lastMessageRef?: any
})=> {

  const isMyMessage = (message: Message) => {
    return message.from === currentUser
  }
  
  return <div className="chat-body" >
    {
      messages?.map((message, key)=> {

        const className = `message ${isMyMessage(message) && 'own'}`

        return <div key={key}  ref={key===(messages.length - 1)? lastMessageRef: null}>
            {
              <div className="chat-body">
                <div  className={className} >
                <span>
                  {message.content}
                </span>
                
                <span>{format(message.timestamp)}</span>
               
                </div>
              </div>
            }
        </div>
      })
    }
        </div>
}