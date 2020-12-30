import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

export default function NavBar({ data, style }) {
  return (
    <SafeAreaView>
      <View style={navStyles.bar}>
        {data.map((item) => {
          return (
            <View key={`${item.id}`} style={navStyles.itemView}>
              <TouchableHighlight
                onPress={() => alert("hello")}
                style={navStyles.item}
              >
                <Text style={{ color: "white" }}>{item.title}</Text>
              </TouchableHighlight>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const navStyles = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: "row",
    backfaceVisibility: "hidden",
    justifyContent: "center",
  },
  itemView: {
    marginVertical: "2%",
    marginHorizontal: 5,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 50,
    borderColor: "white",
    borderRadius: 15,
    borderWidth: 1,
  },
});
