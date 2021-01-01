import React from "react";
import { Alert, Modal, View, StyleSheet, Pressable, Text } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function BannerModal({ visible, children }) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <Pressable onPress={() => alert("hello")}>
      <View style={styles.bannerView}>
        <View style={{ ...styles.centeredView, marginBottom: tabBarHeight }}>
          {<Text>Hello World!</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bannerView: {
    margin: 20,
    width: "98%",
    height: "12%",
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
    position: "absolute",
  },
});
