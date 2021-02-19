import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

/**
 * Customized tab bar that makes space for a pressable banner to display
 * above it.
 */
export default function BannerTabBar({
  state,
  descriptors,
  navigation,
  renderBanner,
}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const Banner = renderBanner({ navigation });

  return (
    <View>
      {Banner ? <Banner /> : null}
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
              key={`${index}`}
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
