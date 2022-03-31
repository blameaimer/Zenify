import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import createTestSessionData from "../utils/createTestSessionData";

const DisplayStats = () => {
  const [FocusSessions, setFocusSessions] = useState([]);
  const [BreakSessions, setBreakSessions] = useState([]);
  // const [taskDataTimestamps, setTaskDataTimestamps] = useState([]);
  // const [taskDataSessionTime, setTaskDataSessionTime] = useState([]);
  const [plotData, setPlotData] = useState(
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  // console.log(plotData);

  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June"],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
  //       strokeWidth: 2, // optional
  //     },
  //   ],
  //   legend: ["Rainy Days"], // optional
  // };

  useEffect(() => {
    console.log('hiiii')
    // let dataSet = [];
    // console.log(FocusSessions)
    // FocusSessions.forEach((session) => dataSet.push(session.time));
    // dataSet = dataSet.slice(0,20)
    let dataSet = FocusSessions.map((session) => session.time).slice(0,50);
    let avgLst = []
    let acc = 20
    for (let index = 0; index < dataSet.length; index++) {
      acc += dataSet[index]
      avgLst.push(acc/(index+1))
    }
    setPlotData(() => {
      return {
        labels: ["January", "February", "March"],
        datasets: [
          {
            data: [20, ...avgLst],
            
          },
        ],
        legend: ["Focus Sessions"],
      };
    });
    setDataLoaded(true);
  }, [FocusSessions, db]);

  console.log(plotData)

  // useEffect(() => {
  //   createTestSessionData();
  // }, []);

  useEffect(() => {
    const FocusSessionRef = db
      .ref("users")
      .child(auth.currentUser.uid)
      .child("Focus");
    const BreakSessionRef = db
      .ref("users")
      .child(auth.currentUser.uid)
      .child("Break");

    const Breaklistener = BreakSessionRef.on(
      "value",
      (snapshot) => {
        const fetchedSessions = [];

        snapshot.forEach((session) => {
          fetchedSessions.push(session.val());
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
          fetchedSessions.push(session.val());
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
  // let SessionTimeStamps = [];
  FocusSessions.forEach((session) => {
    TotalWorkTime += session.time;
  });
  BreakSessions.forEach((session) => {
    TotalBreakTime += session.time;
  });
  const Focusminutes = Math.floor(TotalWorkTime / 60);
  const Focusseconds = Math.ceil(TotalWorkTime % 60);
  const Breakminutes = Math.floor(TotalBreakTime / 60);
  const Breakseconds = Math.ceil(TotalBreakTime % 60);
  // ${minutes}:${paddedSeconds}

  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            // strokeWidth: 2,
  };

  return (
    <View style={styles.container}>
      {dataLoaded ? (
        <LineChart
        withOuterLines={true}
          data={plotData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          withDots={false}
          withVerticalLines = {false}
          withHorizontalLines={false}
          bezier
        />
      ) : (
        <Text>Loading</Text>
      )}
      <View style={styles.circle}>
        <Text style={styles.circlenumber}>{FocusCount}</Text>
      </View>
      <View style={styles.sessions}>
        <View style={styles.top}>
          <View style={styles.infobox}>
            <Text style={styles.text}>Focus Sessions</Text>
            <Text style={styles.number}>{FocusCount}</Text>
          </View>
          <View style={styles.infobox}>
            <Text style={styles.text}>Work Time</Text>
            <Text style={styles.number}>
              {Focusminutes + "m " + Focusseconds + "s"}
            </Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.infobox}>
            <Text style={styles.text}>Breaks </Text>
            <Text style={styles.number}>{BreakCount}</Text>
          </View>
          <View style={styles.infobox}>
            <Text style={styles.text}>Break Time </Text>
            <Text style={styles.number}>
              {Breakminutes + "m " + Breakseconds + "s"}
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
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#121212",
  },

  circle: {
    marginTop: 40,
    backgroundColor: "#282828",
    borderColor: "dodgerblue",
    borderRadius: 200,
    height: 200,
    width: 200,
    position: "relative",
    alignSelf: "center",
    padding: 15,
    justifyContent: "center",
  },
  circlenumber: {
    alignSelf: "center",
    fontSize: 55,
    color: "#b3b3b3",
  },
  text: {
    fontSize: 14,
    color: "dodgerblue",
  },
  number: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  sessions: {
    width: "90%",
    padding: 15,
    alignSelf: "flex-end",
    backgroundColor: "#181818",
    // position: "absolute",
    borderRadius: 15,
  },
  infobox: {},
  top: {
    justifyContent: "space-between",
    paddingRight: 7,
    flexDirection: "row",
  },
  bottom: {
    justifyContent: "space-between",

    flexDirection: "row",
  },
  chair: {
    alignSelf: "flex-end",
    padding: 15,
    height: 10,
  },
});