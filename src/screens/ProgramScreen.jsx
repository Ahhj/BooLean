import React, { useCallback } from "react";
import { SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TouchableCardList from "../components/TouchableCardList";
import Button from "../components/Button";
import { useProgramTemplate } from "../providers/programTemplate/use";

export default function ProgramScreen({ style }) {
  const { state, actions } = useProgramTemplate();
  const navigation = useNavigation();

  const onPressWorkout = useCallback(({ workoutTemplateKey }) => {
    navigation.navigate("WorkoutTemplateScreen", {
      workoutTemplateKey: workoutTemplateKey,
      programTemplateKey: state.programTemplateKey,
    });
  });

  const onLongPressWorkout = useCallback(({ workoutTemplateKey }) => {});

  const onPressAddWorkout = useCallback(() => {
    navigation.navigate("WorkoutTemplateScreen", {
      workoutTemplateKey: null,
      programTemplateKey: state.programTemplateKey,
    });
  }, []);

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
          onPress={onPressWorkout}
          onLongPress={onLongPressWorkout}
          data={state.workoutTemplateKeys.map((workoutTemplateKey) => {
            return {
              workoutTemplateKey,
              title: workoutTemplateKey,
              key: workoutTemplateKey,
            };
          })}
          numColumns={1}
          style={style}
        />
      </View>
      <View style={{ ...style.bottom, flexDirection: "row" }}>
        <AddButton onPress={onPressAddWorkout} />
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
