import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { aiService } from "../../services/ai.service";
import { NeonText } from "../../effects/text";
import { useAI } from "../../context/AIContext";

export default function AIChatWidget() {
  const { isChatOpen, closeChat } = useAI();
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! Soy FerreBot (Gemini IA). ¿En qué te puedo ayudar hoy?", isAi: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMsg = inputValue.trim();
    setInputValue("");
    
    // Agregamos mensaje del usuario
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, isAi: false }]);
    setIsTyping(true);

    try {
      // Llamamos a nuestro servicio de IA (Gemini)
      const reply = await aiService.sendMessage(userMsg);
      setMessages(prev => [...prev, { id: Date.now(), text: reply, isAi: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), text: "Error de conexión con Gemini.", isAi: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Ventana de Chat */}
      <div 
        className={`
          fixed bottom-6 right-6 z-[100] w-80 md:w-96 bg-negroProfundo border border-aquaTurquesa/30 
          rounded-2xl shadow-turquesaHover flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right
          ${isChatOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}
        `}
        style={{ height: "500px", maxHeight: "80vh" }}
      >
        {/* Header del Chat */}
        <div className="bg-midnightPanel border-b border-white/10 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <NeonText variant="turquesa" size="sm" className="font-bruno uppercase tracking-wider">FerreBot IA</NeonText>
          </div>
          <button 
            onClick={closeChat}
            title="Minimizar"
            className="text-gray-400 hover:text-white transition-colors text-xl font-bold"
          >
            _
          </button>
        </div>

        {/* Área de Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 bg-deepGrid scrollbar-thin scrollbar-thumb-aquaTurquesa/20">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} isAi={msg.isAi} />
          ))}
          {isTyping && <ChatMessage isTyping={true} isAi={true} />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input del Chat */}
        <form onSubmit={handleSend} className="bg-midnightPanel border-t border-white/10 p-3 flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-negroProfundo border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-aquaTurquesa/50 transition-colors"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-aquaTurquesa text-negroProfundo flex items-center justify-center disabled:opacity-50 transition-opacity"
          >
            ➤
          </button>
        </form>
      </div>
    </>
  );
}
