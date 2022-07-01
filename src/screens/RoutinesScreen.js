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

export default function RoutinesScreen({ navigation }) {
  const [routine, setRoutine] = useState();
  const [myRoutines, setMyRoutines] = useState([]);

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  const initRoutineItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("INIT ROUTINES:", keys);
      setMyRoutines(keys);
    } catch (e) {
      console.log(e);
    }
  };

  const storageAddRoutine = async (routine) => {
    try {
      await AsyncStorage.setItem(routine, JSON.stringify([]));
      console.log("Added routine to storage:", routine);
    } catch (e) {
      console.log(e);
    }
  };

  const storageRemoveRoutine = async (routine) => {
    try {
      await AsyncStorage.removeItem(routine);
      console.log("Removed routine from storage:", routine);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddRoutine = () => {
    Keyboard.dismiss();
    // Only include unique routine names - use as key for AsyncStorage
    if (routine && !myRoutines.includes(routine)) {
      storageAddRoutine(routine);
      setMyRoutines([...myRoutines, routine]);
    }
    setRoutine(null);
  };

  const handleRemoveRoutine = (index) => {
    storageRemoveRoutine(myRoutines[index]);
    myRoutines.splice(index, 1);
    setMyRoutines([...myRoutines]);
  };

  useEffect(() => {
    initRoutineItems();
  }, []);

  const navModRoutine = (routine) => {
    console.log("NAVIGATING - ModRoutine: ", routine);

    navigation.navigate("ModRoutine", {
      routine,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TESTING FUNCTIONS */}
      <TouchableOpacity onPress={() => clearAsyncStorage()}>
        <Text>Clear Async Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => initRoutineItems()}>
        <Text style={styles.headerText}>Init Routines</Text>
      </TouchableOpacity>
      {/* END TESTING FUNCTIONS */}

      <View style={styles.routinesWrapper}>
        <Text style={styles.headerText}>Routines</Text>
        <View style={styles.routines}>
          {/* Routines get mapped here */}
          {myRoutines.map((routine, index) => {
            return (
              <View key={index}>
                <TouchableOpacity onPress={() => navModRoutine(routine)}>
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
