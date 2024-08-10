import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        setMessages([...messages, { sender: 'user', text: message }]);
        setMessage('');

        try {
            const response = await axios.get(`https://api.wit.ai/message?v=20230901&q=${encodeURIComponent(message)}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.WIT_AI_TOKEN}`, // Use the environment variable here
                },
            });

            const botMessage = response.data.msg || "I'm sorry, but I can only help with home decor questions.";
            setMessages([...messages, { sender: 'user', text: message }, { sender: 'bot', text: botMessage }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages([...messages, { sender: 'user', text: message }, { sender: 'bot', text: "Sorry, something went wrong." }]);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">Chatbot</div>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chatbot-message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chatbot-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
