import React from "react";
import { Stack, Tabs } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          animation: "simple_push",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
