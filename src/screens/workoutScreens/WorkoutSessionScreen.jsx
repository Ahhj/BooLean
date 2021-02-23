import React, { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../components/Button";
import ExerciseList from "../../components/ExerciseList";
import { useWorkoutContext } from "../../providers/WorkoutContextProvider";
import { useNavigation } from "@react-navigation/native";

import CloseButton from "./components/CloseButton";
import CancelButton from "./components/CancelButton";

export default function WorkoutSessionScreen({ style }) {
  const workoutContext = useWorkoutContext();
  const navigation = useNavigation();

  // Call reload when on focus event
  useEffect(
    () =>
      navigation.addListener("focus", () => {
        workoutContext.reload();
      }),
    [navigation]
  );

  const onStart = () => workoutContext.toggleActive();
  const onFinish = () => workoutContext.toggleActive();
  const onEdit = () =>
    navigation.navigate("WorkoutTemplateScreen", {
      templateId: workoutContext.templateId,
    });
  const onCancel = () => workoutContext.toggleActive();
  const onClose = () => {
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
        <CloseButton onPress={onClose} />
        {workoutContext.active ? (
          <CancelButton onPress={onCancel} />
        ) : (
          <EditButton onPress={onEdit} />
        )}
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
        {workoutContext.active ? (
          <FinishButton onPress={onFinish} />
        ) : (
          <StartButton onPress={onStart} />
        )}
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

function FinishButton({ onPress }) {
  return (
    <Button
      {...{
        text: "Finish",
        type: "accept",
        onPress,
      }}
      Icon={({ color }) => (
        <MaterialCommunityIcons name={"flag"} color={color} size={20} />
      )}
      style={{
        buttonStyle: {
          width: "100%",
        },
      }}
    />
  );
}
