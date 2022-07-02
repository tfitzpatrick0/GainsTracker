import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddNewRoutine(props) {
  const { myRoutines, setMyRoutines } = props;
  const [routine, setRoutine] = useState();

  const storageAddRoutine = async (routine) => {
    try {
      await AsyncStorage.setItem(
        routine,
        JSON.stringify({ template: [], history: [] })
      );
      console.log("Added routine to storage:", routine);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddRoutine = () => {
    Keyboard.dismiss();
    // Only include unique routine names - use as key for AsyncStorage
    if (routine && !myRoutines.includes(routine)) {
      storageAddRoutine(routine);
      setMyRoutines([...myRoutines, routine]);
    }
    setRoutine(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.inputFieldWrapper}
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
  );
}

const styles = StyleSheet.create({
  inputFieldWrapper: {
    padding: 20,
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
