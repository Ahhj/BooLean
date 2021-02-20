import React from "react";
import { View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ProgramScreen from "./ProgramScreen";
import TemplateScreen from "./TemplateScreen";

import WorkoutContextProvider from "../providers/WorkoutContextProvider";

const StackNavigator = createStackNavigator();

/**
 * Access to outer-most level of navigation. Renders a navigator
 * with 2 screens:
 *   - Home enables navigation around the app via a tab bar
 *   - TemplateScreenModal is a full screen modal for the user to interact
 *     with sessions.
 */
export default function StackScreen({ style }) {
  /**
   * TODO: currently no way to track the active/visible workout
   * need to separate active session from the sessions that show
   * when you click through the programs screen
   */

  return (
    <StackNavigator.Navigator
      {...{
        headerMode: "none",
        mode: "modal",
        transparentCard: true,
        cardStyle: { opacity: 1 },
      }}
    >
      <StackNavigator.Screen name="ProgramScreen">
        {({ navigation, route }) => {
          // const { programId } = route.params;
          const onPress = ({ templateId }) => {};
          const onLongPress = ({ templateId }) => {
            navigation.navigate("TemplateScreen", { templateId });
          };
          return (
            <View style={{ flex: 1, backgroundColor: "#6a51ae" }}>
              <StatusBar barStyle="light-content" />
              <ProgramScreen
                onPress={onPress}
                onLongPress={onLongPress}
                style={style}
              />
            </View>
          );
        }}
      </StackNavigator.Screen>
      <StackNavigator.Screen name="WorkoutScreen">
        {({ navigation, route }) => {
          const { templateId } = route.params.return(
            <WorkoutContextProvider templateId={templateId}>
              <View style={{ flex: 1, backgroundColor: "#6a51ae" }}>
                <StatusBar barStyle="light-content" />
              </View>
            </WorkoutContextProvider>
          );
        }}
      </StackNavigator.Screen>
      <StackNavigator.Screen name="TemplateScreen">
        {({ navigation, route }) => {
          const { templateId } = route.params;
          return (
            <View
              style={{
                flex: 1,
                height: "90%",
                width: "100%",
                backgroundColor: "#fff",
                justifyContent: "center",
                position: "absolute",
              }}
            >
              <StatusBar barStyle="dark-content" />
              <WorkoutContextProvider templateId={templateId}>
                <TemplateScreen style={style} />
              </WorkoutContextProvider>
            </View>
          );
        }}
      </StackNavigator.Screen>
    </StackNavigator.Navigator>
  );
}
