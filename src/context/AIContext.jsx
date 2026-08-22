import React, { createContext, useContext, useState } from "react";

const AIContext = createContext();

export function AIProvider({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <AIContext.Provider value={{ isChatOpen, toggleChat, openChat, closeChat }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  return useContext(AIContext);
}
