import React, { useCallback } from "react";
import { View, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../components/Button";
import ExerciseList from "../../components/ExerciseList";

import { useNavigation } from "@react-navigation/native";
import { useWorkoutTemplate } from "../../providers/workoutTemplate/use";

import CloseButton from "./components/CloseButton";

export default function WorkoutTemplateScreen({ style }) {
  const navigation = useNavigation();
  const { state: workoutState, actions: workoutActions } = useWorkoutTemplate();

  const onPressSave = useCallback(() => {
    workoutActions.save();
    navigation.goBack();
  });
  const onPressDelete = useCallback(() => {
    workoutActions.remove();
    navigation.goBack();
  });
  const onPressClose = useCallback(() => navigation.goBack());

  // TODO: editable switch
  // TODO: warning modal before delete
  // TODO: preview modal onLongPress
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
        <DeleteButton onPress={onPressDelete} />
        <CloseButton onPress={onPressClose} />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        <ExerciseList
          editable={true}
          exercises={[]}
          onChangeExercises={(updated) => {}}
        />
      </View>
      <View style={{ ...style.bottom, flexDirection: "row" }}>
        <SaveButton onPress={onPressSave} />
      </View>
    </SafeAreaView>
  );
}

function DeleteButton({ onPress }) {
  return (
    <Button
      {...{
        text: "Delete",
        type: "warning",
        onPress,
      }}
      Icon={({ color }) => (
        <MaterialCommunityIcons
          name={"trash-can-outline"}
          color={color}
          size={20}
        />
      )}
      style={{
        buttonStyle: {
          width: 100,
        },
      }}
    />
  );
}

function SaveButton({ onPress }) {
  return (
    <Button
      type="primary"
      text="Save"
      Icon={({ color }) => (
        <MaterialCommunityIcons
          name={"content-save-outline"}
          color={color}
          size={20}
        />
      )}
      onPress={onPress}
      style={{
        buttonStyle: {
          width: "100%",
        },
      }}
    />
  );
}
