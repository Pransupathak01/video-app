import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

interface NotificationItemProps {
  title: string;
  message: string;
  time?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  message,
  time,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      {time && <Text style={styles.time}>{time}</Text>}
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
     flexDirection:'row',
     justifyContent:'space-between',
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  content: {
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: "#135dbdff",
    alignSelf: "flex-start",
  },
});
