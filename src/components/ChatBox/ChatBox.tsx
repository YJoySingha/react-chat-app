import React, { useState } from "react";
import "./ChatBox.css";

const urlParams = new URLSearchParams(window.location.search);
const jwt = urlParams.get('jwt');


const ChatBox = () => {
  const [user, setUser] = useState<string>(jwt || '');

  return (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                    {user}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
  );
};

export default ChatBox;
