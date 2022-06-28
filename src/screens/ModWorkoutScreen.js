import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Modify a workout workout
export default function ModWorkoutScreen({ navigation, route }) {
  // console.log(route);

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

    console.log(json);

    json.forEach((element) => {
      console.log(element.name);
    });
  }

  // requestExercises();

  return (
    <View>
      <Text>Hey</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
