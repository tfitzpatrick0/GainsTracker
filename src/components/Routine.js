import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

export default function Routine(props) {
  const { routine, index, handleRemoveRoutine, navTemplate } = props;

  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navTemplate(routine)}
      >
        <Text style={styles.text}>{routine}</Text>
        <TouchableOpacity onPress={() => handleRemoveRoutine(index)}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    backgroundColor: colors.white,
  },
  text: {
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: colors.black,
  },
});
