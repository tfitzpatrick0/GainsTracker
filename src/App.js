import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoutinesScreen from "./screens/RoutinesScreen";
import ModRoutineScreen from "./screens/ModRoutineScreen";
import ProgressScreen from "./screens/ProgressScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Routines"
          component={RoutinesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ModRoutine"
          component={ModRoutineScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Progress"
          component={ProgressScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
