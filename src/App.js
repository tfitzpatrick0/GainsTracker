import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoutinesScreen from "./screens/RoutinesScreen";
import ModRoutineScreen from "./screens/ModRoutineScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Routines" component={RoutinesScreen} />
        <Stack.Screen
          name="ModRoutine"
          component={ModRoutineScreen}
          options={{ title: "Modify Workout Routine" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
