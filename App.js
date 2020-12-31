import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProgramsScreen from "./src/views/ProgramsScreen";

const Tab = createBottomTabNavigator();

// const navigation = useNavigation();
//   <TouchableHighlight onPress={() => navigation.navigate("Home")}>
//     <Text>{"hello"}</Text>
//   </TouchableHighlight>

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function NavTabs({ sessionActive, setSessionActive }) {
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
            style={styles}
            {...{ sessionActive, setSessionActive }}
          />
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
  return (
    <NavigationContainer>
      <NavTabs {...{ sessionActive, setSessionActive }} />
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
  button: {
    backgroundColor: "#F194FF",
    borderRadius: 40,
    padding: 20,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  top: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 0,
  },
});

export default App;
