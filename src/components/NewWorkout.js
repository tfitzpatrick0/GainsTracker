import React from "react";
import { StyleSheet } from "react-native";
import Exercise from "./Exercise";

export default function NewWorkout(props) {
  const { routine, myWorkout, setMyWorkout } = props;

  const handleUpdateWorkout = (index, sets, reps, weight) => {
    let updatedWorkout = [...myWorkout];
    if (sets) updatedWorkout[index].sets = sets;
    if (reps) updatedWorkout[index].reps = reps;
    if (weight) updatedWorkout[index].weight = weight;
    console.log("UPDATED WORKOUT:", updatedWorkout);
    setMyWorkout(updatedWorkout);
  };

  return myWorkout.map((exerciseTemplate, index) => {
    return (
      <Exercise
        key={index}
        routine={routine}
        index={index}
        exercise={exerciseTemplate.exercise}
        manageCurrTemplate={handleUpdateWorkout}
      />
    );
  });
}

const styles = StyleSheet.create({});
