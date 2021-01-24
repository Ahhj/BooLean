import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import ModalView from "./ModalView";
import TouchableCardList from "./TouchableCardList";
import PickerTableView from "./PickerTableView";
import Button from "./Button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ExerciseModal({ title, visible, onClose, style }) {
  const renderCloseButton = useCallback(
    () => (
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
    ),
    []
  );

  const data = ["hello", "world"].map((d, index) => ({
    key: `${index}`, // For example only -- don't use index as your key!
    label: d,
    backgroundColor: "gray",
  }));

  const renderItem = ({ item, index, drag, isActive }) => {
    return null;
  };

  // TODO: when card is pressed, set the current set
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  const setData = {
    0: [
      {
        headerText: "Reps",
        selectedValue: 2,
        values: [1, 2, 3],
        onValueChange: (itemValue, itemIndex) => {},
      },
      {
        headerText: "RPE",
        selectedValue: 2,
        values: [1, 2, 3],
        onValueChange: (itemValue, itemIndex) => {},
      },
      {
        headerText: "Weight",
        selectedValue: 2,
        values: [1, 2, 3],
        onValueChange: (itemValue, itemIndex) => {},
      },
    ],
  };

  return (
    <ModalView
      visible={visible}
      style={{
        modalView: {
          height: "70%",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 200,
        },
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        {renderCloseButton()}
      </View>

      <View
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: "2%",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{title}</Text>
        <TouchableCardList
          onLongPress={() => {}}
          data={[{ id: 1, title: "Hello world!" }]}
          numColumns={1}
          style={{ cardView: { height: 60 } }}
        />
      </View>
      <PickerTableView columnData={setData[currentSetIndex]} />
    </ModalView>
  );
}
