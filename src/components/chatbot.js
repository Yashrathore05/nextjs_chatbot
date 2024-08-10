"use client";
import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css';

const referenceQuestions = [
  { question: "What are some modern decor ideas?", answer: "Consider minimalistic designs with neutral colors and natural materials." },
  { question: "How to choose the right color palette?", answer: "Pick colors that complement each other and suit your style." },
  { question: "Best furniture for small spaces?", answer: "Opt for multi-functional furniture like sofa beds and foldable tables." },
  { question: "Tips for a cozy living room?", answer: "Use soft lighting, plush rugs, and throw pillows for a warm, inviting space." },
  { question: "How to decorate on a budget?", answer: "DIY projects and upcycled furniture can give your space a fresh look without breaking the bank." },
  { question: "What's trending in 2024 decor?", answer: "Sustainable materials and eco-friendly designs are in vogue this year." }
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);

    try {
      const response = await axios.post('/api/chatbot', { message });
      const botMessage = response.data.message || "I'm sorry, but I can only help with home decor questions.";
      setMessages((prevMessages) => [...prevMessages, { text: botMessage, sender: 'bot' }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { text: "Error processing request.", sender: 'bot' }]);
    }
  };

  const handleReferenceClick = (answer) => {
    setMessages((prevMessages) => [...prevMessages, { text: "Typing...", sender: 'bot' }]);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { text: answer, sender: 'bot' }
      ]);
    }, 1500); // 1.5 second delay for a more natural feel
  };

  return (
    <div className="container">
      <div className="reference-questions">
        {referenceQuestions.map((item, index) => (
          <button
            key={index}
            className="reference-question-btn"
            onClick={() => handleReferenceClick(item.answer)}
          >
            {item.question}
          </button>
        ))}
      </div>
      <div className="chatbot-container">
        <div className="chatbot-header">
          Home Decor Assistant
        </div>
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chatbot-message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                sendMessage(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button onClick={() => {
            const input = document.querySelector('.chatbot-input input');
            if (input.value.trim()) {
              sendMessage(input.value);
              input.value = '';
            }
          }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
