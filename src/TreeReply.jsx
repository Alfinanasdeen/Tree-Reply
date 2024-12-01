import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hii', replies: [] },
    { id: 2, text: 'Good Morning', replies: [] },
  ]);

  const [newMessage, setNewMessage] = useState('');

  // Function to handle adding a reply to a specific message
  const handleReply = (id) => {
    if (newMessage.trim()) { 
      const newMessageObj = {
        id: uuidv4(), 
        text: newMessage, 
        replies: [], 
      };

      // Update the state with the new reply
      setMessages((prevMessages) => {
        const addReply = (messages, targetId) => {
          return messages.map((message) => {
            if (message.id === targetId) {
              // If this is the message to reply to, add the reply to its replies array
              return {
                ...message,
                replies: [...message.replies, newMessageObj],
              };
            } else if (message.replies.length > 0) {
              // If this message has replies, recursively search for the target message
              return {
                ...message,
                replies: addReply(message.replies, targetId),
              };
            }
            return message; // Return the message as is if it's not the target
          });
        };

        return addReply(prevMessages, id); // Start searching for the target message
      });

      setNewMessage(''); 
    }
  };

  // Function to recursively render messages and their replies
  const renderMessages = (messages) => {
    return messages.map((message) => (
      <div key={message.id} className="message"> 
        <div className="message-text">
          {message.text}
          <button onClick={() => handleReply(message.id)}>Reply</button>
        </div>
        <div className="replies">
          {renderMessages(message.replies)}
        </div>
      </div>
    ));
  };

  return (
    <div className="App">
      <div className="input-section">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type something..." 
        />
      </div>

      {/* Display the list of messages */}
      <div className="messages">
        {renderMessages(messages)}
      </div>
    </div>
  );
}

export default App;
