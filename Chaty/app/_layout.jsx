import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { AuthContextProvider } from "../context/authContext";
import Toast from "react-native-toast-message";
const RootLayout = () => {
  return (
    <>
      <AuthContextProvider>
        <Slot />
      </AuthContextProvider>
      <Toast />
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
