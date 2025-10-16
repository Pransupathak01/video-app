import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';

export default function VideoPlayerScreen() {
  const videoRef = useRef<Video>(null);
  const [isMuted, setIsMuted] = useState(false);

useFocusEffect(
  React.useCallback(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pauseAsync();
      }
    };
  }, [])
);

  const handleSkip = async (seconds: number) => {
    if (!videoRef.current) return;
    const status = await videoRef.current.getStatusAsync();
    if (status.isLoaded) {
      const newPosition = Math.max(status.positionMillis + seconds * 1000, 0);
      await videoRef.current.setPositionAsync(newPosition);
    }
  };

  const handleMute = async () => {
    if (!videoRef.current) return;
    const newMuteState = !isMuted;
    await videoRef.current.setIsMutedAsync(newMuteState);
    setIsMuted(newMuteState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 HLS Video Player</Text>

      <View style={styles.videoContainer}>
        <VideoPlayer
          videoProps={{
            ref: videoRef as React.RefObject<Video>,
            shouldPlay: true,
            resizeMode: ResizeMode.CONTAIN,
            source: {
              uri: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            },
          }}
          style={{
            videoBackgroundColor: "#000",
            height: 320,
          }}
        />
      </View>

      {/* Custom Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => handleSkip(-10)}>
          <Ionicons name="play-back" size={32} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSkip(10)}>
          <Ionicons name="play-forward" size={32} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMute}>
          <Ionicons
            name={isMuted ? "volume-mute" : "volume-high"}
            size={32}
            color="#007AFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  videoContainer: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 16,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
