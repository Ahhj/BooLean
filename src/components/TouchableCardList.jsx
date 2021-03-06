import React, { useCallback } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import TouchableCard from "./TouchableCard";

export default function TouchableCardList({
  data,
  numColumns,
  style,
  onPress,
  onLongPress,
}) {
  const width = `${(100 - numColumns * 2) / numColumns}%`;
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={{ ...styles.item, width }}>
          <TouchableCard
            {...{
              style,
              onPress: () => onPress(item),
              onLongPress: () => onLongPress(item),
            }}
          >
            <Text
              style={{
                ...(style ? (style.textStyle ? style.textStyle : {}) : {}),
              }}
            >
              {item.title}
            </Text>
          </TouchableCard>
        </View>
      );
    },
    [style, styles, onPress, onLongPress]
  );

  return (
    <FlatList
      style={styles.list}
      key="blah2"
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
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
