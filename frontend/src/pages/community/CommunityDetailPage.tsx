import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { communityApi } from '../../api/community';
import { Community, CommunityMessage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Users, Send, Loader2, MessageSquare } from 'lucide-react';

export const CommunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const communityId = Number(id);
  const { user } = useAuth();

  const [community, setCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchCommunityData = async () => {
    if (!communityId) return;
    try {
      const commRes = await communityApi.getCommunity(communityId);
      setCommunity(commRes.data);

      const msgRes = await communityApi.getMessages(communityId);
      setMessages(msgRes.data.messages || []);
    } catch (err) {
      console.error('Failed to load community detail:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityData();
  }, [communityId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;
    setIsSending(true);
    try {
      const res = await communityApi.postMessage(communityId, inputText);
      setMessages([...messages, res.data.message]);
      setInputText('');
    } catch (err) {
      console.error('Failed to post message:', err);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-indigo-600" />
        </div>
      </AppLayout>
    );
  }

  if (!community) {
    return (
      <AppLayout>
        <div className="text-center py-20 space-y-4">
          <h2 className="font-sans font-bold text-xl text-slate-800">Komunitas Tidak Ditemukan</h2>
          <Link to="/community" className="text-indigo-600 text-xs font-semibold hover:underline">
            Kembali ke Daftar Komunitas
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-4 max-w-4xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
        {/* Header Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Users size={20} />
            </div>
            <div>
              <h2 className="font-sans font-bold text-base text-slate-900">{community.name}</h2>
              <span className="text-xs text-slate-500 font-medium">
                {community.members_count || 1} Anggota Tergabung
              </span>
            </div>
          </div>

          <Link
            to="/community"
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-semibold text-xs rounded-xl transition-colors"
          >
            Semua Komunitas
          </Link>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 overflow-y-auto space-y-4 shadow-xs">
          {messages.length === 0 ? (
            <div className="text-center py-16 space-y-2 text-slate-400">
              <MessageSquare size={32} className="mx-auto text-slate-300" />
              <p className="text-xs">Belum ada pesan di komunitas ini. Mulai percakapan pertama!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.user_id === user?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isMine ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-xs overflow-hidden flex-shrink-0">
                    {msg.user?.avatar ? (
                      <img src={msg.user.avatar} alt={msg.user.name} className="w-full h-full object-cover" />
                    ) : (
                      (msg.user?.name || 'U').charAt(0).toUpperCase()
                    )}
                  </div>

                  <div className={`max-w-[75%] space-y-1 ${isMine ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium px-1">
                      <span>{msg.user?.name || 'Pengguna'}</span>
                      <span>•</span>
                      <span>{new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isMine
                          ? 'bg-indigo-600 text-white rounded-tr-none shadow-xs'
                          : 'bg-slate-100 text-slate-900 rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box Bar */}
        <form
          onSubmit={handleSendMessage}
          className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex items-center gap-3 flex-shrink-0"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tulis pesan untuk komunitas..."
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-semibold text-xs rounded-xl transition-all shadow-md shadow-indigo-100 disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0"
          >
            {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            <span className="hidden sm:inline">Kirim</span>
          </button>
        </form>
      </div>
    </AppLayout>
  );
};
