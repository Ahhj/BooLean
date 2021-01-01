import React, { useCallback } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import BaseCard from "./BaseCard";

export default function CardList({
  data,
  numColumns,
  style,
  onPress,
  onLongPress,
}) {
  const width = `${(100 - numColumns * 2) / numColumns}%`;
  const renderItem = useCallback(({ item }) => {
    return (
      <View style={{ ...styles.item, width }}>
        <BaseCard
          data={item}
          onPress={() => onPress(item)}
          onLongPress={() => onLongPress(item)}
          style={style}
        >
          <Text style={{ ...style.textStyle }}>{data.title}</Text>
        </BaseCard>
      </View>
    );
  }, []);

  return (
    <FlatList
      style={styles.list}
      key="blah2"
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      numColumns={numColumns}
      horizontal={false}
    />
  );
}

const styles = StyleSheet.create({
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
