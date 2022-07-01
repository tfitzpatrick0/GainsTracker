import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function HistoryScreen({ navigation, route }) {
  const { routine, routineHistory } = route.params;

  const navModRoutine = (routine) => {
    console.log("NAVIGATING - ModRoutine: ", routine);

    navigation.navigate("ModRoutine", { routine });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyWrapper}>
        <TouchableOpacity onPress={() => navModRoutine(routine)}>
          <Text>Go to routine - {routine}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>History</Text>
        <Text style={styles.headerText}>Start New Workout</Text>
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
