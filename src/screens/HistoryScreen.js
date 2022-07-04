import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewWorkoutTemplate from "../components/NewWorkoutTemplate";
import TestExercise from "../components/TestExercise";

export default function HistoryScreen({ route }) {
  const { routine } = route.params;
  const [myHistory, setMyHistory] = useState([]);
  const [myWorkout, setMyWorkout] = useState([]);
  const [display, setDisplay] = useState(false);

  const initMyHistory = async () => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      if (currRoutine.history.length > 0) {
        let currHistory = [];

        currRoutine.history.forEach((historyItem) => {
          if (historyItem.length > 0) {
            let currTemplate = [];

            historyItem.forEach((exerciseTemplate) => {
              currTemplate.push(exerciseTemplate);
            });
            currHistory.push(currTemplate);
          }
        });

        console.log("History:", currRoutine.history);
        console.log("INIT HISTORY:", currHistory);
        setMyHistory(currHistory);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const initMyWorkout = async () => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      if (currRoutine.template.length > 0) {
        let currTemplate = [];

        currRoutine.template.forEach((exerciseTemplate) => {
          currTemplate.push(JSON.parse(exerciseTemplate));
        });

        console.log("INIT WORKOUT:", currTemplate);
        setMyWorkout(currTemplate);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storageAddHistory = async (workout) => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      currRoutine.history.push(workout);
      await AsyncStorage.setItem(routine, JSON.stringify(currRoutine));

      setDisplay(false);

      // Testing
      const updatedRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      console.log(
        "Added template to history, updated storage:",
        updatedRoutine
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddHistory = () => {
    storageAddHistory(myWorkout);
    setMyHistory([...myHistory, myWorkout]);
  };

  const handleUpdateWorkout = (index, sets, reps, weight) => {
    let updatedWorkout = [...myWorkout];
    if (sets) updatedWorkout[index].sets = sets;
    if (reps) updatedWorkout[index].reps = reps;
    if (weight) updatedWorkout[index].weight = weight;
    console.log("UPDATED WORKOUT:", updatedWorkout);
    setMyWorkout(updatedWorkout);
  };

  const displayNewWorkout = () => {
    setDisplay(true);
  };

  // const renderNewWorkout = () => {
  //   if (display) {
  //     console.log("START NEW WORKOUT");
  //     console.log("Starting new workout - workout template:", myWorkout);
  //     return (
  //       <View>
  //         <TouchableOpacity onPress={() => handleAddHistory()}>
  //           <Text>DONE</Text>
  //         </TouchableOpacity>
  //         <Text>New Workout</Text>
  //         {myWorkout.map((exerciseTemplate, index) => {
  //           return (
  //             <TestExercise
  //               key={index}
  //               routine={routine}
  //               index={index}
  //               exercise={exerciseTemplate.exercise}
  //               isets={exerciseTemplate.sets}
  //               ireps={exerciseTemplate.reps}
  //               iweight={exerciseTemplate.weight}
  //               handleUpdateWorkout={handleUpdateWorkout}
  //             />
  //           );
  //         })}
  //       </View>
  //     );
  //   }
  // };

  const renderNewWorkout = () => {
    if (display) {
      console.log("START NEW WORKOUT");
      console.log("Starting new workout - workout template:", myWorkout);

      return (
        <View>
          <TouchableOpacity onPress={() => handleAddHistory()}>
            <Text>DONE</Text>
          </TouchableOpacity>
          <Text>New Workout</Text>
          <NewWorkoutTemplate
            routine={routine}
            myWorkout={myWorkout}
            handleUpdateWorkout={handleUpdateWorkout}
          />
        </View>
      );
    }
  };

  useEffect(() => {
    initMyHistory();
  }, [routine]);

  useEffect(() => {
    if (!display) {
      initMyWorkout();
    }
  }, [display]);

  // const navModRoutine = (routine) => {
  //   console.log("NAVIGATING - Template: ", routine);

  //   navigation.navigate("Template", { routine });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>{routine}</Text>
          <TouchableOpacity onPress={() => displayNewWorkout()}>
            {/* <TouchableOpacity onPress={() => navHistory(routine)}> */}

            {/* <TouchableOpacity onPress={() => displayNewWorkout()}>
              <Text style={styles.headerText}>Start New Workout</Text>
            </TouchableOpacity> */}

            <View style={styles.newWorkoutButton}>
              <Text style={{ fontWeight: "bold", color: colors.red }}>
                New Workout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.historyWrapper}>
          {renderNewWorkout()}
          {/* <TouchableOpacity onPress={() => navModRoutine(routine)}>
            <Text>Go to routine - {routine}</Text>
          </TouchableOpacity> */}
          <Text style={styles.historyText}>History</Text>
          {myHistory.map((history, index) => {
            return (
              <View key={index}>
                <Text>History {index + 1}</Text>
                {history.map((exerciseTemplate, index) => {
                  return (
                    <View key={index}>
                      <Text>Exercise: {exerciseTemplate.exercise}</Text>
                      <Text>Sets: {exerciseTemplate.sets}</Text>
                      <Text>Reps: {exerciseTemplate.reps}</Text>
                      <Text>Weight: {exerciseTemplate.weight}</Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  headerWrapper: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 5,
    borderBottomColor: colors.red,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 36,
    fontWeight: "bold",
  },
  newWorkoutButton: {
    width: 150,
    padding: 8,
    backgroundColor: colors.lightRed,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#C0C0C0",
    // borderWidth: 3,
  },
  historyWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  historyText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
