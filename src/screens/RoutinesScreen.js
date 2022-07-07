import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routine from "../components/Routine";
import AddRoutine from "../components/AddRoutine";
import colors from "../constants/colors";

export default function RoutinesScreen({ navigation }) {
  const [myRoutines, setMyRoutines] = useState([]);

  const initMyRoutines = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("INIT ROUTINES:", keys);
      setMyRoutines(keys);
    } catch (e) {
      console.log(e);
    }
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
    initMyRoutines();
  };

  const showAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("SHOW ASYNC KEYS:", keys);
      const result = await AsyncStorage.multiGet(keys);
      console.log("SHOW ASYNC RESULT:", result);
    } catch (error) {
      console.error(error);
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
      <ScrollView>
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
      </ScrollView>
    );
  };

  useEffect(() => {
    initMyRoutines();
  }, []);

  const navTemplate = (routine) => {
    console.log("NAVIGATING - Template:", routine);

    navigation.navigate("Template", { routine });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TESTING FUNCTIONS */}

      {/* <View style={{ backgroundColor: colors.lightGray }}>
          <TouchableOpacity onPress={() => showAsyncStorage()}>
            <Text>Show Async Storage</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => clearAsyncStorage()}>
            <Text>Clear Async Storage</Text>
          </TouchableOpacity>
        </View> */}

      {/* END TESTING FUNCTIONS */}

      <View style={styles.myRoutinesWrapper}>{renderMyRoutines()}</View>

      <View style={styles.addRoutineWrapper}>
        <AddRoutine myRoutines={myRoutines} setMyRoutines={setMyRoutines} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  myRoutinesWrapper: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  addRoutineWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
