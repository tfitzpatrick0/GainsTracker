import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Exercises(props) {
  const { bodypart } = props;
  const [exercises, setExercises] = useState([]);

  async function requestExercises(bodyPart) {
    const res = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e31bc1956amsh3e0ba5640539766p19f594jsn0c57823ec54a",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      }
    );
    const json = await res.json();

    let resExercises = [];
    json.forEach((exercise) => {
      resExercises.push(exercise.name);
    });

    setExercises(resExercises);
  }

  return (
    <View>
      <TouchableOpacity onPress={() => requestExercises(bodypart)}>
        <Text>{bodypart}</Text>
      </TouchableOpacity>
      {exercises.map((exercise, index) => {
        return <Text key={index}>{exercise}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
