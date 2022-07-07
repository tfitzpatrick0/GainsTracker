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
import colors from "../constants/colors";

export default function AddRoutine(props) {
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
        placeholder={"Add a routine..."}
        placeholderTextColor={colors.gray}
        value={routine}
        onChangeText={(text) => setRoutine(text)}
      />
      <TouchableOpacity onPress={() => handleAddRoutine()}>
        <View style={styles.addRoutineButton}>
          <Text style={{ fontWeight: "bold", color: colors.black }}>ADD</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputFieldWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textInput: {
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    // borderColor: "#C0C0C0",
    // borderWidth: 3,
  },
  addRoutineButton: {
    width: 60,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "#C0C0C0",
    // borderWidth: 3,
  },
});
