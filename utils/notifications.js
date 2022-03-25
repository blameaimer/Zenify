import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function sendNotification(sessionTitle, bodyContent) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: sessionTitle,
      body: bodyContent,
      //   data: { data: "goes here" },
    },
    trigger: null,
  });
}

if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
  });
}
