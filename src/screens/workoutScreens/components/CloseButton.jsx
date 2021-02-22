import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../../components/Button";

export default function CloseButton({ onPress }) {
  return (
    <Button
      type="secondary"
      text="Close"
      Icon={({ color }) => (
        <MaterialCommunityIcons name={"close-thick"} color={color} size={20} />
      )}
      onPress={onPress}
      style={{
        buttonStyle: {
          width: 100,
        },
      }}
    />
  );
}
