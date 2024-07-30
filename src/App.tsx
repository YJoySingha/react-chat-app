import React from 'react';
import './App.css';
import { Chat } from './Chat';

function App() {

  const url = process.env.BASE_URL;

  return (
    <div
      className="App"
      style={{
        height:
          window.location.href === url
            ? "calc(100vh - 2rem)"
            : "auto",
      }}
    >
      <Chat />
    </div>
  );
} 

export default App;
