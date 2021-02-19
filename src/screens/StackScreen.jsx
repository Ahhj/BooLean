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

  //   const renderBanner = useCallback(
  //     (props) => {
  //       const navigation = useNavigation();
  //       return workoutContext.active
  //         ? () => (
  //             <SessionBanner
  //               onPress={() => {
  //                 navigation.navigate("TemplateScreenModal");
  //               }}
  //               {...style}
  //             />
  //           )
  //         : null;
  //     },
  //     [workoutContext]
  //   );
  //   <StackNavigator.Screen name="Home">
  //     {() => (
  //       <View style={{ flex: 1, backgroundColor: "#6a51ae" }}>
  //         <StatusBar barStyle="dark-content" />
  //         <TabScreen {...{ renderBanner, style }} />
  //       </View>
  //     )}
  //   </StackNavigator.Screen>;

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
        {() => (
          <WorkoutContextProvider>
            <View style={{ flex: 1, backgroundColor: "#6a51ae" }}>
              <StatusBar barStyle="light-content" />
              <ProgramScreen onPress={() => {}} style={style} />
            </View>
          </WorkoutContextProvider>
        )}
      </StackNavigator.Screen>
      <StackNavigator.Screen name="WorkoutScreen">
        {() => (
          <WorkoutContextProvider>
            <View style={{ flex: 1, backgroundColor: "#6a51ae" }}>
              <StatusBar barStyle="light-content" />
            </View>
          </WorkoutContextProvider>
        )}
      </StackNavigator.Screen>
      <StackNavigator.Screen name="TemplateScreen">
        {() => {
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
              <WorkoutContextProvider>
                <TemplateScreen style={style} />
              </WorkoutContextProvider>
            </View>
          );
        }}
      </StackNavigator.Screen>
    </StackNavigator.Navigator>
  );
}
