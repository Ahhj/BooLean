import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import ExerciseModal from "./ExerciseModal";
import { useSessionData } from "../providers/SessionDataProvider";

export default function ExerciseList() {
  const sessionData = useSessionData();

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      setData(
        sessionData.exercises.map((d, index) => ({
          key: `item-${index}`, // For example only -- don't use index as your key!
          label: d,
          backgroundColor: "gray",
        }))
      );
    })();
  }, [sessionData]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

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
            setSelectedItemIndex(index);
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
        title={data.length ? data[selectedItemIndex].label : null}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        style={{}}
        onDragEnd={({ data }) => setData(data)}
      />
    </View>
  );
}
