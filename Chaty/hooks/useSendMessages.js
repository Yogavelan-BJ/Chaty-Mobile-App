import { useState } from "react";
import { useConversationContext } from "../context/conversationContext";
import { useAuthContext } from "../context/authContext";
import Toast from "react-native-toast-message";

function useSendMessages() {
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const { authUser } = useAuthContext();
  const { selectedConversation, messages, setMessages } =
    useConversationContext();
  const [loading, setLoading] = useState(false);
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${APIURL}/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authUser?.token}`,
          },
          body: JSON.stringify({ message: message }),
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data.newMessage]);
    } catch (error) {
      Toast.show({
        type: "info",
        text1: error.message,
        position: "bottom",
        bottomOffset: 60,
      });
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
}

export default useSendMessages;
