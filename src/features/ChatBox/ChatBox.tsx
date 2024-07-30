import React from "react";
import ChatBox from "../../components/ChatBox/ChatBox";

import "./ChatBox.css";
import { MessageBox } from "../../components/MessageBox";
const Chat = () => {

  return (
    <>
      <div className="ChatBox-container">
      
          <>
            {/* chat-header */}
            <ChatBox />
            {/* chat-body */}
            <MessageBox />
          </>
       
      </div>
    </>
  );
};

export default Chat;
