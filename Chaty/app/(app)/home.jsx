import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import useLogout from "../../hooks/useLogout";
import useGetConversations from "../../hooks/useGetConversations";
import { Avatar, Searchbar, Surface } from "react-native-paper";
import { useConversationContext } from "../../context/conversationContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSocketContext } from "../../context/socketContext";

const home = () => {
  const { onlineUsers } = useSocketContext();
  const { loading: logloading, logout } = useLogout();
  const { loading, conversations } = useGetConversations();
  const { setSelectedConversation } = useConversationContext();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handlePress = (convo) => {
    setSelectedConversation(convo);
    router.push("/conversation");
  };

  return (
    <SafeAreaView edges={["right", "bottom", "left"]}>
      <View className="h-full">
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          className="mb-1 mt-2"
          value={searchQuery}
        />
        <View className="flex-1">
          <ScrollView>
            {conversations?.map((convo) => {
              let isOnline = onlineUsers.includes(convo._id);
              return (
                <Surface
                  className=" m-1 rounded-xl justify-center items-center h-20 w-full"
                  key={convo._id}
                  elevation={1}
                >
                  <TouchableOpacity
                    className=" p-2 rounded-xl flex-row justify-start items-center h-full w-full"
                    onPress={() => handlePress(convo)}
                  >
                    <Image
                      className="h-14 w-14 mr-2 rounded-[8px]"
                      source={{ uri: convo.profilePic }}
                    />

                    <Text className="text-xl">{convo.fullName}</Text>
                    <Text className=" flex-grow justify-self-end text-right mr-2">
                      {isOnline ? "Online" : "Offline"}
                    </Text>
                  </TouchableOpacity>
                </Surface>
              );
            })}
          </ScrollView>
        </View>
        <TouchableOpacity onPress={() => logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default home;
