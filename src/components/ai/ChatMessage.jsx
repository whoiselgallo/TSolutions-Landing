import React from "react";
import { UI } from "../ui/ui.config";

export default function ChatMessage({ message, isAi, isTyping }) {
  if (isTyping) {
    return (
      <div className="flex w-full justify-start mb-4">
        <div className="flex gap-2 items-center bg-midnightPanel border border-aquaTurquesa/20 px-4 py-3 rounded-2xl rounded-tl-sm shadow-turquesaSoft">
          <div className="w-2 h-2 rounded-full bg-aquaTurquesa animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-aquaTurquesa animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-aquaTurquesa animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-4 ${isAi ? "justify-start" : "justify-end"}`}>
      <div 
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isAi 
            ? "bg-midnightPanel border border-aquaTurquesa/20 text-gray-200 rounded-tl-sm shadow-turquesaSoft" 
            : "bg-naranjaEnergy text-negroProfundo font-medium rounded-tr-sm shadow-glowEnergy"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
