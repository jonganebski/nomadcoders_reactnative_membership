import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import TVs from "../screens/TVs";
import Search from "../screens/Search";
import Favs from "../screens/Favs";

const Tabs = createBottomTabNavigator();

const getHeaderName = (props) =>
  props.route?.state?.routeNames[props.route.state.index] ?? "Movies";

export default (props) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({ title: getHeaderName(props) });
  }, [props.route]);
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Movies" component={Movies}></Tabs.Screen>
      <Tabs.Screen name="TVs" component={TVs}></Tabs.Screen>
      <Tabs.Screen name="Search" component={Search}></Tabs.Screen>
      <Tabs.Screen name="Favorites" component={Favs}></Tabs.Screen>
    </Tabs.Navigator>
  );
};
