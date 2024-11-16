import { View, Text } from "react-native";
import React from "react";
import { useConversationContext } from "../../context/conversationContext.jsx";
import { Stack, Tabs } from "expo-router";

const AppLayout = () => {
  const { selectedConversation } = useConversationContext();
  return (
    <Stack>
      <Stack.Screen name="home" />
      <Stack.Screen
        name="conversation"
        options={{ title: selectedConversation?.fullName }}
      />
    </Stack>
  );
};

export default AppLayout;
