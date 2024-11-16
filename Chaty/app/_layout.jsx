import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { AuthContextProvider } from "../context/authContext";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ConversationContextProvider } from "../context/conversationContext";
import { SocketContextProvider } from "../context/socketContext";
import "../global.css";
const RootLayout = () => {
  return (
    <>
      <SafeAreaProvider>
        <AuthContextProvider>
          <ConversationContextProvider>
            <SocketContextProvider>
              <Slot />
            </SocketContextProvider>
          </ConversationContextProvider>
        </AuthContextProvider>
        <Toast />
      </SafeAreaProvider>
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
