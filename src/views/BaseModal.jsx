import React from "react";
import {
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";

export default function BaseModal({ modalVisible, onClose, styles }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={modalStyles.modalView}>
          <CloseModalButton styles={styles} onPress={onClose} />
          <Text style={modalStyles.modalText}>Hello World!</Text>
          <View style={styles.bottom}>
            <View style={{ flexDirection: "row" }}>
              <ModalControlButton
                text={"Start"}
                onPress={onClose}
                styles={styles}
              />
              <ModalControlButton
                text={"Edit"}
                onPress={onClose}
                styles={styles}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function ModalControlButton({ text, onPress, styles }) {
  return (
    <TouchableHighlight
      style={{
        ...styles.button,
        width: "46%",
        marginHorizontal: "2%",
        backgroundColor: "#2196F3",
      }}
      onPress={onPress}
    >
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableHighlight>
  );
}

function CloseModalButton({ onPress, styles }) {
  return (
    <TouchableHighlight
      style={{
        ...styles.button,
        position: "absolute",
        top: 10,
        right: 10,
        marginHorizontal: "1%",
        backgroundColor: "lightgrey",
      }}
      onPress={onPress}
    >
      <Text style={styles.textStyle}>{"Close"}</Text>
    </TouchableHighlight>
  );
}

const modalStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    width: "98%",
    height: "95%",
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
