import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../../components/Button";

export default function CancelButton({ onPress }) {
  return (
    <Button
      {...{
        text: "Cancel",
        type: "reject",
        onPress,
      }}
      Icon={({ color }) => (
        <MaterialCommunityIcons name={"cancel"} color={color} size={20} />
      )}
      style={{
        width: 100,
      }}
    />
  );
}
