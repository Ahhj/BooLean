import React, { useState, useCallback } from "react";
import { View, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SessionScreen from "./SessionScreen";
import SessionBanner from "./SessionBanner";
import TabScreen from "./TabScreen";

const SessionStackNavigator = createStackNavigator();

export default function SessionStackScreen({ style }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);

  const sessionState = { active: sessionActive };
  const renderBanner = useCallback(
    ({ navigation }) => {
      return sessionState.active
        ? () => (
            <SessionBanner
              {...{
                sessionState,
                onPress: () => navigation.navigate("SessionModal"),
                style,
              }}
            />
          )
        : null;
    },
    [sessionState]
  );

  return (
    <SessionStackNavigator.Navigator
      {...{
        headerMode: "none",
        mode: "modal",
        transparentCard: true,
        cardStyle: { opacity: 1 },
      }}
    >
      <SessionStackNavigator.Screen name="Home">
        {() => (
          <View style={{ flex: 1, backgroundColor: "#6a51ae" }}>
            <StatusBar barStyle="dark-content" />
            <TabScreen {...{ renderBanner, style }} />
          </View>
        )}
      </SessionStackNavigator.Screen>
      <SessionStackNavigator.Screen name="SessionModal">
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
                visible={modalVisible}
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
      </SessionStackNavigator.Screen>
    </SessionStackNavigator.Navigator>
  );
}
