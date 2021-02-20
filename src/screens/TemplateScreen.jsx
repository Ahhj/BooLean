import React, { useCallback, useState } from "react";
import { View, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../components/Button";
import ExerciseList from "../components/ExerciseList";
import { useWorkoutContext } from "../providers/WorkoutContextProvider";
import { useNavigation } from "@react-navigation/native";

/**
 * Renders a screen for the user to interact with sessions
 * (e.g. start/stop/edit/etc)
 */
export default function TemplateScreen({ style }) {
  const workoutContext = useWorkoutContext();

  const navigation = useNavigation();
  const onStart = () => {
    workoutContext.toggleActive();
    navigation.navigate("WorkoutScreen");
  };
  const onEdit = () => workoutContext.toggleActive();
  const onFinish = () => workoutContext.toggleActive();
  const onCancel = () => workoutContext.toggleActive();
  const onClose = () => {
    workoutContext.save();
    navigation.goBack();
  };

  const editButtonProps = {
    text: "Edit",
    type: "secondary",
    iconName: "square-edit-outline",
    onPress: onEdit,
  };

  const cancelButtonProps = {
    text: "Cancel",
    type: "reject",
    iconName: "cancel",
    onPress: onCancel,
  };

  const startButtonProps = {
    text: "Start",
    type: "primary",
    iconName: "arrow-right-drop-circle",
    onPress: onStart,
  };

  const finishButtonProps = {
    text: "Finish",
    type: "accept",
    iconName: "flag",
    onPress: onFinish,
  };

  const renderActivityDependentButton = useCallback(
    (activeProps, inactiveProps, buttonStyle) => {
      const { iconName, ...buttonProps } = workoutContext.active
        ? activeProps
        : inactiveProps;
      return (
        <Button
          {...buttonProps}
          Icon={({ color }) => (
            <MaterialCommunityIcons name={iconName} color={color} size={20} />
          )}
          style={{ buttonStyle }}
        />
      );
    },
    [workoutContext]
  );

  const renderCloseButton = useCallback(
    () => (
      <Button
        type="secondary"
        text="Close"
        Icon={({ color }) => (
          <MaterialCommunityIcons
            name={"close-thick"}
            color={color}
            size={20}
          />
        )}
        onPress={onClose}
        style={{
          buttonStyle: {
            width: 100,
          },
        }}
      />
    ),
    []
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
          ...style.top,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {renderActivityDependentButton(cancelButtonProps, editButtonProps, {
          width: 100,
        })}
        {renderCloseButton()}
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
        {renderActivityDependentButton(finishButtonProps, startButtonProps, {
          width: "100%",
        })}
      </View>
    </SafeAreaView>
  );
}
