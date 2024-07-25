import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useLogout from "../../hooks/useLogout";

const home = () => {
  const { loading, logout } = useLogout();
  return (
    <View>
      <TouchableOpacity onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default home;
