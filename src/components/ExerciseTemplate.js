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
import colors from "../constants/colors";

export default function ExerciseTemplate(props) {
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

      // Parsing currRoutine.template[index] may give undefined error because AsyncStorage at [index] not initialized
      // Therefore, need to check if index is in range of currRoutine.template
      // Might not be an issue after fix for removing exercises -> wait until Async is updated to re-render?

      let currExerciseTemplate = JSON.parse(currRoutine.template[index]);
      console.log("INIT SETS AND REPS: ", currExerciseTemplate);

      if (currExerciseTemplate.sets && currExerciseTemplate.reps) {
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
      let currExerciseTemplate = JSON.parse(currRoutine.template[index]);
      console.log("currExerciseTemplate: ", currExerciseTemplate);

      currExerciseTemplate.sets = sets;
      currExerciseTemplate.reps = reps;

      console.log("Updated currExerciseTemplate: ", currExerciseTemplate);

      currRoutine.template[index] = JSON.stringify(currExerciseTemplate);
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
        <View>
          <Text>
            Sets: {mySetsAndReps.mySets} | Reps: {mySetsAndReps.myReps}
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
      <TouchableOpacity
        style={styles.exerciseTemplateWrapper}
        onPress={() => handleRemoveExercise(index)}
      >
        <Text style={{ fontWeight: "bold" }}>{exercise}</Text>
        {renderSetsAndReps()}
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
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseTemplateWrapper: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
});
