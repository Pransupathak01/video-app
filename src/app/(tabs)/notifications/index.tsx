import { View,FlatList } from "react-native";
import { useNotification } from "@/context/NotificationContext";
import NotificationItem from "@/components/notificationItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notifications = () => {
  const { notifications } = useNotification();
 console.log("Stored Notifications:", notifications);
  return (
    <View>
      <FlatList
      data={notifications}
      keyExtractor={(item:any) => item.id}
      renderItem={({ item }:{item:any}) => (
        <NotificationItem title={item.title} message={item.body} time={item.date}/>
      )}
      />
    </View>
  );
};
export default Notifications;