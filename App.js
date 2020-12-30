import React, { useState, useCallback } from "react";
import {
  FlatList,
  Text,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import BaseModal from "./src/views/BaseModal";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={styles.item}>
          <BaseModal
            modalVisible={modalVisible}
            onClose={() => {
              setModalVisible(!modalVisible);
            }}
            styles={styles}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.textStyle}>{item.title}</Text>
          </TouchableHighlight>
        </View>
      );
    },
    [modalVisible, setModalVisible]
  );

  return (
    <SafeAreaView contentContainerStyle={styles.centeredView}>
      <FlatList
        key="blah"
        data={[
          { id: 1, title: "Hello world!" },
          { id: 2, title: "Goodbye world!" },
        ]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        horizontal={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 0,
    marginVertical: 8,
    marginHorizontal: "1%",
    width: "48%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    width: "95%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 40,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: "#F194FF",
    borderRadius: 40,
    padding: 20,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default App;
