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
import Exercise from "../components/Exercise";
import ExerciseNamesDisplay from "../components/ExerciseNamesDisplay";
import bodypartsList from "../constants/bodypartsList";

// Modify a workout routine
export default function TemplateScreen({ navigation, route }) {
  const { routine } = route.params;
  const [myExercises, setMyExercises] = useState([]);

  const initMyExercises = async () => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      if (currRoutine.length > 0) {
        let exercises = [];

        currRoutine.forEach((exerciseTemplate) => {
          exercises.push(JSON.parse(exerciseTemplate).exercise);
        });
        console.log("INIT EXERCISES:", exercises);
        setMyExercises(exercises);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // key = routine, value = {exercise, sets, reps}
  const storageAddExercise = async (routine, exerciseTemplate) => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      currRoutine.push(exerciseTemplate);
      await AsyncStorage.setItem(routine, JSON.stringify(currRoutine));

      // Testing
      const updatedRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      console.log("Added exercise, updated storage:", updatedRoutine);
    } catch (e) {
      console.log(e);
    }
  };

  const storageRemoveExercise = async (routine, index) => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      currRoutine.splice(index, 1);
      await AsyncStorage.setItem(routine, JSON.stringify(currRoutine));

      // Testing
      const updatedRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      console.log("Removed exercise, updated storage:", updatedRoutine);

      setMyExercises([]);
      initMyExercises();
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddExercise = (exercise) => {
    const exerciseTemplate = { exercise: exercise, sets: null, reps: null };
    storageAddExercise(routine, JSON.stringify(exerciseTemplate));
    setMyExercises([...myExercises, exercise]);
  };

  const handleRemoveExercise = (index) => {
    storageRemoveExercise(routine, index);
  };

  const renderExercises = () => {
    return myExercises.map((exercise, index) => {
      return (
        <Exercise
          key={index}
          routine={routine}
          index={index}
          exercise={exercise}
          handleRemoveExercise={handleRemoveExercise}
        />
      );
    });
  };

  useEffect(() => {
    initMyExercises();
  }, []);

  const navRoutines = () => {
    console.log("NAVIGATING - Routines");

    navigation.navigate("Routines");
  };

  const navHistory = (routine) => {
    console.log("History screen under development");
    // console.log("NAVIGATING - History: ", routine);

    // const routineHistory = routine + "History";
    // navigation.navigate("History", { routine, routineHistory });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.exercisesWrapper}>
          <TouchableOpacity onPress={() => navRoutines()}>
            <Text style={styles.headerText}>Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navHistory(routine)}>
            <Text style={styles.headerText}>Go To History</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>{routine}</Text>
          <View style={styles.exercises}>{renderExercises()}</View>
          <Text style={styles.headerText}>Add Exercises</Text>
          <View style={styles.exercises}>
            {/* Exercises get displayed here */}
            {bodypartsList.map((bodypart) => {
              return (
                <ExerciseNamesDisplay
                  key={bodypart}
                  bodypart={bodypart}
                  callOnPress={handleAddExercise}
                />
              );
            })}
          </View>
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
  exercisesWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
