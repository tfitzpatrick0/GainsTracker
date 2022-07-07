import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Exercise from "./Exercise";
import colors from "../constants/colors";

export default function Template(props) {
  const { routine, myExercises, handleRemoveExercise } = props;

  const storageTemplateInfo = async (index, sets, reps, weight) => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      let currTemplateItem = JSON.parse(currRoutine.template[index]);
      console.log("currTemplateItem: ", currTemplateItem);

      if (sets) currTemplateItem.sets = sets;
      if (reps) currTemplateItem.reps = reps;
      if (weight) currTemplateItem.weight = weight;

      console.log("Updated currTemplateItem: ", currTemplateItem);

      currRoutine.template[index] = JSON.stringify(currTemplateItem);
      await AsyncStorage.setItem(routine, JSON.stringify(currRoutine));
    } catch (e) {
      console.log(e);
    }
  };

  return myExercises.map((exercise, index) => {
    return (
      // <TouchableOpacity key={index} onPress={() => handleRemoveExercise(index)}>
      //   <Exercise
      //     routine={routine}
      //     index={index}
      //     exercise={exercise}
      //     manageCurrTemplate={storageTemplateInfo}
      //   />
      // </TouchableOpacity>

      <View key={index} style={styles.exerciseTemplateWrapper}>
        <Exercise
          routine={routine}
          index={index}
          exercise={exercise}
          manageCurrTemplate={storageTemplateInfo}
        />
        <TouchableOpacity
          style={styles.test}
          onPress={() => handleRemoveExercise(index)}
        >
          <Text style={{ color: colors.lightRed }}>
            <Icon name="delete" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  });
}

const styles = StyleSheet.create({
  exerciseTemplateWrapper: {
    width: "100%",
  },
  test: {
    position: "absolute",
    top: 4,
    right: 4,
  },
});
