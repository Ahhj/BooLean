import React from "react";
import { SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CardList from "./CardList";

export default function ProgramsScreen({ children, style }) {
  const navigation = useNavigation();
  const onPress = () => navigation.navigate("MyModal");
  const data = [
    { id: 1, title: "Hello world!" },
    { id: 2, title: "Goodbye world!" },
    { id: 3, title: "Poopy plop!" },
  ];
  return (
    <SafeAreaView style={[style.container]}>
      <View style={{ height: "100%" }}>
        <CardList onPress={onPress} data={data} numColumns={1} style={style} />
      </View>
      {children}
    </SafeAreaView>
  );
}
