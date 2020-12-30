import React from "react";
import {
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";

export default function BaseModal({ modalVisible, onClose, style }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={style.centeredView}>
        <View style={modalStyles.modalView}>
          <CloseModalButton style={style} onPress={onClose} />
          <Text style={modalStyles.modalText}>Hello World!</Text>
          <View style={style.bottom}>
            <View style={{ flexDirection: "row" }}>
              <ModalControlButton
                text={"Start"}
                onPress={onClose}
                style={style}
              />
              <ModalControlButton
                text={"Edit"}
                onPress={onClose}
                style={style}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function ModalControlButton({ text, onPress, style }) {
  return (
    <TouchableHighlight
      style={{
        ...style.button,
        width: "46%",
        marginHorizontal: "2%",
        backgroundColor: "#2196F3",
      }}
      onPress={onPress}
    >
      <Text style={style.textStyle}>{text}</Text>
    </TouchableHighlight>
  );
}

function CloseModalButton({ onPress, style }) {
  return (
    <TouchableHighlight
      style={{
        ...style.button,
        position: "absolute",
        top: 10,
        right: 10,
        marginHorizontal: "1%",
        backgroundColor: "lightgrey",
      }}
      onPress={onPress}
    >
      <Text style={style.textStyle}>{"Close"}</Text>
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
