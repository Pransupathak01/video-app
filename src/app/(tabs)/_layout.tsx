import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'WebView',
          tabBarIcon: ({ color, size }:any) => (
            <Ionicons name="globe" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="video/index"
        options={{
          title: 'Video',
          tabBarIcon: ({ color, size }:any) => (
            <Ionicons name="videocam" color={color} size={size} />
          ),
        }}
        
      />
      <Tabs.Screen
        name="notifications/index"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }:any) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
        
      />
    </Tabs>
  );
}
