import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let sessionNotificationId;

export async function handleSessionNotification(isPlaying, content) {
  if (isPlaying) {
    await Notifications.cancelScheduledNotificationAsync(sessionNotificationId);
  } else {
    sendNotification(content);
  }
}

async function sendNotification(content) {
  const { remainingTime, title, body } = content;
  sessionNotificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: { seconds: remainingTime },
  });
}
