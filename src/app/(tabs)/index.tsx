import React, { useCallback, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNotification } from "@/context/NotificationContext";

export default function WebViewScreen() {
  const { triggerNotification } = useNotification();
  const videoUrl = "https://docs.expo.dev/versions/latest/sdk/notifications";

  const hasTriggered = useRef(false); 

  const handleWebViewLoaded = useCallback(() => {
    if (hasTriggered.current) return; 
    hasTriggered.current = true;

    setTimeout(() => {
      triggerNotification("Notification #1 fired!");
    }, 500);

    setTimeout(() => {
      triggerNotification("Notification #2 fired!");
    }, 5000);
  }, [triggerNotification]);

  return (
    <View style={styles.container}>
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: videoUrl }}
          style={styles.webview}
          startInLoadingState
          showsVerticalScrollIndicator={false}
          onLoadEnd={handleWebViewLoaded}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  webviewContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    margin: 8,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  webview: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
});
