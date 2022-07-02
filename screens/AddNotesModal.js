import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function AddNotesModal({ navigation }) {
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>Add Notes!</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={(newText) => setText(newText)}
      ></TextInput>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.submitButton}
        //   onPress={() => navigation.goBack()}
          onPress={() => navigation.navigate("Notes", { text })}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    margin: 20,
    borderWidth: 1,
    width: "80%",
    padding: 15,
    borderColor: "#ccc",
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: "orange",
    margin: 10,
    padding: 15,
  },
  cancelButton: {
    backgroundColor: "red",
    margin: 10,
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
