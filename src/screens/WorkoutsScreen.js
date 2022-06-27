import React from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";

export default function WorkoutsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.workoutsWrapper}>
        <Text style={styles.headerText}>Workouts</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  workoutsWrapper: {
    margin: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
