import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";
const ConversationContext = createContext();

export const useConversationContext = () => {
  return useContext(ConversationContext);
};

export const ConversationContextProvider = ({ children }) => {
  const [selectedConversation, setSelectedConversation] = useState({});
  const [messages, setMessages] = useState([]);

  return (
    <ConversationContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
