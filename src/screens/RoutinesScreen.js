import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routine from "../components/Routine";

export default function RoutinesScreen({ navigation, route }) {
  const [routine, setRoutine] = useState();
  const [routineItems, setRoutineItems] = useState([]);
  const [relExercises, setRelExercises] = useState({});

  const initRoutineItems = async () => {
    const keys = await AsyncStorage.getAllKeys();
    setRoutineItems(keys);
  };

  const storeRoutine = async (key) => {
    try {
      await AsyncStorage.setItem(key, "hello");
    } catch (e) {
      console.log(e);
    }
  };

  const removeRoutine = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddRoutine = () => {
    storeRoutine(routine);
    Keyboard.dismiss();
    setRoutineItems([...routineItems, routine]);
    setRoutine(null);
  };

  const handleRemoveRoutine = (index) => {
    removeRoutine(routineItems[index]);
    routineItems.splice(index, 1);
    setRoutineItems([...routineItems]);
  };

  const handleRelExercises = (updatedRelExercises) => {
    console.log(updatedRelExercises);
    setRelExercises((relExercises) => ({
      ...relExercises,
      ...updatedRelExercises,
    }));
  };

  // useEffect(() => {
  //   if (route.params) {
  //     if ("updatedRelExercises" in route.params) {
  //       handleRelExercises(route.params.updatedRelExercises);
  //     }
  //   }
  // }, [route.params]);

  useEffect(() => {
    initRoutineItems();
  }, []);

  const modifyRoutine = (index) => {
    console.log(index);
  };

  // const modifyRoutine = (index) => {
  //   let currRelExercises = [];
  //   let routineName = routineItems[index];

  //   if (relExercises[index]) {
  //     currRelExercises = relExercises[index];
  //   }

  //   navigation.navigate("ModRoutine", {
  //     index,
  //     routineName,
  //     currRelExercises,
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => viewAllKeys()}>
        <Text style={styles.headerText}>Test</Text>
      </TouchableOpacity>
      <View style={styles.routinesWrapper}>
        <Text style={styles.headerText}>Routines</Text>
        <View style={styles.routines}>
          {/* Routines get mapped here */}
          {routineItems.map((routine, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => modifyRoutine(index.toString())}
                >
                  <Routine text={routine} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveRoutine(index)}>
                  <Text>-</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.newRoutineWrapper}
      >
        <TextInput
          style={styles.textInput}
          placeholder={"Add a routine"}
          value={routine}
          onChangeText={(text) => setRoutine(text)}
        />
        <TouchableOpacity onPress={() => handleAddRoutine()}>
          <View style={styles.addWrapper}>
            <Text>Add</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  routinesWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  routines: {
    marginTop: 20,
  },
  newRoutineWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textInput: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});
