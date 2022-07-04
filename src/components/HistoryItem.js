import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

export default function HistoryItem(props) {
  const { historyItem, index } = props;
  const [historyDisplay, setHistoryDisplay] = useState(false);

  const renderHistory = () => {
    if (historyDisplay) {
      return historyItem.map((exerciseTemplate, index) => {
        return (
          <View key={index} style={styles.exerciseTemplate}>
            <Text>Exercise: {exerciseTemplate.exercise}</Text>
            <Text>
              Sets: {exerciseTemplate.sets ? exerciseTemplate.sets : "--"} |
              Reps: {exerciseTemplate.reps ? exerciseTemplate.reps : "--"} |
              Weight
              {" ("}lbs{")"}:{" "}
              {exerciseTemplate.weight ? exerciseTemplate.weight : "--"}
            </Text>
          </View>
        );
      });
    }
  };

  return (
    <View style={styles.historyItemWrapper}>
      <TouchableOpacity onPress={() => setHistoryDisplay(!historyDisplay)}>
        <Text style={styles.historyItemTitle}>History {index + 1}</Text>
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
  historyItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  exerciseTemplate: {
    marginTop: 5,
    paddingTop: 5,
    borderTopColor: colors.blue,
    borderTopWidth: 2,
  },
});
