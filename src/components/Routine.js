import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Routine(props) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{props.text}</Text>
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
