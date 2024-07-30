import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { MessageList } from './MessageList';
import { Message, MessageType } from '../ChatBox/types';
import axios from 'axios';

export enum SocketEvents {
  UserJoined = 'user-joined',
  Disconnect = 'disconnect',
  SendMessage = 'send-message',
  GetMessages = 'get-messages',
  UpdateUsers = 'update-users',
  ReceiveMessage = 'receive-message',
  MessageHistory = 'message-history',
}


interface User {
  firstName: string,
  profile_photo: string
}
export interface MessageUser {
  [key: string]: User
}

const getToken = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  return token
}

const getToUserId = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('to');
}

const getUserId = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('user');
}

const token = getToken()
const socket = io(
  // 'http://qachat.indiaindex.com/',
  'http://localhost:3000/',
  {
    transports: ['websocket', 'polling', 'flashsocket'], query: {
      token
    }
  }
);

export const MessageBox: React.FC = () => {

  const user = getUserId();
  const to = getToUserId();
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketStatus, setSocketStatus] = useState<boolean>(socket.connected);
  const [inputMessage, setInputMessage] = useState('');
  const lastMessageRef = useRef<HTMLLIElement | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  
  useEffect(()=> {
    //http://qachat.indiaindex.com/
  const fetchMessages = async () => {
      try {
        const authToken = getToken();
        // const response = await axios.get('http://qachat.indiaindex.com/api/v1/chats', {
          const response = await axios.get('http://localhost:8000/api/v1/chats', {
            params: {
              withUser: to,
            },
            headers: {
              'ii-token' : authToken,
            }
          },
        );
        debugger
        setMessages(response.data.result);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };
    fetchMessages().then(()=>console.log('message fetched'));
  },[user, to]);

  useEffect(() => {
    // Listen for the event that updates online users
    socket.on('update-users', (users: string[]) => {
      setOnlineUsers(users);
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off('update-users');
    };
  }, []);


  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected');
      setSocketStatus(true);
    });

    socket.on(SocketEvents.ReceiveMessage, (data: { from: string; to: string; content: string; type: MessageType }) => {
      debugger
      console.log({ data })

      const newMessage: Message = {
        to: data.to,  // Include the 'to' property
        from: data.from,
        content: data.content,
        type: data.type,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // socket.emit('get-messages', { withUser: 'b' });

    return () => {
      socket.off('receive-message');
    };
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('send-message', { to, content: inputMessage, type: MessageType.FILE }); // Replace with the actual recipient ID
      setMessages([...messages, {
        content: inputMessage,
        from: user,
        to,
        type: MessageType.FILE
      }])
      setInputMessage('');
    }
  };

  return (
    <>

      <MessageList
        currentUser={user}
        lastMessageRef={lastMessageRef}
        messages={messages}
      />
      <form onSubmit={(e) => {
        e.preventDefault()
        sendMessage()

      }}>
        <div className="chat-sender">
          <input
            type="text"
            value={inputMessage}
            style={{
              flex: '3 1 auto'
            }}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <input style={{
            width: '100px',
          }} type='submit' className="send-button button" />
        </div>
      </form>
    </>
  );
};
