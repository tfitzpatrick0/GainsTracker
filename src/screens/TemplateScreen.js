import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Template from "../components/Template";
import ExercisesDisplay from "../components/ExercisesDisplay";
import bodypartsList from "../constants/bodypartsList";
import colors from "../constants/colors";

// Create/modify a template for a workout routine
export default function TemplateScreen({ navigation, route }) {
  const { routine } = route.params;
  const [myExercises, setMyExercises] = useState([]);

  const initMyExercises = async () => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      if (currRoutine.template.length > 0) {
        let exercises = [];

        currRoutine.template.forEach((templateItem) => {
          exercises.push(JSON.parse(templateItem).exercise);
        });
        console.log("INIT EXERCISES:", exercises);
        setMyExercises(exercises);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storageAddExercise = async (routine, templateItem) => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      currRoutine.template.push(templateItem);
      await AsyncStorage.setItem(routine, JSON.stringify(currRoutine));

      // Testing
      const updatedRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      console.log("Added exercise, updated storage:", updatedRoutine);
    } catch (e) {
      console.log(e);
    }
  };

  const storageRemoveExercise = async (routine, index) => {
    try {
      const currRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      currRoutine.template.splice(index, 1);
      await AsyncStorage.setItem(routine, JSON.stringify(currRoutine));

      // Testing
      const updatedRoutine = JSON.parse(await AsyncStorage.getItem(routine));
      console.log("Removed exercise, updated storage:", updatedRoutine);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddExercise = (exercise) => {
    const templateItem = {
      exercise: exercise,
      sets: null,
      reps: null,
      weight: null,
    };
    storageAddExercise(routine, JSON.stringify(templateItem));
    setMyExercises([...myExercises, exercise]);
  };

  const handleRemoveExercise = (index) => {
    storageRemoveExercise(routine, index);
    myExercises.splice(index, 1);
    let currExercises = [...myExercises];
    setMyExercises([]);
    setTimeout(() => {
      setMyExercises([...currExercises]);
    }, 0);
  };

  const renderExercisesDisplay = () => {
    return (
      <View>
        {/* Exercises get displayed here */}
        {bodypartsList.map((bodypart) => {
          return (
            <ExercisesDisplay
              key={bodypart}
              bodypart={bodypart}
              callOnPress={handleAddExercise}
            />
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    initMyExercises();
  }, []);

  const navProgress = (routine) => {
    console.log("NAVIGATING - Progress:", routine);

    navigation.navigate("Progress", { routine });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.templateWrapper}>
          <View style={styles.templateTitle}>
            <Text style={styles.routineName}>{routine}</Text>
            <TouchableOpacity onPress={() => navProgress(routine)}>
              <View style={styles.navProgressButton}>
                <Text style={{ fontWeight: "bold", color: colors.red }}>
                  Progress
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* ROUTINE TEMPLATE */}
          <View>
            <Template
              routine={routine}
              myExercises={myExercises}
              handleRemoveExercise={handleRemoveExercise}
            />
          </View>
        </View>
        <View style={styles.exercisesWrapper}>
          <View style={styles.exercisesTitle}>
            <Text style={styles.addExercises}>ADD EXERCISES</Text>
          </View>

          {renderExercisesDisplay()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  templateWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  templateTitle: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 5,
    borderBottomColor: colors.red,
  },
  routineName: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.black,
  },
  navProgressButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: colors.lightRed,
    borderRadius: 10,
  },
  exercisesWrapper: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
  exercisesTitle: {
    marginBottom: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: colors.blue,
  },
  addExercises: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
  },
});
