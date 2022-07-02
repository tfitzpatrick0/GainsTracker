import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routine from "../components/Routine";
import AddNewRoutine from "../components/AddNewRoutine";

export default function RoutinesScreen({ navigation }) {
  const [myRoutines, setMyRoutines] = useState([]);

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  const showAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("SHOW ASYNC:", keys);
      const result = await AsyncStorage.multiGet(keys);
      console.log("SHOW ASYNC RESULT:", result);

      // return result.map((req) => JSON.parse(req)).forEach(console.log);
    } catch (error) {
      console.error(error);
    }
  };

  const initMyRoutines = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("INIT ROUTINES:", keys);
      setMyRoutines(keys);
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

  const handleRemoveRoutine = (index) => {
    storageRemoveRoutine(myRoutines[index]);
    myRoutines.splice(index, 1);
    setMyRoutines([...myRoutines]);
  };

  const renderMyRoutines = () => {
    return (
      <View style={styles.routines}>
        {/* Routines get mapped here */}
        {myRoutines.map((routine, index) => {
          return (
            <Routine
              key={index}
              routine={routine}
              index={index}
              handleRemoveRoutine={handleRemoveRoutine}
              navTemplate={navTemplate}
            />
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    initMyRoutines();
  }, []);

  const navTemplate = (routine) => {
    console.log("NAVIGATING - Template: ", routine);

    navigation.navigate("Template", { routine });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TESTING FUNCTIONS */}
      <TouchableOpacity onPress={() => showAsyncStorage()}>
        <Text>Show Async Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearAsyncStorage()}>
        <Text>Clear Async Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => initMyRoutines()}>
        <Text style={styles.headerText}>Init Routines</Text>
      </TouchableOpacity>
      {/* END TESTING FUNCTIONS */}

      <View style={styles.routinesWrapper}>
        <Text style={styles.headerText}>Routines</Text>
        {renderMyRoutines()}
      </View>

      <AddNewRoutine myRoutines={myRoutines} setMyRoutines={setMyRoutines} />
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
});
