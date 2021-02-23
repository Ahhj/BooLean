import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../components/Button";
import ExerciseList from "../../components/ExerciseList";
import { useWorkoutContext } from "../../providers/WorkoutContextProvider";
import { useNavigation } from "@react-navigation/native";

import CloseButton from "./components/CloseButton";

export default function WorkoutTemplateScreen({ style }) {
  const [editable, setEditable] = useState(true);
  const workoutContext = useWorkoutContext();
  const navigation = useNavigation();

  const onStart = () => {
    workoutContext.toggleActive();
    navigation.navigate("WorkoutSessionScreen", {
      templateId: workoutContext.templateId,
    });
  };
  const onClose = () => {
    setEditable(false);
    navigation.goBack();
  };

  const onSave = () => {
    setEditable(false);
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
        <CloseButton onPress={onClose} />
        <SaveButton onPress={onSave} />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: "2%",
          marginBottom: "2%",
        }}
      >
        <ExerciseList editable={editable} />
      </View>
      <View style={{ ...style.bottom, flexDirection: "row" }}>
        <DeleteButton onPress={onStart} />
      </View>
    </SafeAreaView>
  );
}

function DeleteButton({ onPress }) {
  return (
    <Button
      {...{
        text: "Delete",
        type: "reject",
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
          width: "100%",
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
          width: 100,
        },
      }}
    />
  );
}
