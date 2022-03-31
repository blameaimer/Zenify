import { db, auth } from "../firebase";

export default function createTestSessionData() {
  const SessionRef = db.ref("users").child(auth.currentUser.uid).child("Focus");

  let counter = 7000;
  const sessionTimes = [20, 25, 30, 35, 40, 45];
  const unixTimestampPast = 1641038400;

  for (i = 0; i < 1000; i++) {
    const randomSessionTime = Math.floor(Math.random() * sessionTimes.length);
    counter++;
    console.log(i, "i");
    SessionRef.child(counter).set({
      sessionNo: counter,
      time: sessionTimes[randomSessionTime],
      timestamp: unixTimestampPast + 3600 * i,
    });
  }
}
