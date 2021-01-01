import "react-native-gesture-handler";
import React, { useState } from "react";
import { Text, StyleSheet, View, StatusBar, SafeAreaView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import BannerTabBar from "./src/views/BannerTabBar";
import ProgramsScreen from "./src/views/ProgramsScreen";
import SessionScreen from "./src/views/SessionScreen";
import TouchableCard from "./src/views/TouchableCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
const WorkoutStack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function WorkoutStackScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);
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
            <NavTabs {...{ sessionState: { active: sessionActive } }} />
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
              <SessionScreen
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

function SessionBanner({ sessionState, navigation }) {
  return (
    <SafeAreaView>
      <TouchableCard
        onPress={() => navigation.navigate("MyModal")}
        style={{
          ...styles,
          cardView: { height: 80 },
          cardButton: { borderRadius: 0, backgroundColor: "white" },
        }}
      >
        <Text style={{ color: "black" }}>Hello</Text>
      </TouchableCard>
    </SafeAreaView>
  );
}

function NavTabs({ sessionState }) {
  return (
    <Tab.Navigator
      initialRouteName={"Programs"}
      tabBar={(props) => (
        <BannerTabBar
          {...{
            ...props,
            Banner: sessionState.active
              ? ({ navigation }) => (
                  <SessionBanner {...{ sessionState, navigation }} />
                )
              : null,
          }}
        />
      )}
    >
      <Tab.Screen
        key={"1"}
        name={"Home"}
        component={HomeScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={"chart-line"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        key={"2"}
        name={"Programs"}
        options={{
          title: "Programs",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={"dumbbell"}
              color={color}
              size={size}
            />
          ),
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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={"history"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
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
