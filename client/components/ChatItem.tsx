import React from "react";
import { Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface ChatItemProps {
  item: {
    id: string;
    name: string;
    message: string;
    date: string;
    unreadCount?: number;
    avatars: string[]; // Array of avatar URLs
  };
  onPress?: () => void; // Optional press handler
}

const ChatItem: React.FC<ChatItemProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.chatContainer} onPress={onPress}>
    {/* Avatar Section */}
    <ThemedView style={styles.avatarContainer}>
      {item.avatars.map((avatar, index) => (
        <Image key={index} source={{ uri: avatar }} style={styles.avatar} />
      ))}
    </ThemedView>

    {/* Chat Content */}
    <ThemedView style={styles.chatContent}>
      <ThemedText style={styles.chatTitle}>{item.name}</ThemedText>
      <ThemedText style={styles.chatMessage}>{item.message}</ThemedText>
    </ThemedView>

    {/* Meta Info */}
    <ThemedView style={styles.chatMeta}>
      <ThemedText style={styles.chatDate}>{item.date}</ThemedText>
      {item.unreadCount && item.unreadCount > 0 && (
        <ThemedView style={styles.unreadBadge}>
          <ThemedText style={styles.unreadCount}>{item.unreadCount}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 10,
    flexDirection: "row",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginLeft: -10,
  },
  chatContent: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatMessage: {
    fontSize: 13,
    marginTop: 2,
  },
  chatMeta: {
    alignItems: "flex-end",
  },
  chatDate: {
    fontSize: 12,
    color: "#999",
  },
  unreadBadge: {
    backgroundColor: "#357AF5",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 5,
  },
  unreadCount: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ChatItem;
