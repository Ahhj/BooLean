import React from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import CardList from "./src/views/CardList";
import NavBar from "./src/views/NavBar";

const App = () => {
  const data = [
    { id: 1, title: "Hello world!" },
    { id: 2, title: "Goodbye world!" },
    { id: 3, title: "Poopy plop!" },
  ];

  const navData = [
    { id: 1, title: "Session" },
    { id: 2, title: "Program" },
    { id: 3, title: "History" },
    { id: 4, title: "Dashboard" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: "90%", backgroundColor: "black" }}>
        <SafeAreaView>
          <CardList data={data} numColumns={2} style={styles} />
        </SafeAreaView>
      </View>
      <View style={{ height: "10%", backgroundColor: "grey" }}>
        <NavBar data={navData} style={styles} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    backgroundColor: "#F194FF",
    borderRadius: 40,
    padding: 20,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  top: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 0,
  },
});

export default App;
