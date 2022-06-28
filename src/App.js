import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutsScreen from "./screens/WorkoutsScreen";
import ModWorkoutScreen from "./screens/ModWorkoutScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Workouts" component={WorkoutsScreen} />
        <Stack.Screen
          name="ModWorkout"
          component={ModWorkoutScreen}
          options={{ title: "Modify Workout Routine" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
