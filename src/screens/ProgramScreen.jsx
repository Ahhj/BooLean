import React from "react";
import { SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TouchableCardList from "../components/TouchableCardList";

export default function ProgramScreen({ children, style }) {
  const navigation = useNavigation();
  const onLongPress = () => navigation.navigate("TemplateScreen");
  const data = [
    { id: 1, title: "Hello world!" },
    { id: 2, title: "Goodbye world!" },
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
