import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

export default function WorkoutHistory(props) {
  const { routine, historyItem, index } = props;
  const [historyDisplay, setHistoryDisplay] = useState(false);

  const renderHistory = () => {
    if (historyDisplay) {
      return historyItem.map((templateItem, index) => {
        return (
          <View key={index} style={styles.templateItem}>
            <Text style={{ color: colors.black }}>
              Exercise: {templateItem.exercise}
            </Text>
            <Text style={{ color: colors.black }}>
              Sets: {templateItem.sets ? templateItem.sets : "--"} | Reps:{" "}
              {templateItem.reps ? templateItem.reps : "--"} | Weight
              {" ("}lbs{")"}: {templateItem.weight ? templateItem.weight : "--"}
            </Text>
          </View>
        );
      });
    }
  };

  return (
    <View style={styles.historyItemWrapper}>
      <TouchableOpacity onPress={() => setHistoryDisplay(!historyDisplay)}>
        <Text style={styles.workoutNumber}>
          {routine} - Workout #{index + 1}
        </Text>
      </TouchableOpacity>

      {renderHistory()}
    </View>
  );
}

const styles = StyleSheet.create({
  historyItemWrapper: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  workoutNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  templateItem: {
    marginTop: 5,
    paddingTop: 5,
    borderTopColor: colors.lightBlue,
    borderTopWidth: 2,
  },
});
