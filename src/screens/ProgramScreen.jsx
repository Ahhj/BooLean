import React from "react";
import { SafeAreaView, View } from "react-native";
import TouchableCardList from "../components/TouchableCardList";

export default function ProgramScreen({
  onPress,
  onLongPress,
  children,
  style,
}) {
  const data = [
    { id: 1, title: "Hello world!", templateId: 1 },
    { id: 2, title: "Goodbye world!", templateId: 2 },
  ];
  return (
    <SafeAreaView style={[style.container]}>
      <View style={{ height: "100%" }}>
        <TouchableCardList
          onLongPress={onLongPress}
          data={data}
          numColumns={1}
          style={style}
        />
      </View>
      {children}
    </SafeAreaView>
  );
}
