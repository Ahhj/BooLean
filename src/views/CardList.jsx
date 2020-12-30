import React, { useState, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import BaseCard from "./BaseCard";

export default function CardList({ data, numColumns, style }) {
  const [modalVisible, setModalVisible] = useState(false);

  const width = `${(100 - numColumns * 2) / numColumns}%`;
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={{ ...listStyles.item, width }}>
          <BaseCard
            data={item}
            modalVisible={modalVisible}
            onPress={() => setModalVisible(true)}
            onClose={() => setModalVisible(false)}
            style={style}
          />
        </View>
      );
    },
    [modalVisible, setModalVisible]
  );

  return (
    <FlatList
      style={listStyles.list}
      key="blah2"
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      numColumns={numColumns}
      horizontal={false}
    />
  );
}

const listStyles = StyleSheet.create({
  list: {
    marginHorizontal: "1%",
  },
  item: {
    backfaceVisibility: "hidden",
    padding: 0,
    marginVertical: "1%",
    marginHorizontal: "1%",
  },
});
