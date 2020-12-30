import React from "react";
import { Alert, Modal, Text, TouchableHighlight, View } from "react-native";

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
        <View style={styles.modalView}>
          <CloseModalButton styles={styles} onPress={onClose} />
          <Text style={styles.modalText}>Hello World!</Text>
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
    </Modal>
  );
}

function ModalControlButton({ text, onPress, styles }) {
  return (
    <TouchableHighlight
      style={{
        ...styles.button,
        width: "49%",
        marginHorizontal: "1%",
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
        backgroundColor: "#2196F3",
      }}
      onPress={onPress}
    >
      <Text style={styles.textStyle}>{"X"}</Text>
    </TouchableHighlight>
  );
}
