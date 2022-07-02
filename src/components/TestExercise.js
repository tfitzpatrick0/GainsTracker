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

export default function TestExercise(props) {
  const {
    routine,
    index,
    exercise,
    isets,
    ireps,
    iweight,
    handleUpdateWorkout,
  } = props;
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();
  const [mySetsRepsAndWeight, setMySetsRepsAndWeight] = useState({
    mySets: isets,
    myReps: ireps,
    myWeight: iweight,
  });

  // const initSetsRepsAndWeight = async () => {
  //   try {
  //     const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));

  //     // Parsing currRoutine[index] may give undefined error because AsyncStorage at [index] not initialized
  //     // Therefore, need to check if index is in range of currRoutine
  //     if (currRoutine.template.length > index) {
  //       let currExerciseTemplate = JSON.parse(currRoutine.template[index]);
  //       console.log("INIT EXERCISE FOR WORKOUT: ", currExerciseTemplate);

  //       setMySetsRepsAndWeight((mySetsRepsAndWeight) => ({
  //         ...mySetsRepsAndWeight,
  //         mySets: currExerciseTemplate.sets,
  //         myReps: currExerciseTemplate.reps,
  //         myWeight: currExerciseTemplate.weight,
  //       }));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const storageSetsRepsAndWeight = async (sets, reps, weight) => {
  //   try {
  //     const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
  //     let currExerciseTemplate = JSON.parse(currRoutine.template[index]);
  //     console.log("currExerciseTemplate: ", currExerciseTemplate);

  //     currExerciseTemplate.sets = sets;
  //     currExerciseTemplate.reps = reps;
  //     currExerciseTemplate.weight = weight;

  //     console.log("Updated currExerciseTemplate: ", currExerciseTemplate);

  //     currRoutine.template[index] = JSON.stringify(currExerciseTemplate);
  //     await AsyncStorage.setItem(routine, JSON.stringify(currRoutine));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleSetsRepsAndWeight = () => {
    Keyboard.dismiss();
    if (sets && reps && weight) {
      // storageSetsRepsAndWeight(sets, reps, weight);
      setMySetsRepsAndWeight((mySetsRepsAndWeight) => ({
        ...mySetsRepsAndWeight,
        mySets: sets,
        myReps: reps,
        myWeight: weight,
      }));
    }
    setSets(null);
    setReps(null);
    setWeight(null);
  };

  const renderSetsRepsAndWeight = () => {
    if (mySetsRepsAndWeight.mySets && mySetsRepsAndWeight.myReps) {
      return (
        <View style={styles.setsAndReps}>
          <Text>Sets: {mySetsRepsAndWeight.mySets}</Text>
          <Text>Reps: {mySetsRepsAndWeight.myReps}</Text>
          <Text>Weight: {mySetsRepsAndWeight.myWeight}</Text>
        </View>
      );
    }
  };

  // useEffect(() => {
  //   initSetsRepsAndWeight();
  // }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleUpdateWorkout(index, mySetsRepsAndWeight)}
      >
        <Text>{exercise}</Text>
        {renderSetsRepsAndWeight()}
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
        <TextInput
          placeholder={"Weight"}
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        <TouchableOpacity onPress={() => handleSetsRepsAndWeight()}>
          <View>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({});
