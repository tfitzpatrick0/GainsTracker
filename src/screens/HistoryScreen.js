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
import TestExercise from "../components/TestExercise";

export default function HistoryScreen({ navigation, route }) {
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

        console.log("INIT TEMPLATE:", currTemplate);
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
    console.log("Adding myWorkout to HISTORY:", myWorkout);
    setMyHistory([...myHistory, myWorkout]);
    storageAddHistory(myWorkout);
    // let currHistory = [...myHistory];
    // currHistory.push(myWorkout);
    // console.log("LOGGING CURRHISTORY:", currHistory);
    // setMyHistory(currHistory);
  };

  const handleUpdateWorkout = (index, mySetsRepsAndWeight) => {
    let updatedWorkout = [...myWorkout];
    updatedWorkout[index].sets = mySetsRepsAndWeight.mySets;
    updatedWorkout[index].reps = mySetsRepsAndWeight.myReps;
    updatedWorkout[index].weight = mySetsRepsAndWeight.myWeight;
    console.log("UPDATED WORKOUT:", updatedWorkout);
    setMyWorkout(updatedWorkout);
  };

  const displayNewWorkout = () => {
    setDisplay(true);
  };

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
          {myWorkout.map((exerciseTemplate, index) => {
            return (
              <TestExercise
                key={index}
                routine={routine}
                index={index}
                exercise={exerciseTemplate.exercise}
                isets={exerciseTemplate.sets}
                ireps={exerciseTemplate.reps}
                iweight={exerciseTemplate.weight}
                handleUpdateWorkout={handleUpdateWorkout}
              />
            );
          })}
        </View>
      );
    }
  };

  useEffect(() => {
    initMyHistory();
  }, [routine]);

  useEffect(() => {
    initMyWorkout();
  }, [display]);

  const navModRoutine = (routine) => {
    console.log("NAVIGATING - Template: ", routine);

    navigation.navigate("Template", { routine });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.historyWrapper}>
          <TouchableOpacity onPress={() => navModRoutine(routine)}>
            <Text>Go to routine - {routine}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>History</Text>
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
          <TouchableOpacity onPress={() => displayNewWorkout()}>
            <Text style={styles.headerText}>Start New Workout</Text>
          </TouchableOpacity>
          {renderNewWorkout()}
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
  historyWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
