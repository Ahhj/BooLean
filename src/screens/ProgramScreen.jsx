import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TouchableCardList from "../components/TouchableCardList";
import { listItems } from "../storage";
import Button from "../components/Button";

export default function ProgramScreen({ onPress, onLongPress, style }) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  // Call reload when on focus event
  useEffect(
    () =>
      navigation.addListener("focus", () => {
        listItems().then((keys) => {
          const data = keys
            .map((key, index) => {
              const templateId = key.split("@")[1];
              if (templateId) {
                return {
                  id: index,
                  title: `Workout ${index}`,
                  templateId: key.split("@")[1],
                };
              }
            })
            .filter((item) => !!item);
          setData(data);
        });
      }),
    [navigation]
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: "2%",
        marginTop: "15%",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flex: 1,
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        <TouchableCardList
          onPress={onPress}
          onLongPress={onLongPress}
          data={data}
          numColumns={1}
          style={style}
        />
      </View>
      <View style={{ ...style.bottom, flexDirection: "row" }}>
        <AddButton
          onPress={() =>
            navigation.navigate("WorkoutTemplateScreen", {
              templateId: data.length,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

function AddButton({ onPress }) {
  return (
    <Button
      {...{
        text: "Add workout",
        type: "primary",
        onPress,
      }}
      Icon={({ color }) => (
        <MaterialCommunityIcons
          name={"arrow-right-drop-circle"}
          color={color}
          size={20}
        />
      )}
      style={{
        buttonStyle: {
          width: "100%",
        },
      }}
    />
  );
}
