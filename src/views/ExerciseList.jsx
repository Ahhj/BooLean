import React, { useState } from "react";
import { View } from "react-native";

import { TouchableOpacity, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import ExerciseModal from "./ExerciseModal";

export default function ExerciseList() {
  const data = ["Squat", "Bench Press", "Deadlift"].map((d, index) => ({
    key: `item-${index}`, // For example only -- don't use index as your key!
    label: d,
    backgroundColor: "gray",
  }));

  const [modalVisible, setModalVisible] = useState(false);
  const [modalItemIndex, setModalItemIndex] = useState(0);

  // TODO: on drag end should change order

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: isActive ? "blue" : item.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderWidth: 1,
            margin: "1%",
          }}
          onPress={() => {
            setModalVisible(true);
            setModalItemIndex(index);
          }}
          onLongPress={drag}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 32,
            }}
          >
            {`${item.label}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        marginVertical: "1%",
      }}
    >
      <ExerciseModal
        title={data[modalItemIndex].label}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        style={{}}
      />
    </View>
  );
}
