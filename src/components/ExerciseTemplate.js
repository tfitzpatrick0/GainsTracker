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
  const [weight, setWeight] = useState();
  const [templateInfo, setTemplateInfo] = useState({
    mySets: null,
    myReps: null,
    myWeight: null,
  });

  const initTemplateInfo = async () => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));

      // Parsing currRoutine.template[index] may give undefined error because AsyncStorage at [index] not initialized
      // Therefore, need to check if index is in range of currRoutine.template
      // Might not be an issue after fix for removing exercises -> wait until Async is updated to re-render?

      let currExerciseTemplate = JSON.parse(currRoutine.template[index]);
      console.log("INIT SETS AND REPS: ", currExerciseTemplate);

      setTemplateInfo((templateInfo) => ({
        ...templateInfo,
        mySets: currExerciseTemplate.sets,
        myReps: currExerciseTemplate.reps,
        myWeight: currExerciseTemplate.weight,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const storageTemplateInfo = async (sets, reps, weight) => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      let currExerciseTemplate = JSON.parse(currRoutine.template[index]);
      console.log("currExerciseTemplate: ", currExerciseTemplate);

      if (sets) currExerciseTemplate.sets = sets;
      if (reps) currExerciseTemplate.reps = reps;
      if (weight) currExerciseTemplate.weight = weight;

      console.log("Updated currExerciseTemplate: ", currExerciseTemplate);

      currRoutine.template[index] = JSON.stringify(currExerciseTemplate);
      await AsyncStorage.setItem(routine, JSON.stringify(currRoutine));
    } catch (e) {
      console.log(e);
    }
  };

  const handleTemplateInfo = () => {
    Keyboard.dismiss();
    storageTemplateInfo(sets, reps, weight);

    setTemplateInfo((templateInfo) => ({
      ...templateInfo,
      mySets: sets ? sets : templateInfo.mySets,
      myReps: reps ? reps : templateInfo.myReps,
      myWeight: weight ? weight : templateInfo.myWeight,
    }));

    setSets(null);
    setReps(null);
    setWeight(null);
  };

  const renderTemplateInfo = () => {
    return (
      <View>
        <Text>
          Sets: {templateInfo.mySets ? templateInfo.mySets : "--"} | Reps:{" "}
          {templateInfo.myReps ? templateInfo.myReps : "--"} | Weight
          {" ("}lbs{")"}: {templateInfo.myWeight ? templateInfo.myWeight : "--"}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    initTemplateInfo();
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={styles.exerciseTemplateWrapper}
        onPress={() => handleRemoveExercise(index)}
      >
        <Text style={{ fontWeight: "bold" }}>{exercise}</Text>
        {renderTemplateInfo()}
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.inputField}>
            <TextInput
              style={{ marginRight: 25 }}
              placeholder={"Sets"}
              placeholderTextColor={colors.gray}
              value={sets}
              onChangeText={(text) => setSets(text)}
            />
            <TextInput
              style={{ marginRight: 25 }}
              placeholder={"Reps"}
              placeholderTextColor={colors.gray}
              value={reps}
              onChangeText={(text) => setReps(text)}
            />
            <TextInput
              style={{ marginRight: 25 }}
              placeholder={"Weight"}
              placeholderTextColor={colors.gray}
              value={weight}
              onChangeText={(text) => setWeight(text)}
            />
          </View>
          <TouchableOpacity onPress={() => handleTemplateInfo()}>
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
  keyboardAvoidingView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputField: {
    flexDirection: "row",
  },
});
