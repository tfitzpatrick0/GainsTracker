import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";

export default function Exercise(props) {
  const { index, exercise, handleRemoveExercise } = props;
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [mySetsAndReps, setMySetsAndReps] = useState({
    mySets: null,
    myReps: null,
  });

  const handleSetsAndReps = () => {
    Keyboard.dismiss();
    setMySetsAndReps((mySetsAndReps) => ({
      ...mySetsAndReps,
      mySets: sets,
      myReps: reps,
    }));
    setSets(null);
    setReps(null);
  };

  const renderSetsAndReps = () => {
    if (mySetsAndReps.mySets && mySetsAndReps.myReps) {
      return (
        <View style={styles.setsAndReps}>
          <Text style={styles.setsAndRepsText}>
            Sets: {mySetsAndReps.mySets}
          </Text>
          <Text style={styles.setsAndRepsText}>
            Reps: {mySetsAndReps.myReps}
          </Text>
        </View>
      );
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handleRemoveExercise(index)}>
        <Text>{exercise}</Text>
        {renderSetsAndReps()}
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          placeholder={"Sets"}
          value={sets}
          onChangeText={(text) => setSets(text)}
        />
        <TextInput
          placeholder={"Reps"}
          value={reps}
          onChangeText={(text) => setReps(text)}
        />
        <TouchableOpacity onPress={() => handleSetsAndReps()}>
          <View>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({});
