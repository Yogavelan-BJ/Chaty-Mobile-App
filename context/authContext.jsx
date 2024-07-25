import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";
const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const rootSegment = useSegments();
  const router = useRouter();
  useEffect(() => {
    const fetchSecureStore = async () => {
      let result = await SecureStore.getItemAsync("chatyUserDetails");
      result ? setAuthUser(JSON.parse(result)) : setAuthUser(null);
    };
    fetchSecureStore();
  }, []);
  useEffect(() => {
    if (!authUser && !rootSegment[0]) {
      return;
    } else if (!authUser && rootSegment[0] !== "(auth)") {
      router.replace("/");
    } else if (authUser && rootSegment[0] !== "(app)") {
      router.dismissAll();
      router.replace("/(app)/home");
    }
  }, [authUser, rootSegment]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
