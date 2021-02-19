import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PickerTableView({ columnData }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        margin: "2%",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      {columnData.map((item, index) => (
        <PickerColumnView key={`${index}`} {...item} />
      ))}
    </View>
  );
}

function PickerColumnView({
  headerText,
  selectedValue,
  values,
  onValueChange,
}) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{headerText}</Text>
      <Picker
        selectedValue={`${selectedValue}`}
        style={{ width: 100 }}
        itemStyle={{
          height: 120,
        }}
        onValueChange={onValueChange}
      >
        {values.map((item, index) => (
          <Picker.Item key={`${index}`} label={`${item}`} value={`${item}`} />
        ))}
      </Picker>
    </View>
  );
}
