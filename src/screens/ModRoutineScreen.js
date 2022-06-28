import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import Exercises from "../components/Exercises";

// Modify a workout workout
export default function ModRoutineScreen({ navigation, route }) {
  // console.log(route);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.exercisesWrapper}>
          <Text style={styles.headerText}>Exercises</Text>
          <View style={styles.exercises}>
            {/* Exercises get displayed here */}
            {bodyparts.map((bodypart, index) => {
              return <Exercises key={index} bodypart={bodypart} />;
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
