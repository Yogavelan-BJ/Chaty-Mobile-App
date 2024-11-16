import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useConversationContext } from "../context/conversationContext";
import { useAuthContext } from "../context/authContext";

function useGetMessages() {
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const { authUser } = useAuthContext();
  const { selectedConversation, messages, setMessages } =
    useConversationContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMsgs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${APIURL}/api/messages/${selectedConversation?._id}`,
          {
            headers: {
              Authorization: `Bearer ${authUser?.token}`,
            },
          }
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
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
    if (selectedConversation?._id) getMsgs();
  }, [selectedConversation?._id]);

  return { loading, messages };
}

export default useGetMessages;
