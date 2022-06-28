import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import exercisesList from "../constants/exercisesList";

export default function Exercises(props) {
  const { bodypart } = props;
  const exercises = exercisesList[bodypart];
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

  const displayExercises = () => {
    if (display) {
      return exercises.map((exercise, index) => {
        return <Text key={index}>{exercise}</Text>;
      });
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => toggleDisplay()}>
        <Text>{bodypart}</Text>
      </TouchableOpacity>
      {displayExercises()}
    </View>
  );
}

const styles = StyleSheet.create({});
