import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";

export default function Routine(props) {
  const { routine, index, handleRemoveRoutine, navTemplate } = props;

  return (
    <View>
      <TouchableOpacity
        style={styles.routineItem}
        onPress={() => navTemplate(routine)}
      >
        <Text style={styles.name}>{routine}</Text>
        <TouchableOpacity onPress={() => handleRemoveRoutine(index)}>
          <Text style={{ color: colors.lightRed }}>
            <Icon name="close-box-outline" size={20} />
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  routineItem: {
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
});
