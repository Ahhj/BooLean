import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import ExerciseModal from "./ExerciseModal";

export default function ExerciseList({
  editable,
  exercises,
  onChangeExercises,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const renderItem = ({ item, index, drag, isActive }) => {
    const onPress = () => {
      setModalVisible(true);
      setSelectedItemIndex(index);
    };
    const onLongPress = editable ? drag : () => {};
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: isActive ? "blue" : item.backgroundColor,
            alignItems: "top",
            justifyContent: "left",
            flexDirection: "row",
            borderWidth: 1,
            margin: "1%",
            padding: 10,
          }}
          onPress={onPress}
          onLongPress={onLongPress}
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
        title={exercises.length ? exercises[selectedItemIndex].label : null}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <DraggableFlatList
        data={exercises.map((item, index) => {
          return {
            ...item,
            backgroundColor: "gray",
          };
        })}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        style={{}}
        onDragEnd={(updated) => onChangeExercises(updated.data)}
      />
    </View>
  );
}
