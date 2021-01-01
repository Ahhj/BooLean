import "react-native-gesture-handler";
import React, { useState } from "react";
import { Text, StyleSheet, View, StatusBar, SafeAreaView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ProgramsScreen from "./src/views/ProgramsScreen";
import SessionModal from "./src/views/SessionModal";
import BaseCard from "./src/views/BaseCard";

const Tab = createBottomTabNavigator();
const WorkoutStack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function WorkoutBanner() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <BaseCard
        data={{}}
        onPress={() => navigation.navigate("MyModal")}
        style={{
          ...styles,
          cardView: { height: "95%", marginHorizontal: "2%" },
        }}
      />
    </SafeAreaView>
  );
}

function WorkoutStackScreen() {
  const [sessionActive, setSessionActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <WorkoutStack.Navigator
      {...{
        headerMode: "none",
        mode: "modal",
        transparentCard: true,
        cardStyle: { opacity: 1 },
      }}
    >
      <WorkoutStack.Screen name="Home">
        {() => (
          <View style={{ flex: 1, backgroundColor: "#6a51ae" }}>
            <StatusBar barStyle="dark-content" />

            <View style={{ height: `${sessionActive ? 15 : 0}%` }}>
              <WorkoutBanner />
            </View>
            <View style={{ flex: 1, height: `${sessionActive ? 85 : 0}%` }}>
              <NavTabs />
            </View>
          </View>
        )}
      </WorkoutStack.Screen>
      <WorkoutStack.Screen name="MyModal">
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
              <SessionModal
                active={sessionActive}
                visible={modalVisible}
                onStart={() => setSessionActive(true)}
                onEdit={() => setSessionActive(true)}
                onFinish={() => setSessionActive(false)}
                onCancel={() => setSessionActive(false)}
                onClose={() => navigation.goBack()}
                style={styles}
              />
            </View>
          );
        }}
      </WorkoutStack.Screen>
    </WorkoutStack.Navigator>
  );
}

function NavTabs({}) {
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
        {() => <ProgramsScreen onPress={() => {}} style={styles} />}
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
    <SafeAreaProvider>
      <NavigationContainer>
        <WorkoutStackScreen />
      </NavigationContainer>
    </SafeAreaProvider>
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
  },
  bottom: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default App;
