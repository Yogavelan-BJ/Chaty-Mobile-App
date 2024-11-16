import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import { useConversationContext } from "../context/conversationContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversationContext();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket]);
};
export default useListenMessages;
