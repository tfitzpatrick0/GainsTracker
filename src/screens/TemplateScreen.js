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
import ExerciseTemplate from "../components/ExerciseTemplate";
import ExerciseNamesDisplay from "../components/ExerciseNamesDisplay";
import bodypartsList from "../constants/bodypartsList";
import colors from "../constants/colors";

// Create/modify a template for a workout routine
export default function TemplateScreen({ navigation, route }) {
  const { routine } = route.params;
  const [myExercises, setMyExercises] = useState([]);

  const initMyExercises = async () => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      if (currRoutine.template.length > 0) {
        let exercises = [];

        currRoutine.template.forEach((exerciseTemplate) => {
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
      currRoutine.template.push(exerciseTemplate);
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
      currRoutine.template.splice(index, 1);
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
    const exerciseTemplate = {
      exercise: exercise,
      sets: null,
      reps: null,
      weight: null,
    };
    storageAddExercise(routine, JSON.stringify(exerciseTemplate));
    setMyExercises([...myExercises, exercise]);
  };

  const handleRemoveExercise = (index) => {
    storageRemoveExercise(routine, index);
  };

  const renderExercises = () => {
    return myExercises.map((exercise, index) => {
      return (
        <ExerciseTemplate
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
    console.log("NAVIGATING - History: ", routine);

    navigation.navigate("History", { routine });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>{routine}</Text>
          <TouchableOpacity onPress={() => navHistory(routine)}>
            <Text>Go To History</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.exercisesWrapper}>
          {/* <TouchableOpacity onPress={() => navRoutines()}>
            <Text style={styles.headerText}>{"<"}</Text>
          </TouchableOpacity> */}

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
  exercisesWrapper: {
    paddingHorizontal: 20,
  },
});
