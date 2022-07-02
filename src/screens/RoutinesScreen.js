import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routine from "../components/Routine";
import AddNewRoutine from "../components/AddNewRoutine";

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
      console.log("SHOW ASYNC:", keys);
      const result = await AsyncStorage.multiGet(keys);
      console.log("SHOW ASYNC RESULT:", result);

      // return result.map((req) => JSON.parse(req)).forEach(console.log);
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
      <ScrollView
      // style={{
      //   borderWidth: 1,
      //   borderColor: "black",
      // }}
      >
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
    console.log("NAVIGATING - Template: ", routine);

    navigation.navigate("Template", { routine });
  };

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 0, backgroundColor: "#FC4E23" }}
      />
      <View style={styles.container}>
        {/* TESTING FUNCTIONS */}

        {/* <TouchableOpacity onPress={() => showAsyncStorage()}>
          <Text>Show Async Storage</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clearAsyncStorage()}>
          <Text>Clear Async Storage</Text>
        </TouchableOpacity>*/}

        {/* END TESTING FUNCTIONS */}

        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Routines</Text>
        </View>

        <View style={styles.myRoutinesWrapper}>{renderMyRoutines()}</View>

        <View style={styles.addNewRoutineWrapper}>
          <AddNewRoutine
            myRoutines={myRoutines}
            setMyRoutines={setMyRoutines}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  headerWrapper: {
    padding: 20,
    backgroundColor: "#FC4E23",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  myRoutinesWrapper: {
    flex: 1,
    margin: 20,
  },
  addNewRoutineWrapper: {
    paddingBottom: 40,
    backgroundColor: "#3F00E1",
  },
});
