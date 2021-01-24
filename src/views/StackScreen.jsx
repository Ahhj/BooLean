import React, { useState, useCallback } from "react";
import { View, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SessionScreen from "./SessionScreen";
import SessionBanner from "./SessionBanner";
import TabScreen from "./TabScreen";

const StackNavigator = createStackNavigator();

/**
 * Access to outer-most level of navigation. Renders a navigator
 * with 2 screens:
 *   - Home enables navigation around the app via a tab bar
 *   - SessionScreenModal is a full screen modal for the user to interact
 *     with sessions.
 */
export default function StackScreen({ style }) {
  const [sessionActive, setSessionActive] = useState(true);

  const sessionState = { active: sessionActive };
  const renderBanner = useCallback(
    ({ navigation }) => {
      return sessionState.active
        ? () => (
            <SessionBanner
              {...{
                sessionState,
                onPress: () => navigation.navigate("SessionScreenModal"),
                style,
              }}
            />
          )
        : null;
    },
    [sessionState]
  );

  return (
    <StackNavigator.Navigator
      {...{
        headerMode: "none",
        mode: "modal",
        transparentCard: true,
        cardStyle: { opacity: 1 },
      }}
    >
      <StackNavigator.Screen name="Home">
        {() => (
          <View style={{ flex: 1, backgroundColor: "#6a51ae" }}>
            <StatusBar barStyle="dark-content" />
            <TabScreen {...{ renderBanner, style }} />
          </View>
        )}
      </StackNavigator.Screen>
      <StackNavigator.Screen name="SessionScreenModal">
        {() => {
          const navigation = useNavigation();
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
              <SessionScreen
                active={sessionActive}
                onStart={() => setSessionActive(true)}
                onEdit={() => setSessionActive(true)}
                onFinish={() => setSessionActive(false)}
                onCancel={() => setSessionActive(false)}
                onClose={() => navigation.goBack()}
                style={style}
              />
            </View>
          );
        }}
      </StackNavigator.Screen>
    </StackNavigator.Navigator>
  );
}
