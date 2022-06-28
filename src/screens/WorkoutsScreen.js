import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Workout from "../components/Workout";

export default function WorkoutsScreen({ navigation }) {
  const [workout, setWorkout] = useState();
  const [workoutItems, setWorkoutItems] = useState([]);

  const handleAddWorkout = () => {
    Keyboard.dismiss();
    setWorkoutItems([...workoutItems, workout]);
    setWorkout(null);
  };

  const modifyWorkout = (index) => {
    navigation.navigate("ModWorkout", { index });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.workoutsWrapper}>
        <Text style={styles.headerText}>Workouts</Text>
        <View style={styles.workouts}>
          {/* Workouts get mapped here */}
          {workoutItems.map((workout, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => modifyWorkout(index)}
              >
                <Workout text={workout} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.newWorkoutWrapper}
      >
        <TextInput
          style={styles.textInput}
          placeholder={"Add a workout"}
          value={workout}
          onChangeText={(text) => setWorkout(text)}
        />
        <TouchableOpacity onPress={() => handleAddWorkout()}>
          <View style={styles.addWrapper}>
            <Text>Add</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  workoutsWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  workouts: {
    marginTop: 20,
  },
  newWorkoutWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textInput: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});
