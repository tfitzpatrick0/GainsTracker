import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Exercises from "../components/Exercises";

// Modify a workout workout
export default function ModRoutineScreen({ navigation, route }) {
  // console.log(route);

  const { index, currRelExercises, handleRelExercises } = route.params;
  const [myExercises, setMyExercises] = useState(currRelExercises);

  const bodyparts = [
    "back",
    "cardio",
    "chest",
    "lower arms",
    "lower legs",
    "neck",
    "shoulders",
    "upper arms",
    "upper legs",
    "waist",
  ];

  const handleAddExercise = (exercise) => {
    setMyExercises([...myExercises, exercise]);
  };

  const handleRemoveExercise = (index) => {
    myExercises.splice(index, 1);
    setMyExercises([...myExercises]);
  };

  const saveRoutine = () => {
    let newRelExercises = {};
    newRelExercises = { [index]: myExercises };
    handleRelExercises(newRelExercises);
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
          <TouchableOpacity onPress={() => saveRoutine()}>
            <Text style={styles.headerText}>Go Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Your Exercises</Text>
          <View style={styles.exercises}>
            {myExercises.map((exercise, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleRemoveExercise(index)}
                >
                  <Text>{exercise}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.headerText}>Add Exercises</Text>
          <View style={styles.exercises}>
            {/* Exercises get displayed here */}
            {bodyparts.map((bodypart) => {
              return (
                <Exercises
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
