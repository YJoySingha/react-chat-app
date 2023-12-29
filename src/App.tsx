import React from 'react';
import './App.css';
import { Chat } from './Chat';

function App() {
  return (
    <div
      className="App"
      style={{
        height:
          window.location.href === "http://localhost:3000"
            ? "calc(100vh - 2rem)"
            : "auto",
      }}
    >
      <Chat />
    </div>
  );
} 

export default App;
