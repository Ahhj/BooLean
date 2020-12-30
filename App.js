import "react-native-gesture-handler";
import React from "react";
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

import CardList from "./src/views/CardList";

const Tab = createBottomTabNavigator();

const ProgramScreen = () => {
  const data = [
    { id: 1, title: "Hello world!" },
    { id: 2, title: "Goodbye world!" },
    { id: 3, title: "Poopy plop!" },
  ];
  // const navigation = useNavigation();
  //   <TouchableHighlight onPress={() => navigation.navigate("Home")}>
  //     <Text>{"hello"}</Text>
  //   </TouchableHighlight>
  return (
    <SafeAreaView style={{ container: { height: "100%" } }}>
      <CardList data={data} numColumns={2} style={styles} />
    </SafeAreaView>
  );
};

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function NavTabs({ screens }) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: "black",
        activeTintColor: "white",
        labelStyle: { fontSize: 20 },
        style: { backgroundColor: "gray" },
        showIcon: true,
      }}
    >
      {screens.map((screen) => {
        return <Tab.Screen key={`${screen.id}`} {...screen} />;
      })}
    </Tab.Navigator>
  );
}

function App() {
  const screens = [
    {
      id: 4,
      name: "Home",
      component: HomeScreen,
      options: {
        title: "Dashboard",
        tabBarIcon: () => <Text>{"📈"}</Text>,
      },
    },
    {
      id: 2,
      name: "Programs",
      component: ProgramScreen,
      options: {
        title: "Programs",
        tabBarIcon: () => <Text>{"🗂"}</Text>,
      },
    },
    {
      id: 3,
      name: "History",
      component: HomeScreen,
      options: {
        title: "History",
        tabBarIcon: () => <Text>{"🕓"}</Text>,
      },
    },
  ];

  return (
    <NavigationContainer>
      <NavTabs screens={screens} />
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
