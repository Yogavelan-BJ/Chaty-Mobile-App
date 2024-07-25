import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Link } from "expo-router";
import useLogin from "../../hooks/useLogin";
import { useAuthContext } from "../../context/authContext";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authUser } = useAuthContext();
  const { loading, login } = useLogin();
  const handleSubmit = () => {
    login({ username, password });
  };

  return (
    <View className="bg-slate-400 h-full p-10 justify-center">
      <Text className="m-2 text-3xl self-center">Login Chaty</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        className="m-2"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        className="m-2"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-900 m-5 h-10 border rounded-md flex justify-center items-center"
      >
        <Text>submit</Text>
      </TouchableOpacity>
      <Link replace href="signup" className="self-center">
        Don't have an account?
      </Link>
    </View>
  );
};

export default login;
