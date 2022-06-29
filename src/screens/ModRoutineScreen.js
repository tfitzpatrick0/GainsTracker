import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Exercise from "../components/Exercise";
import ExercisesDisplay from "../components/ExercisesDisplay";
import bodypartsList from "../constants/bodypartsList";

// Modify a workout workout
export default function ModRoutineScreen({ navigation, route }) {
  const { index, routineName, currRelExercises } = route.params;
  const [myExercises, setMyExercises] = useState(currRelExercises);

  const handleAddExercise = (exercise) => {
    setMyExercises([...myExercises, exercise]);
  };

  const handleRemoveExercise = (index) => {
    myExercises.splice(index, 1);
    setMyExercises([...myExercises]);
  };

  const saveRoutine = () => {
    let updatedRelExercises = { [index]: myExercises };
    console.log(updatedRelExercises);
    navigation.navigate("Routines", { updatedRelExercises });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.exercisesWrapper}>
          <TouchableOpacity onPress={() => saveRoutine()}>
            <Text style={styles.headerText}>Go Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>{routineName}</Text>
          <View style={styles.exercises}>
            {myExercises.map((exercise, index) => {
              return (
                <Exercise
                  key={index}
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
