import React from 'react';
import ChatBox from './features/ChatBox/ChatBox';

export const Chat: React.FC = () => {

    return (
        <div className="Chat">
          {/* Left Side */}
          <div className="Left-side-chat">
            
            <div className="Chat-container">
              <h2>Chats</h2>
              <div className="Chat-list">
   
              </div>
            </div>
          </div>
    
          {/* Right Side */}
    
          <div className="Right-side-chat">
            <div style={{ width: "20rem", alignSelf: "flex-end" }}>
              {/* <NavIcons /> */}
            </div>
            <ChatBox />
          </div>
        </div>
      );
};

