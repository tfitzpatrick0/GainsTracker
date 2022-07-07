import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Exercise from "./Exercise";

export default function NewWorkout(props) {
  const {
    routine,
    handleAddHistory,
    setNewWorkoutDisplay,
    myWorkout,
    setMyWorkout,
  } = props;

  const handleUpdateWorkout = (index, sets, reps, weight) => {
    let updatedWorkout = [...myWorkout];
    if (sets) updatedWorkout[index].sets = sets;
    if (reps) updatedWorkout[index].reps = reps;
    if (weight) updatedWorkout[index].weight = weight;
    console.log("UPDATED WORKOUT:", updatedWorkout);
    setMyWorkout(updatedWorkout);
  };

  return (
    <View>
      <View style={styles.newWorkoutOptions}>
        <TouchableOpacity
          style={styles.nwOptionsButton}
          onPress={() => handleAddHistory()}
        >
          <Text style={{ fontWeight: "bold", color: colors.red }}>DONE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nwOptionsButton}
          onPress={() => setNewWorkoutDisplay(false)}
        >
          <Text style={{ fontWeight: "bold", color: colors.red }}>EXIT</Text>
        </TouchableOpacity>
      </View>

      {myWorkout.map((templateItem, index) => {
        return (
          <Exercise
            key={index}
            routine={routine}
            index={index}
            exercise={templateItem.exercise}
            manageCurrTemplate={handleUpdateWorkout}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
