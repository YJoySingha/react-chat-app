import React, { useEffect, useState } from 'react';
import { useRef } from "react";
import { io } from 'socket.io-client';
const urlParams = new URLSearchParams(window.location.search);
const jwt = urlParams.get('jwt');
const socket = io(
    'http://localhost:3000',
    {
        transports: ['websocket', 'polling', 'flashsocket'], query: {
            jwt
        }
    }
); 

interface Message {
  from: string;
  content: string;
}

export const MessageBox: React.FC = () => {
  const [user, setUser] = useState<string>(jwt || '');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketStatus, setSocketStatus] = useState<boolean>(socket.connected);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
        console.log('Connected');
        setSocketStatus(true);
    });
    socket.on('receive-message', (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data]);
    });

    // socket.emit('get-messages', { withUser: 'b' }); // Replace with the actual user ID
    socket.emit('get-messages', { withUser: 'b' }); // Replace with the actual user ID

    return () => {
        socket.off('receive-message');
    };
  }, []);

  const sendMessage = () => {
      if (inputMessage.trim() !== '') {
          socket.emit('send-message', { to: user === 'a' ? 'b' : 'a', content: inputMessage }); // Replace with the actual recipient ID
          setInputMessage('');
      }
  };


  // Always scroll to last Message
  // useEffect(()=> {
  //   scroll.current?.scrollIntoView({ behavior: "smooth" });
  // },[messages])

  const scroll = useRef();
  return (
    <>

          <div className="chat-body" >
            
            {messages.map((msg, index) => (
                <>
                  <div ref={scroll}
                    className=
                    {
                      msg.from === 'b'
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{msg.content}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div className="send-button button" onClick = {sendMessage}>Send</div>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
            </div>
          </>
  );
};
