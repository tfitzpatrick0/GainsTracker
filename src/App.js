import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoutinesScreen from "./screens/RoutinesScreen";
import TemplateScreen from "./screens/TemplateScreen";
import ProgressScreen from "./screens/ProgressScreen";
import colors from "./constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Routines"
          component={RoutinesScreen}
          options={{
            title: "My Routines",
            headerStyle: { backgroundColor: colors.red },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
              color: colors.black,
            },
          }}
        />
        <Stack.Screen
          name="Template"
          component={TemplateScreen}
          options={{
            title: "Edit Routine",
            headerStyle: { backgroundColor: colors.red },
            headerTintColor: colors.lightGray,
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
              color: colors.black,
            },
            headerBackTitle: "Home",
          }}
        />
        <Stack.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            title: "Track your Progress",
            headerStyle: { backgroundColor: colors.red },
            headerTintColor: colors.lightGray,
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
              color: colors.black,
            },
            headerBackTitle: "Edit",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
