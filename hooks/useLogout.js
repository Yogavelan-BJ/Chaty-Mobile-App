import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = () => {
    setLoading(true);
    try {
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
