import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function ProgressScreen({ navigation, route }) {
  const { routine } = route.params;

  const navModRoutine = (routine) => {
    console.log("NAVIGATING - ModRoutine: ", routine);

    navigation.navigate("ModRoutine", { routine });
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navModRoutine(routine)}>
        <Text>Go to {routine}</Text>
      </TouchableOpacity>
      <Text>ProgressScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
