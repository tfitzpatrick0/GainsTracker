import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import exercisesMap from "../constants/exercisesMap";

// SHARED COMPONENT
export default function displayExercises(props) {
  const { bodypart, callOnPress } = props;
  const exercisesList = exercisesMap[bodypart];
  const [displayExercises, setDisplayExercises] = useState(false);

  const renderDisplay = () => {
    if (displayExercises) {
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
    <View style={styles.displayExercisesWrapper}>
      <TouchableOpacity onPress={() => setDisplayExercises(!displayExercises)}>
        <Text style={styles.bodypart}>{bodypart}</Text>
      </TouchableOpacity>
      {renderDisplay()}
    </View>
  );
}

const styles = StyleSheet.create({
  displayExercisesWrapper: {
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
