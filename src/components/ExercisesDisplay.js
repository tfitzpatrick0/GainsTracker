import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import exercisesMap from "../constants/exercisesMap";

// SHARED COMPONENT
export default function ExercisesDisplay(props) {
  const { bodypart, callOnPress } = props;
  const exercisesList = exercisesMap[bodypart];
  const [exercisesDisplay, setExercisesDisplay] = useState(false);

  const renderDisplay = () => {
    if (exercisesDisplay) {
      return (
        <View style={styles.exercisesList}>
          {exercisesList.map((exercise, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => callOnPress(exercise)}
              >
                <Text style={{ color: colors.darkGray }}>{exercise}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
  };

  return (
    <View style={styles.exercisesDisplayWrapper}>
      <TouchableOpacity onPress={() => setExercisesDisplay(!exercisesDisplay)}>
        <Text style={styles.bodypart}>{bodypart}</Text>
      </TouchableOpacity>
      {renderDisplay()}
    </View>
  );
}

const styles = StyleSheet.create({
  exercisesDisplayWrapper: {
    marginVertical: 2,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  bodypart: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  exercisesList: {
    marginTop: 5,
    paddingTop: 5,
    borderTopColor: colors.lightBlue,
    borderTopWidth: 2,
  },
});
