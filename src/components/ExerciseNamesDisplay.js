import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import exercisesMap from "../constants/exercisesMap";

// SHARED COMPONENT
export default function ExerciseNamesDisplay(props) {
  const { bodypart, callOnPress } = props;
  const exercisesList = exercisesMap[bodypart];
  const [display, setDisplay] = useState(false);

  // Use API calls to get exercises for each bodypart:
  // limited by allowed number of API calls, store as constant values instead

  // const [exercises, setExercises] = useState([]);

  // async function requestExercises(bodyPart) {
  //   const res = await fetch(
  //     `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "e31bc1956amsh3e0ba5640539766p19f594jsn0c57823ec54a",
  //         "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  //       },
  //     }
  //   );
  //   const json = await res.json();

  //   let resExercises = [];
  //   json.forEach((exercise) => {
  //     resExercises.push(exercise.name);
  //   });

  //   setExercises(resExercises);
  // }

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  const renderDisplay = () => {
    if (display) {
      return exercisesList.map((exercise, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => callOnPress(exercise)}>
            <Text>{exercise}</Text>
          </TouchableOpacity>
        );
      });
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => toggleDisplay()}>
        <Text style={styles.bodypartText}>{bodypart}</Text>
      </TouchableOpacity>
      {renderDisplay()}
    </View>
  );
}

const styles = StyleSheet.create({
  bodypartText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
