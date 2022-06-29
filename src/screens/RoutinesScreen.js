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
  DeviceEventEmitter,
} from "react-native";
import Routine from "../components/Routine";

export default function RoutinesScreen({ navigation }) {
  const [routine, setRoutine] = useState();
  const [routineItems, setRoutineItems] = useState([]);
  const [relExercises, setRelExercises] = useState({});

  const handleRelExercises = (newRelExercises) => {
    console.log(newRelExercises);
    setRelExercises((relExercises) => ({
      ...relExercises,
      ...newRelExercises,
    }));
  };

  const handleAddRoutine = () => {
    Keyboard.dismiss();
    setRoutineItems([...routineItems, routine]);
    setRoutine(null);
  };

  // On first call from unique modRoutineScreen, callback function is executed multiple times?
  DeviceEventEmitter.addListener("event.modRoutine", (newRelExercises) =>
    handleRelExercises(newRelExercises)
  );

  const modifyRoutine = (index) => {
    let currRelExercises = [];
    if (relExercises[index]) {
      currRelExercises = relExercises[index];
    }

    // navigation.navigate("ModRoutine", {
    //   index,
    //   currRelExercises,
    //   handleRelExercises,
    // });
    navigation.navigate("ModRoutine", {
      index,
      currRelExercises,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.routinesWrapper}>
        <Text style={styles.headerText}>Routines</Text>
        <View style={styles.routines}>
          {/* Routines get mapped here */}
          {routineItems.map((routine, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => modifyRoutine(index.toString())}
              >
                <Routine text={routine} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.newRoutineWrapper}
      >
        <TextInput
          style={styles.textInput}
          placeholder={"Add a routine"}
          value={routine}
          onChangeText={(text) => setRoutine(text)}
        />
        <TouchableOpacity onPress={() => handleAddRoutine()}>
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
  routinesWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  routines: {
    marginTop: 20,
  },
  newRoutineWrapper: {
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
