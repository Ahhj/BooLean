import "react-native-gesture-handler";
import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProgramsScreen from "./src/views/ProgramsScreen";
import SessionModal from "./src/views/SessionModal";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function NavTabs({
  sessionActive,
  setSessionActive,
  modalVisible,
  setModalVisible,
}) {
  return (
    <Tab.Navigator
      initialRouteName={"Programs"}
      tabBarOptions={{
        inactiveTintColor: "black",
        activeTintColor: "white",
        labelStyle: { fontSize: 20 },
        style: { backgroundColor: "gray" },
        showIcon: true,
      }}
    >
      <Tab.Screen
        key={"1"}
        name={"Home"}
        component={HomeScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: () => <Text>{"📈"}</Text>,
        }}
      />
      <Tab.Screen
        key={"2"}
        name={"Programs"}
        options={{
          title: "Programs",
          tabBarIcon: () => <Text>{"🏋️‍♀️"}</Text>,
        }}
      >
        {() => (
          <ProgramsScreen
            onPress={(item) => setModalVisible(true)}
            style={styles}
          >
            <SessionModal
              active={sessionActive}
              visible={modalVisible}
              onStart={() => setSessionActive(true)}
              onEdit={() => setSessionActive(true)}
              onFinish={() => setSessionActive(false)}
              onCancel={() => setSessionActive(false)}
              onClose={() => setModalVisible(false)}
              style={styles}
            />
          </ProgramsScreen>
        )}
      </Tab.Screen>
      <Tab.Screen
        key={"3"}
        name={"History"}
        component={HomeScreen}
        options={{
          title: "History",
          tabBarIcon: () => <Text>{"🕓"}</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [sessionActive, setSessionActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <NavigationContainer>
      <NavTabs
        {...{ sessionActive, setSessionActive, modalVisible, setModalVisible }}
      />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  top: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
  },
  bottom: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 0,
  },
});

export default App;
