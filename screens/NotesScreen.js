import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ navigation, route }) {
  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes order by id desc",
        null,
        (txObj, { rows: { _array } }) => setNoteArray(_array),
        (txObj, error) => console.log("Error", error)
      );
    });
  }

  // only runs on first load
  useEffect(refreshNotes, []);

  useEffect(
    () => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, done INT);`
        );
      });
    },
    null,
    refreshNotes
  );

  const [noteArray, setNoteArray] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("AddNotes")}>
          <Entypo
            name="new-message"
            size={24}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (route.params?.text) {
      db.transaction(
        (tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0 , ?)", [
            route.params.text,
          ]);
        },
        null,
        refreshNotes
      );
    }
  }, [route.params?.text]);

  function deleteAll() {
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM notes;`);
      },
      null,
      setNoteArray([])
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.listItem}>
        <Text style={{ fontSize: 18 }}>{item.title}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            db.transaction(
              (tx) => {
                tx.executeSql(`DELETE FROM notes WHERE id=${item.id}`);
              },
              null,
              refreshNotes
            )
          }
        >
          <Entypo
            style={{ alignSelf: "flex-end" }}
            name="trash"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={noteArray} renderItem={renderItem} />
      <TouchableOpacity style={styles.button} onPress={deleteAll}>
        <Text style={styles.buttonText}>Clear Notes</Text>
      </TouchableOpacity>
    </View>
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
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  button: {
    marginBottom: 30,
    backgroundColor: "red",
    padding: 15,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    padding: 15,
  },
});
