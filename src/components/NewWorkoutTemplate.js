import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ExerciseTemplate from "./ExerciseTemplate";

export default function NewWorkoutTemplate(props) {
  const { routine, myWorkout, handleUpdateWorkout } = props;

  return myWorkout.map((exerciseTemplate, index) => {
    return (
      <ExerciseTemplate
        key={index}
        routine={routine}
        index={index}
        exercise={exerciseTemplate.exercise}
        manageStorage={handleUpdateWorkout}
      />
    );
  });
}

const styles = StyleSheet.create({});
