import React from "react";
import { View, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../components/Button";
import ExerciseList from "../../components/ExerciseList";
import { useWorkoutContext } from "../../providers/WorkoutContextProvider";
import { useNavigation } from "@react-navigation/native";

import CloseButton from "./CloseButton";

export default function WorkoutTemplateScreen({ style }) {
  const workoutContext = useWorkoutContext();

  const navigation = useNavigation();
  const onStart = () => {
    workoutContext.toggleActive();
    navigation.navigate("WorkoutSessionScreen", {
      templateId: workoutContext.templateId,
    });
  };
  const onEdit = () => workoutContext.toggleActive();
  const onClose = () => {
    workoutContext.save();
    navigation.goBack();
  };

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
          ...style.top,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <EditButton onPress={onEdit} />
        <CloseButton onPress={onClose} />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        <ExerciseList />
      </View>
      <View style={{ ...style.bottom, flexDirection: "row" }}>
        <StartButton onPress={onStart} />
      </View>
    </SafeAreaView>
  );
}

function EditButton({ onPress }) {
  return (
    <Button
      {...{
        text: "Edit",
        type: "secondary",
        onPress,
      }}
      Icon={({ color }) => (
        <MaterialCommunityIcons
          name={"square-edit-outline"}
          color={color}
          size={20}
        />
      )}
      style={{
        width: 100,
      }}
    />
  );
}

function StartButton({ onPress }) {
  return (
    <Button
      {...{
        text: "Start",
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
