import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewWorkout from "../components/NewWorkout";
import WorkoutHistory from "../components/WorkoutHistory";
import colors from "../constants/colors";

export default function ProgressScreen({ route }) {
  const { routine } = route.params;
  const [myWorkout, setMyWorkout] = useState([]);
  const [myHistory, setMyHistory] = useState([]);
  const [newWorkoutDisplay, setNewWorkoutDisplay] = useState(false);

  const initMyHistory = async () => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      if (currRoutine.history.length > 0) {
        let currHistory = [];

        currRoutine.history.forEach((template) => {
          if (template.length > 0) {
            let currTemplate = [];

            template.forEach((templateItem) => {
              currTemplate.push(templateItem);
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

        currRoutine.template.forEach((templateItem) => {
          currTemplate.push(JSON.parse(templateItem));
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
    setNewWorkoutDisplay(false);
  };

  const renderNewWorkout = () => {
    if (newWorkoutDisplay) {
      console.log("START NEW WORKOUT");
      console.log("Starting new workout - workout template:", myWorkout);

      return (
        <NewWorkout
          routine={routine}
          handleAddHistory={handleAddHistory}
          setNewWorkoutDisplay={setNewWorkoutDisplay}
          myWorkout={myWorkout}
          setMyWorkout={setMyWorkout}
        />
      );
    }
  };

  const renderWorkoutHistory = () => {
    return myHistory.map((historyItem, index) => {
      return (
        <WorkoutHistory
          key={index}
          routine={routine}
          historyItem={historyItem}
          index={index}
        />
      );
    });
  };

  useEffect(() => {
    initMyHistory();
  }, [routine]);

  useEffect(() => {
    if (!newWorkoutDisplay) {
      initMyWorkout();
    }
  }, [newWorkoutDisplay]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={110}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.newWorkoutWrapper}>
          <View style={styles.newWorkoutTitle}>
            <Text style={styles.routineName}>{routine}</Text>
            <TouchableOpacity onPress={() => setNewWorkoutDisplay(true)}>
              <View style={styles.displayNWButton}>
                <Text style={{ fontWeight: "bold", color: colors.red }}>
                  New Workout
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {renderNewWorkout()}
        </View>

        <View style={styles.historyWrapper}>
          <View style={styles.historyTitle}>
            <Text style={styles.workoutHistory}>WORKOUT HISTORY</Text>
          </View>

          {renderWorkoutHistory()}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  newWorkoutWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  newWorkoutTitle: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 5,
    borderBottomColor: colors.red,
  },
  routineName: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.black,
  },
  displayNWButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: colors.lightRed,
    borderRadius: 10,
  },
  historyWrapper: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  historyTitle: {
    marginBottom: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: colors.blue,
  },
  workoutHistory: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
  },
});
