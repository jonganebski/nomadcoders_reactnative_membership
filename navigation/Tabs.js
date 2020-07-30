import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import TVs from "../screens/TVs";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const Tabs = createBottomTabNavigator();

const getHeaderName = (props) =>
  props.route?.state?.routeNames[props.route.state.index] ?? "Movies";

export default (props) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({ title: getHeaderName(props) });
  }, [props.route]);
  return (
    <Tabs.Navigator
      screenOptions={(props) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          if (props.route.name === "Movies") {
            iconName += "film";
          } else if (props.route.name === "TVs") {
            iconName += "tv";
          } else if (props.route.name === "Search") {
            iconName += "search";
          } else if (props.route.name === "Favorites") {
            iconName += "heart";
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? "white" : "grey"}
              size={25}
            ></Ionicons>
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "black",
          borderTopColor: "black",
        },
      }}
    >
      <Tabs.Screen name="Movies" component={Movies}></Tabs.Screen>
      <Tabs.Screen name="TVs" component={TVs}></Tabs.Screen>
      <Tabs.Screen name="Search" component={Search}></Tabs.Screen>
      <Tabs.Screen name="Favorites" component={Favs}></Tabs.Screen>
    </Tabs.Navigator>
  );
};
