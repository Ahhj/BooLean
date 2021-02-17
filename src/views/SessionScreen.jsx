import React, { useCallback, useState } from "react";
import { View, SafeAreaView } from "react-native";
import Button from "./Button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ExerciseList from "./ExerciseList";
import { useWorkoutContext } from "../providers/WorkoutContextProvider";

/**
 * Renders a screen for the user to interact with sessions
 * (e.g. start/stop/edit/etc)
 */
export default function SessionScreen({
  style,
  onStart,
  onEdit,
  onFinish,
  onCancel,
  onClose,
}) {
  const workoutContext = useWorkoutContext();

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
