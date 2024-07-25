import { useState } from "react";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../context/authContext";
import * as SecureStore from "expo-secure-store";
const useLogin = () => {
  const { authUser, setAuthUser } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const login = async ({ username, password }) => {
    const success = handleInputErrors({
      username,
      password,
    });
    if (!success[0]) {
      Toast.show({
        type: "info",
        text1: success[1],
        position: "bottom",
        bottomOffset: 60,
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${APIURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAuthUser(data);
      SecureStore.setItemAsync("chatyUserDetails", JSON.stringify(data));
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

  return { loading, login };
};
export default useLogin;

const handleInputErrors = ({ username, password }) => {
  if (!username || !password) {
    return [false, "Fields should not be empty"];
  }
  return [true];
};
