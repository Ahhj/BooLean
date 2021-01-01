import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ProgramsScreen from "./src/views/ProgramsScreen";
import SessionModal from "./src/views/SessionModal";
import TouchableCard from "./src/views/TouchableCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
const WorkoutStack = createStackNavigator();

function MyTabBar({ state, descriptors, navigation, ...sessionState }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View>
      {sessionState.sessionActive ? (
        <WorkoutBanner data={{ title: "Hello" }} navigation={navigation} />
      ) : null}
      <View
        style={{ flexDirection: "row", height: 80, backgroundColor: "gray" }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const Icon =
            options.tabBarIcon !== undefined
              ? options.tabBarIcon
              : options.icon !== undefined
              ? options.icon
              : null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  padding: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icon size={16} color={isFocused ? "white" : "black"} />
                  <Text
                    style={{
                      color: isFocused ? "white" : "black",
                      fontSize: 20,
                    }}
                  >
                    {label}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function WorkoutBanner({ navigation, data }) {
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
        <Text style={{ color: "black" }}>{data.title}</Text>
      </TouchableCard>
    </SafeAreaView>
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
            <NavTabs {...{ sessionActive }} />
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

function NavTabs({ sessionActive }) {
  return (
    <Tab.Navigator
      initialRouteName={"Programs"}
      tabBar={(props) => <MyTabBar {...{ ...props, sessionActive }} />}
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
