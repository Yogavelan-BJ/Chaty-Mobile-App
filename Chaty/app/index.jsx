import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import { useAuthContext } from "../context/authContext";

const index = () => {
  return (
    <View className="justify-center items-center flex-grow bg-[#C9DABF]">
      <Link className="text-4xl" href="/login">
        <Text>login</Text>
      </Link>
      <Link className="text-4xl" href="/signup">
        <Text>signup</Text>
      </Link>
    </View>
  );
};

export default index;
