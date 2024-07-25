import { useState } from "react";
import Toast from "react-native-toast-message";
import { useAuthContext } from "../context/authContext";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
const useSignup = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
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
      const res = await fetch(`${APIURL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
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

  return { loading, signup };
};
export default useSignup;

const handleInputErrors = ({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    return [false, "Fields should not be empty"];
  }
  if (password !== confirmPassword) {
    return [false, "Passwords do not match"];
  }
  if (password.length < 6) {
    return [false, "Password should not be less than 6 characters"];
  }
  return [true];
};
