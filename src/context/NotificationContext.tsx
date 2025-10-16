import React, { createContext, useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StoredNotification {
     id: string;
     title: string;
     body: string;
     date: string;
}

interface NotificationContextProps {
     triggerNotification: (message: string) => void;
     notifications: StoredNotification[];
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
     undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
     children,
}) => {
     const [notifications, setNotifications] = useState<StoredNotification[]>([]);

     useEffect(() => {
          registerForPushNotificationsAsync();
          loadNotifications();
     }, []);

     const registerForPushNotificationsAsync = async () => {
          if (!Device.isDevice) {
               alert("Must use physical device for notifications");
               return;
          }

          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;

          if (existingStatus !== "granted") {
               const { status } = await Notifications.requestPermissionsAsync();
               finalStatus = status;
          }

          if (finalStatus !== "granted") {
               alert("Failed to get notification permissions!");
               return;
          }

     };

     const loadNotifications = async () => {
          try {
               const saved = await AsyncStorage.getItem("notifications");
               if (saved) setNotifications(JSON.parse(saved));
          } catch (e) {
               console.log("Error loading notifications:", e);
          }
     };

     // Save to AsyncStorage whenever notifications change
     useEffect(() => {
          AsyncStorage.setItem("notifications", JSON.stringify(notifications));
     }, [notifications]);

     // Trigger local notification and store it
     const triggerNotification = async (message: string) => {
          const id = await Notifications.scheduleNotificationAsync({
               content: {
                    title: "Local Notification",
                    body: message,
               },
               trigger: null,
          });

          const newNotification: StoredNotification = {
               id,
               title: "Local Notification",
               body: message,
               date: new Date().toLocaleString(),
          };

          setNotifications((prev) => [...prev, newNotification]);
     };


     return (
          <NotificationContext.Provider
               value={{ triggerNotification, notifications }}
          >
               {children}
          </NotificationContext.Provider>
     );
};

// Hook to access notifications anywhere
export const useNotification = () => {
     const context = useContext(NotificationContext);
     if (!context) {
          throw new Error("useNotification must be used within NotificationProvider");
     }
     return context;
};
