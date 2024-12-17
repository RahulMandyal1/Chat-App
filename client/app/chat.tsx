import Header from "@/components/Message/Header";
import InputBox from "@/components/Message/InputBox";
import MessageList from "@/components/Message/MessageList";
import React from "react";
import {
  useColorScheme,
  View,
  StyleSheet,
} from "react-native";

const ChatDetail = () => {
  let colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#E9EAEB" },
      ]}
    >
      <Header />

      <MessageList />
      <InputBox />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes the entire screen
  },
  inputBoxContainer: {
    position: "absolute", // Fix the InputBox at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF", // Optional: Add background color for clarity
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: "#DDD",
  },
});

export default ChatDetail;