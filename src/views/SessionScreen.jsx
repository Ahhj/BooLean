import React, { useCallback, useState } from "react";
import { View, SafeAreaView } from "react-native";
import Button from "./Button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ExerciseList from "./ExerciseList";
import WorkoutContextProvider from "../providers/WorkoutContextProvider";

/**
 * Renders a screen for the user to interact with sessions
 * (e.g. start/stop/edit/etc)
 */
export default function SessionScreen({
  active,
  style,
  onStart,
  onEdit,
  onFinish,
  onCancel,
  onClose,
}) {
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
      const { iconName, ...buttonProps } = active ? activeProps : inactiveProps;
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
    [active]
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
        <WorkoutContextProvider>
          <ExerciseList />
        </WorkoutContextProvider>
      </View>
      <View style={{ ...style.bottom, flexDirection: "row" }}>
        {renderActivityDependentButton(finishButtonProps, startButtonProps, {
          width: "100%",
        })}
      </View>
    </SafeAreaView>
  );
}
