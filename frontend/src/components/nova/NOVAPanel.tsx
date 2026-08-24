import React, { useState } from 'react';
import { Sparkles, Send, User, AlertCircle, RefreshCw } from 'lucide-react';
import { novaApi } from '../../api/nova';
import novaMascot from '../../assets/maskotnova.png';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface NOVAPanelProps {
  lessonId?: number;
  moduleId?: number;
  lessonTitle?: string;
}

export const NOVAPanel: React.FC<NOVAPanelProps> = ({ lessonId, moduleId, lessonTitle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Halo! Saya **NOVA**, tutor Python Sintaks. Ada yang bingung tentang ${
        lessonTitle ? `materi **${lessonTitle}**` : 'materi ini'
      }? Tanya saya saja ya!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestionPrompts = [
    'Jelaskan materi ini secara lebih sederhana',
    'Berikan contoh kode Python lainnya',
    'Apa kesalahan umum saat menulis kode ini?',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: query };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await novaApi.chat(
        query,
        { lesson_id: lessonId, module_id: moduleId },
        messages
      );
      const assistantMsg: Message = {
        role: 'assistant',
        content: res.data.response,
      };
      setMessages([...updatedHistory, assistantMsg]);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.errors?.provider?.[0] ||
        err.response?.data?.message ||
        'NOVA sedang tidak dapat dihubungi. Coba lagi nanti.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-80 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex flex-col h-[600px] shadow-sm overflow-hidden">
      {/* Header Panel NOVA */}
      <div className="p-4 border-b border-indigo-100 bg-white/80 backdrop-blur flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden shadow-sm">
            <img src={novaMascot} alt="Maskot NOVA" className="w-full h-full object-contain p-0.5" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm text-slate-900 flex items-center gap-1.5">
              NOVA AI Tutor
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">Google Gemini AI</p>
          </div>
        </div>
      </div>

      {/* Area Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src={novaMascot} alt="NOVA" className="w-full h-full object-contain p-0.5" />
              </div>
            )}
            <div
              className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white font-medium rounded-br-none shadow-sm'
                  : 'bg-white border border-indigo-100/80 text-slate-800 rounded-bl-none shadow-xs'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-xs">
                <User size={14} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 items-center text-xs text-indigo-600 font-medium bg-white border border-indigo-100 p-3 rounded-xl w-max shadow-xs">
            <RefreshCw size={14} className="animate-spin text-indigo-600" />
            <span>NOVA sedang berpikir...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Suggestion Prompts */}
      <div className="px-3 py-2 bg-white/50 border-t border-indigo-100/60 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
        {suggestionPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="text-[11px] font-medium bg-white text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors flex-shrink-0 disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-indigo-100 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan materi Python ke NOVA..."
          disabled={isLoading}
          className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50/50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-colors flex-shrink-0"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
};
