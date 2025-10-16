import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { NotificationProvider } from "@/context/NotificationContext"; // adjust path if needed

// Make sure notifications show even when the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  return (
    <NotificationProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </NotificationProvider>
  );
}
