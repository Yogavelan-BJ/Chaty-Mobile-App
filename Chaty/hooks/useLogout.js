import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const APIURL = process.env.EXPO_PUBLIC_API_URL;

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${APIURL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAuthUser(null);
      SecureStore.deleteItemAsync("chatyUserDetails");
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
  return { loading, logout };
};
export default useLogout;
