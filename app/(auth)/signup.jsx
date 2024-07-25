import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { RadioButton, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link } from "expo-router";
import useSignup from "../../hooks/useSignup";
import { useAuthContext } from "../../context/authContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const { loading, signup } = useSignup();
  const { authUser } = useAuthContext();
  const handleSubmit = () => {
    signup({
      username,
      fullName,
      password,
      confirmPassword,
      gender,
    });
    console.log(authUser);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="bg-slate-400 flex-1 p-10 justify-center">
        <Text className="m-2 text-3xl self-center">Signup Chaty</Text>
        <TextInput
          label="Fullname"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          className="m-2"
        />
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
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          className="m-2"
        />
        <View className="flex-row items-center">
          <RadioButton
            value="male"
            status={gender === "male" ? "checked" : "unchecked"}
            onPress={() => setGender("male")}
          />
          <Text>Male</Text>
          <RadioButton
            value="female"
            status={gender === "female" ? "checked" : "unchecked"}
            onPress={() => setGender("female")}
          />
          <Text>female</Text>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-900 m-5 h-10 border rounded-md flex justify-center items-center"
        >
          <Text>submit</Text>
        </TouchableOpacity>
        <Link replace href="login" className="self-center">
          Already have an account?
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
