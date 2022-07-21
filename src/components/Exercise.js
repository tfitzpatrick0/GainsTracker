import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/colors";

export default function Exercise(props) {
  const { routine, index, exercise, manageCurrTemplate } = props;
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

      let currTemplateItem = JSON.parse(currRoutine.template[index]);
      console.log("INIT SETS AND REPS: ", currTemplateItem);

      setTemplateInfo((templateInfo) => ({
        ...templateInfo,
        mySets: currTemplateItem.sets,
        myReps: currTemplateItem.reps,
        myWeight: currTemplateItem.weight,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleTemplateInfo = () => {
    Keyboard.dismiss();
    manageCurrTemplate(index, sets, reps, weight);

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
        <Text style={{ color: colors.black }}>
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
    <View style={styles.exerciseWrapper}>
      <Text style={styles.exercise}>{exercise}</Text>

      {renderTemplateInfo()}

      <View
        style={styles.updateExercise}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            <Text style={{ fontSize: 18, color: colors.lightRed }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseWrapper: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  exercise: {
    maxWidth: "90%",
    fontWeight: "bold",
    color: colors.black,
  },
  updateExercise: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputField: {
    flexDirection: "row",
  },
});
