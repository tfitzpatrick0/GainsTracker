import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Exercise(props) {
  const { routine, index, exercise, handleRemoveExercise } = props;
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [mySetsAndReps, setMySetsAndReps] = useState({
    mySets: null,
    myReps: null,
  });

  const initSetsAndReps = async () => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      let currExerciseTemplate = JSON.parse(currRoutine[index]);

      if (currExerciseTemplate.sets && currExerciseTemplate.reps) {
        console.log("Initializing sets and reps: ", exercise);
        setMySetsAndReps((mySetsAndReps) => ({
          ...mySetsAndReps,
          mySets: currExerciseTemplate.sets,
          myReps: currExerciseTemplate.reps,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storageSetsAndReps = async (sets, reps) => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      let currExerciseTemplate = JSON.parse(currRoutine[index]);
      console.log("currExerciseTemplate: ", currExerciseTemplate);

      currExerciseTemplate.sets = sets;
      currExerciseTemplate.reps = reps;

      console.log("Updated currExerciseTemplate: ", currExerciseTemplate);

      currRoutine[index] = JSON.stringify(currExerciseTemplate);
      await AsyncStorage.setItem(routine, JSON.stringify(currRoutine));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetsAndReps = () => {
    Keyboard.dismiss();
    if (sets && reps) {
      storageSetsAndReps(sets, reps);
      setMySetsAndReps((mySetsAndReps) => ({
        ...mySetsAndReps,
        mySets: sets,
        myReps: reps,
      }));
    }
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

  useEffect(() => {
    initSetsAndReps();
  }, []);

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
