import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TestExercise from "../components/TestExercise";

export default function HistoryScreen({ navigation, route }) {
  const { routine } = route.params;
  // const template = JSON.parse(await AsyncStorage.getItem(routine)).template;
  const [myHistory, setMyHistory] = useState([]);
  const [myTemplate, setMyTemplate] = useState([]);
  const [display, setDisplay] = useState(false);

  const initMyTemplate = async () => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      if (currRoutine.template.length > 0) {
        let currTemplate = [];

        currRoutine.template.forEach((exerciseTemplate) => {
          currTemplate.push(JSON.parse(exerciseTemplate));
        });

        console.log("INIT TEMPLATE:", currTemplate);
        setMyTemplate(currTemplate);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storageAddHistory = async () => {};

  const handleAddHistory = () => {};

  const handleChangeTemplate = () => {};

  const displayNewWorkout = () => {
    setDisplay(true);
  };

  const renderNewWorkout = () => {
    if (display) {
      console.log("START NEW WORKOUT");
      return (
        <View>
          <TouchableOpacity onPress={() => setDisplay(false)}>
            <Text>DONE</Text>
          </TouchableOpacity>
          <Text>New Workout</Text>
          {myTemplate.map((exerciseTemplate, index) => {
            return (
              <TestExercise
                key={index}
                routine={routine}
                index={index}
                exercise={exerciseTemplate.exercise}
              />
            );
          })}
        </View>
      );
    }
  };

  useEffect(() => {
    initMyTemplate();
  }, []);

  const navModRoutine = (routine) => {
    console.log("NAVIGATING - Template: ", routine);

    navigation.navigate("Template", { routine });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyWrapper}>
        <TouchableOpacity onPress={() => navModRoutine(routine)}>
          <Text>Go to routine - {routine}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>History</Text>
        <TouchableOpacity onPress={() => displayNewWorkout()}>
          <Text style={styles.headerText}>Start New Workout</Text>
        </TouchableOpacity>
        {renderNewWorkout()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  historyWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
