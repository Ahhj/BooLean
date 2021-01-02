import React from "react";
import { View, SafeAreaView } from "react-native";
import Button from "./Button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SessionScreen({
  active,
  visible,
  style,
  onStart,
  onEdit,
  onFinish,
  onCancel,
  onClose,
}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: "2%",
        marginTop: "15%",
      }}
    >
      <View
        style={{
          ...style.top,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Button
          type={!active ? "secondary" : "reject"}
          text={!active ? "Edit" : "Cancel"}
          Icon={({ color }) => (
            <MaterialCommunityIcons
              name={!active ? "square-edit-outline" : "cancel"}
              color={color}
              size={20}
            />
          )}
          onPress={!active ? onEdit : onCancel}
          style={{
            buttonStyle: {
              width: 100,
            },
          }}
        />
        <Button
          type="secondary"
          text="Close"
          Icon={({ color }) => (
            <MaterialCommunityIcons
              name={"close-thick"}
              color={color}
              size={20}
            />
          )}
          onPress={onClose}
          style={{
            buttonStyle: {
              width: 100,
            },
          }}
        />
      </View>
      <View style={{ ...style.bottom, flexDirection: "row" }}>
        <Button
          type={!active ? "primary" : "accept"}
          text={!active ? "Start" : "Finish"}
          Icon={({ color }) => (
            <MaterialCommunityIcons
              name={!active ? "arrow-right-drop-circle" : "flag"}
              color={color}
              size={20}
            />
          )}
          onPress={!active ? onStart : onFinish}
          style={{
            buttonStyle: {
              width: "100%",
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
}
