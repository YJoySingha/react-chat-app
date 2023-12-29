import { Message } from "../../ChatBox/types"


export const MessageList = ({messages, currentUser}: {
  messages: Message[],
  currentUser: string
})=> {

  const isMyMessage = (message: Message) => {
    return message.from === currentUser
  }
  

  return <div className="chat-body" >
    {
      messages?.map((message, key)=> {

        const className = `message ${isMyMessage(message)??'own'}`

        return <div key={key}>
            {
              <div className="chat-body">
                <span className={className}>

                </span>
              </div>
            }
        </div>
      })
    }

        </div>
}