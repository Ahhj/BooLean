import React from "react";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import BaseModal from "./BaseModal";

export default function BaseCard({
  data,
  modalVisible,
  onPress,
  onClose,
  styles,
}) {
  return (
    <View style={cardStyles.cardView}>
      <BaseModal
        modalVisible={modalVisible}
        onClose={onClose}
        styles={styles}
      />
      <TouchableHighlight style={cardStyles.cardButton} onPress={onPress}>
        <Text style={styles.textStyle}>{data.title}</Text>
      </TouchableHighlight>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  cardView: {},
  cardButton: {
    height: 150,
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
});
