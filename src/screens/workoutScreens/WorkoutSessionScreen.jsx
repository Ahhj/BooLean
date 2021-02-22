import React from "react";
import { View, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../components/Button";
import ExerciseList from "../../components/ExerciseList";
import { useWorkoutContext } from "../../providers/WorkoutContextProvider";
import { useNavigation } from "@react-navigation/native";

import CloseButton from "./components/CloseButton";

export default function WorkoutSessionScreen({ style }) {
  const workoutContext = useWorkoutContext();

  const navigation = useNavigation();
  const onFinish = () => workoutContext.toggleActive();
  const onCancel = () => workoutContext.toggleActive();
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
        <CancelButton onPress={onCancel} />
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
        <FinishButton onPress={onFinish} />
      </View>
    </SafeAreaView>
  );
}

function CancelButton({ onPress }) {
  return (
    <Button
      {...{
        text: "Cancel",
        type: "reject",
        onPress,
      }}
      Icon={({ color }) => (
        <MaterialCommunityIcons name={"cancel"} color={color} size={20} />
      )}
      style={{
        width: 100,
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
