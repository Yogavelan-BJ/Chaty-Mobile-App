import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { useConversationContext } from "../../context/conversationContext";
import useGetMessages from "../../hooks/useGetMessages";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  IconButton,
  MD3Colors,
  Surface,
  TextInput,
} from "react-native-paper";
import { useAuthContext } from "../../context/authContext";
import { extractTime } from "../../utils/ExtractTime.js";
import useSendMessages from "../../hooks/useSendMessages.js";
import useListenMessages from "../../hooks/useListenMessages.js";
const conversation = () => {
  useListenMessages();
  const { selectedConversation, messages } = useConversationContext();
  const { authUser } = useAuthContext();
  const { loading } = useGetMessages();
  const { loading: messageLoad, sendMessage } = useSendMessages();
  const [message, setMessage] = useState("");
  const handleSend = () => {
    if (!message) return;
    sendMessage(message);
    setMessage("");
  };
  return (
    <SafeAreaView edges={["right", "bottom", "left"]}>
      <View className="h-full">
        <View className="flex-1">
          <ScrollView>
            {messages?.map((msg) => {
              let time = extractTime(msg.createdAt);
              return (
                <Surface
                  className={`${
                    msg.senderId === authUser._id
                      ? "self-end bg-green-100"
                      : "self-start"
                  } m-2 p-2 rounded-xl justify-center max-w-[300px] min-w-[100px] flex-none`}
                  key={msg._id}
                  elevation={1}
                >
                  <Text className="text-lg">{msg.message}</Text>
                  <Text className="self-end">{time}</Text>
                </Surface>
              );
            })}
          </ScrollView>
        </View>
        <View className="flex-row items-center justify-center">
          <TextInput
            className="m-2 rounded-full flex-grow "
            label="Type Your Message Here"
            mode="flat"
            value={message}
            underlineColor="white"
            onChangeText={(text) => setMessage(text)}
            activeUnderlineColor="black"
            underlineStyle={{ display: "none" }}
          />
          <IconButton
            icon="send"
            iconColor={MD3Colors.error50}
            size={35}
            onPress={handleSend}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default conversation;
