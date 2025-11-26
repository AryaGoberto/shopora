// app/components/ChatBot.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Maximize2, Minimize2 } from "lucide-react";
import { inter, playfair } from "../../lib/font";
import Image from "next/image";
import Link from "next/link";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Halo! Ada yang bisa saya bantu seputar Shopora?",
      sender: "bot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowClasses = isMaximized
    ? "w-[calc(100vw-3rem)] h-[calc(100vh-3rem)] md:w-[28rem] md:h-[40rem]" // Ukuran lebih besar atau adaptif
    : "w-80 h-96";
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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await response.json();

      // 3. Tampilkan jawaban AI
      const botMsg: Message = {
        id: Date.now() + 1,
        text: data.reply,
        sender: "bot",
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
      {isOpen && (
        <div
          className={`bg-white ${chatWindowClasses} rounded-xl shadow-xl flex flex-col mb-4 overflow-hidden transition-all duration-300 ease-in-out`}
        >
          {/* Header */}
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <Image
                src="/logo_shopora.svg"
                alt="Shopora Logo"
                width={25}
                height={25}
                className="svg-white-filter"
              />
              <Link
                href="/"
                className={`text-lg font-bold text-white ${playfair.className}`}
              >
                Shopora
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {/* Tombol Maximize/Minimize */}
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                title={isMaximized ? "Perkecil" : "Perbesar"}
              >
                {isMaximized ? (
                  <Minimize2 size={20} />
                ) : (
                  <Maximize2 size={20} />
                )}
              </button>
              <button onClick={() => setIsOpen(false)} title="Tutup">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Isi Chat */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Perubahan pada balon chat Bot: background putih, shadow lebih jelas, border ringan */}
                <div
                  className={`max-w-[80%] px-4 py-2 text-sm rounded-xl transition-all duration-200 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 shadow-sm border border-gray-200 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Perubahan style pada isTyping */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-xl rounded-tl-none shadow-sm animate-pulse">
                  Bot sedang mengetik...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t flex items-center gap-2">
            {" "}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Tanya..."
              className="flex-1 text-base border border-gray-300 rounded-full px-4 py-2.5 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-2.5 rounded-full shadow-lg hover:bg-blue-700 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Tombol Bulat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:scale-[1.05] transition-transform duration-200"
        title={isOpen ? "Tutup Chat" : "Buka Chat"}
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
};

export default ChatBot;
