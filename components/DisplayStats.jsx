import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import Focus from "../Screens/Focus";

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
        snapshot.forEach((session) => {
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
        snapshot.forEach((session) => {
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

  FocusSessions.forEach(({ time }) => console.log(time));
  return (
    <View>
      <Text>DisplayStats</Text>
    </View>
  );
};

export default DisplayStats;

const styles = StyleSheet.create({});
