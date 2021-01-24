import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BannerTabBar from "./BannerTabBar";
import ProgramsScreen from "./ProgramsScreen";

const TabNavigator = createBottomTabNavigator();

/**
 * Access to inner-most level of navigation. Renders a navigator
 * allowing navigation between the screens in the application
 * unrelated to sessions.
 *
 * The tab-bar is customized to allow
 * room for a banner component to display for quick navigation
 * to screens not accessible through the tabs.
 */
export default function TabScreen({ renderBanner, style }) {
  return (
    <TabNavigator.Navigator
      initialRouteName={"Programs"}
      tabBar={(props) => (
        <BannerTabBar
          {...{
            ...props,
            renderBanner,
          }}
        />
      )}
    >
      <TabNavigator.Screen
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
      <TabNavigator.Screen
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
        {() => <ProgramsScreen onPress={() => {}} style={style} />}
      </TabNavigator.Screen>
      <TabNavigator.Screen
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
    </TabNavigator.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}
