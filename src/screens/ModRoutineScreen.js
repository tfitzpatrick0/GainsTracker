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
import ExercisesDisplay from "../components/ExercisesDisplay";
import bodypartsList from "../constants/bodypartsList";

// Modify a workout routine
export default function ModRoutineScreen({ navigation, route }) {
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
        console.log("Initializing exercises: ", exercises);
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
      console.log("Added exercise, updated storage: ", updatedRoutine);
    } catch (e) {
      console.log(e);
    }
  };

  const storageRemoveExercise = async (routine, templateIndex) => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      currRoutine.splice(templateIndex, 1);
      await AsyncStorage.setItem(routine, JSON.stringify(currRoutine));

      // Testing
      const updatedRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      console.log("Removed exercise, updated storage: ", updatedRoutine);
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
    myExercises.splice(index, 1);
    setMyExercises([...myExercises]);
  };

  useEffect(() => {
    initMyExercises();
  }, []);

  const navRoutines = () => {
    navigation.navigate("Routines");
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
          <Text style={styles.headerText}>{routine}</Text>
          <View style={styles.exercises}>
            {myExercises.map((exercise, index) => {
              return (
                <Exercise
                  key={index}
                  routine={routine}
                  index={index}
                  exercise={exercise}
                  handleRemoveExercise={handleRemoveExercise}
                />
              );
            })}
          </View>
          <Text style={styles.headerText}>Add Exercises</Text>
          <View style={styles.exercises}>
            {/* Exercises get displayed here */}
            {bodypartsList.map((bodypart) => {
              return (
                <ExercisesDisplay
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
