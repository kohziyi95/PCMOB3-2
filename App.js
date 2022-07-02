import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";

import * as SQLite from "expo-sqlite";
import NotesScreen from "./screens/NotesScreen";
import AddNotesModal from "./screens/AddNotesModal";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Notes"
            component={NotesScreen}
            options={{
              title: "Notes",
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
            }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="AddNotes"
            component={AddNotesModal}
            options={{
              title: "Add Notes",
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
  itemText: {
    fontSize: 18,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
  },
});
