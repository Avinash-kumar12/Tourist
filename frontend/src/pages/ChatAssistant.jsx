import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { chatWithAI } from '../services/api';
import { Send, Compass, User, MessageCircle } from 'lucide-react';

const ChatAssistant = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const suggestions = [
    'Best time to visit Ladakh?',
    'Street food recommendations in Delhi',
    'Budget tips for Goa trip',
    'Safety tips for solo female travelers',
    'How to travel from Delhi to Jaipur?',
    'Must-visit temples in Varanasi'
  ];

  const sendMessage = async (text) => {
    if (!user) { navigate('/login'); return; }
    const userMsg = text || input.trim();
    if (!userMsg) return;
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const { data } = await chatWithAI(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-20 pb-4 px-4 sm:px-6 lg:px-8 flex flex-col" id="chat-page">
      <div className="max-w-3xl mx-auto w-full flex flex-col flex-1">
        <div className="text-center mb-6 animate-slide-up">
          <h1 className="font-display font-bold text-3xl text-warm-gray-800 mb-2">
            Travel <span className="heading-accent">Chat</span>
          </h1>
          <p className="text-warm-gray-500 text-sm">Ask anything about traveling in India</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[300px]">
          {messages.length === 0 && (
            <div className="card p-8 text-center animate-fade-in" id="chat-welcome">
              <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4 border border-brand-200">
                <MessageCircle className="w-7 h-7 text-brand-700" />
              </div>
              <h3 className="text-lg font-semibold text-warm-gray-800 mb-2">Namaste! 🙏</h3>
              <p className="text-warm-gray-500 text-sm mb-6">Your travel assistant for India. Ask me anything!</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => sendMessage(s)} className="text-left p-3 rounded-lg bg-warm-gray-50 hover:bg-sand-100 border border-warm-gray-200 hover:border-brand-200 text-sm text-warm-gray-600 transition-all" id={`suggestion-${i}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 animate-slide-up ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0 border border-brand-200">
                  <Compass className="w-4 h-4 text-brand-700" />
                </div>
              )}
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-brand-600 text-white rounded-br-md'
                  : 'bg-white border border-warm-gray-200 text-warm-gray-700 rounded-bl-md'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-warm-gray-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-warm-gray-600" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center border border-brand-200">
                <Compass className="w-4 h-4 text-brand-700" />
              </div>
              <div className="bg-white border border-warm-gray-200 p-4 rounded-2xl rounded-bl-md">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="bg-white border border-warm-gray-200 rounded-2xl p-2 flex items-center gap-2 sticky bottom-4 shadow-sm" id="chat-input-bar">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask about Indian travel..."
            className="flex-1 bg-transparent px-4 py-3 text-warm-gray-800 placeholder-warm-gray-400 outline-none"
            disabled={loading}
            id="chat-input"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white hover:bg-brand-700 transition-colors disabled:opacity-50"
            id="chat-send-btn"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
