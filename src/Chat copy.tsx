// src/Chat.tsx
import React, { useState, useEffect } from 'react';
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

export const Chat: React.FC = () => {
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

        socket.emit('get-messages', { withUser: 'exampleUserId' }); // Replace with the actual user ID

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

    return (
        <div>
        I am {user}
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.from}:</strong> {msg.content}
                        </li>
                    ))}
                </ul>
            </div>
            <>
                {
                    socket.connected ? 'Connected' : 'Disconnected'
                }</>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button disabled={!socketStatus || !user} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

