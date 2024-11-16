import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../context/authContext";

const useGetConversations = () => {
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const { authUser } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConvos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${APIURL}/api/users`, {
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
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
    getConvos();
  }, [authUser]);

  return { loading, conversations };
};

export default useGetConversations;
