// app/components/ChatBot.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Halo! Ada yang bisa saya bantu seputar Shopora?", sender: "bot" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke bawah
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Tampilkan pesan user
    const userMsg: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // 2. Kirim ke otak AI yang kita buat di Tahap 3
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await response.json();

      // 3. Tampilkan jawaban AI
      const botMsg: Message = { 
        id: Date.now() + 1, 
        text: data.reply, 
        sender: "bot" 
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Jendela Chat */}
      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl border flex flex-col mb-4 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-800 p-4 text-white flex justify-between items-center">
            <h3 className="font-bold">Shopora AI</h3>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          {/* Isi Chat */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white border text-gray-800"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-xs text-gray-400 ml-4">Bot sedang mengetik...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Tanya..."
              className="flex-1 text-sm border rounded-full px-4 py-2 outline-none"
            />
            <button onClick={handleSend} className="bg-blue-800 text-white p-2 rounded-full">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Tombol Bulat */}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-800 text-white p-4 rounded-full shadow-lg hover:scale-110 transition">
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default ChatBot;