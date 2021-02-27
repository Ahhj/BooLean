import React from "react";
import { View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ProgramScreen from "./ProgramScreen";
import WorkoutTemplateScreen from "./workoutScreens/WorkoutTemplateScreen";

import WorkoutTemplateProvider from "../providers/workoutTemplate/provider";
import ProgramTemplateProvider from "../providers/programTemplate/provider";

const StackNavigator = createStackNavigator();

/**
 * Access to outer-most level of navigation. Renders a navigator
 * with 2 screens:
 *   - Home enables navigation around the app via a tab bar
 *   - TemplateScreenModal is a full screen modal for the user to interact
 *     with sessions.
 */
export default function StackNavigatorScreen({ style }) {
  /**
   * TODO: currently no way to track the active/visible workout
   * need to separate active session from the sessions that show
   * when you click through the programs screen
   */
  const programTemplateKey = "default-program";

  return (
    <ProgramTemplateProvider programTemplateKey={programTemplateKey}>
      <StackNavigator.Navigator
        {...{
          headerMode: "none",
          mode: "modal",
          transparentCard: true,
          cardStyle: { opacity: 1 },
        }}
      >
        <StackNavigator.Screen name="ProgramScreen">
          {({ route }) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#6a51ae",
                }}
              >
                <StatusBar barStyle="light-content" />
                <View style={{ height: "90%" }}>
                  <ProgramScreen style={style} />
                </View>
              </View>
            );
          }}
        </StackNavigator.Screen>
        <StackNavigator.Screen name="WorkoutTemplateScreen">
          {({ route }) => {
            const { workoutTemplateKey } = route.params;

            return (
              <View style={workoutContainerStyle}>
                <StatusBar barStyle="dark-content" />
                <WorkoutTemplateProvider
                  workoutTemplateKey={workoutTemplateKey}
                >
                  <WorkoutTemplateScreen style={style} />
                </WorkoutTemplateProvider>
              </View>
            );
          }}
        </StackNavigator.Screen>
      </StackNavigator.Navigator>
    </ProgramTemplateProvider>
  );
}

const workoutContainerStyle = {
  flex: 1,
  height: "90%",
  width: "100%",
  backgroundColor: "#fff",
  justifyContent: "center",
  position: "absolute",
};

// <StackNavigator.Screen name="WorkoutSessionScreen">
//   {({ navigation, route }) => {
//     const { templateId } = route.params;
//     return (
//       <View
//         style={{
//           flex: 1,
//           height: "90%",
//           width: "100%",
//           backgroundColor: "#fff",
//           justifyContent: "center",
//           position: "absolute",
//         }}
//       >
//         <StatusBar barStyle="dark-content" />
//         <WorkoutContextProvider templateId={templateId}>
//           <WorkoutSessionScreen style={style} />
//         </WorkoutContextProvider>
//       </View>
//     );
//   }}
// </StackNavigator.Screen>;
