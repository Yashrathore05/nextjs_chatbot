import Chatbot from '../components/chatbot';
import './globals.css';

export default function Home() {
  return (
    <div className="app">
      <header className="header">
        <h1>Final Task- XZECT OSPE 2024</h1>
      </header>
      <main className="main-content">
        <Chatbot />
      </main>
      <footer className="footer">
        <p>© 2024 Home Decor Chatbot. All rights reserved.</p>
      </footer>
    </div>
  );
}
