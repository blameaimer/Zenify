import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const DisplayStats = () => {
  const [FocusSessions, setFocusSessions] = useState([]);
  const [BreakSessions, setBreakSessions] = useState([]);

  useEffect(() => {
    const userName = auth.currentUser?.displayName;
    const FocusSessionRef = db.ref("users").child(userName).child("Focus");
    const BreakSessionRef = db.ref("users").child(userName).child("Break");

    const Breaklistener = BreakSessionRef.on(
      "value",
      (snapshot) => {
        const fetchedSessions = [];

        snapshot.val().forEach((session) => {
          fetchedSessions.push(session);
        });
        setBreakSessions(fetchedSessions);
      },
      (errorObject) => {
        console.log("The readfailed: " + errorObject);
      }
    );
    const Focuslistener = FocusSessionRef.on(
      "value",
      (snapshot) => {
        const fetchedSessions = [];
        snapshot.val().forEach((session) => {
          fetchedSessions.push(session);
        });
        setFocusSessions(fetchedSessions);
      },
      (errorObject) => {
        console.log("The readfailed: " + errorObject);
      }
    );

    return () => {
      BreakSessionRef.off("value", Breaklistener);
      FocusSessionRef.off("value", Focuslistener);
    };
  }, [db]);

  const FocusCount = FocusSessions.length;
  const BreakCount = BreakSessions.length;
  let TotalWorkTime = 0;
  let TotalBreakTime = 0;
  FocusSessions.forEach((session) => {
    TotalWorkTime += session.time;
  });
  BreakSessions.forEach((session) => {
    TotalBreakTime += session.time;
  });

  return (
    <View style={styles.container}>
      <View></View>
      <View></View>
      <View></View>
      <View style={styles.sessions}>
        <View style={styles.top}>
          <View style={styles.infobox}>
            <Text style={styles.text}>Focus Sessions Work Time</Text>
            <Text style={styles.text}>
              {FocusCount} {TotalWorkTime}
            </Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.infobox}>
            <Text style={styles.text}>Breaks Break Time </Text>
            <Text style={styles.text}>
              {BreakCount} {TotalBreakTime}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DisplayStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#181818",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "dodgerblue",
  },
  sessions: {
    width: "100%",
  },
  infobox: {},
  top: {
    backgroundColor: "black",
    flexDirection: "row",
  },
  bottom: {
    backgroundColor: "pink",
    flexDirection: "row",
  },
});
