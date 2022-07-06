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
import HistoryItem from "../components/HistoryItem";
import colors from "../constants/colors";

export default function ProgressScreen({ route }) {
  const { routine } = route.params;
  const [myWorkout, setMyWorkout] = useState([]);
  const [myHistory, setMyHistory] = useState([]);
  const [workoutDisplay, setWorkoutDisplay] = useState(false);

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
    setWorkoutDisplay(false);
  };

  const renderNewWorkout = () => {
    if (workoutDisplay) {
      console.log("START NEW WORKOUT");
      console.log("Starting new workout - workout template:", myWorkout);

      return (
        <View style={styles.newWorkoutWrapper}>
          <View style={styles.newWorkoutOptions}>
            <TouchableOpacity
              style={styles.nwOptionsButton}
              onPress={() => handleAddHistory()}
            >
              <Text style={styles.buttonText}>DONE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nwOptionsButton}
              onPress={() => setWorkoutDisplay(false)}
            >
              <Text style={styles.buttonText}>EXIT</Text>
            </TouchableOpacity>
          </View>
          <NewWorkoutTemplate
            routine={routine}
            myWorkout={myWorkout}
            setMyWorkout={setMyWorkout}
          />
        </View>
      );
    }
  };

  useEffect(() => {
    initMyHistory();
  }, [routine]);

  useEffect(() => {
    if (!workoutDisplay) {
      initMyWorkout();
    }
  }, [workoutDisplay]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>{routine}</Text>
          <TouchableOpacity onPress={() => setWorkoutDisplay(true)}>
            <View style={styles.displayNWButton}>
              <Text style={styles.buttonText}>New Workout</Text>
            </View>
          </TouchableOpacity>
        </View>

        {renderNewWorkout()}

        <View style={styles.historyWrapper}>
          <View style={styles.historyTitle}>
            <Text style={styles.historyTitleText}>WORKOUT HISTORY</Text>
          </View>

          {myHistory.map((historyItem, index) => {
            return (
              <HistoryItem
                key={index}
                routine={routine}
                historyItem={historyItem}
                index={index}
              />
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
    backgroundColor: colors.lightGray,
  },
  headerWrapper: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 5,
    borderBottomColor: colors.red,
  },
  headerText: {
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
  buttonText: {
    color: colors.red,
    fontWeight: "bold",
  },
  newWorkoutWrapper: {
    marginHorizontal: 20,
  },
  newWorkoutOptions: {
    marginBottom: 8,
    flexDirection: "row",
  },
  nwOptionsButton: {
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    backgroundColor: colors.lightRed,
    borderRadius: 10,
  },
  historyWrapper: {
    marginHorizontal: 20,
  },
  historyTitle: {
    marginBottom: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: colors.blue,
  },
  historyTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
  },
});
