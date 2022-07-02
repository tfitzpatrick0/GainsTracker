import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Routine(props) {
  const { routine, index, handleRemoveRoutine, navTemplate } = props;

  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navTemplate(routine)}
      >
        <Text style={styles.text}>{routine}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemoveRoutine(index)}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  text: {
    padding: 10,
    fontSize: 15,
  },
});
