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
  console.log(props);
  // expected output:
  // Object {
  //   "navigation": Object {
  //     "addListener": [Function addListener],
  //     "canGoBack": [Function canGoBack],
  //     "dangerouslyGetParent": [Function dangerouslyGetParent],
  //     "dangerouslyGetState": [Function anonymous],
  //     "dispatch": [Function dispatch],
  //     "goBack": [Function anonymous],
  //     "isFocused": [Function isFocused],
  //     "navigate": [Function anonymous],
  //     "pop": [Function anonymous],
  //     "popToTop": [Function anonymous],
  //     "push": [Function anonymous],
  //     "removeListener": [Function removeListener],
  //     "replace": [Function anonymous],
  //     "reset": [Function anonymous],
  //     "setOptions": [Function setOptions],
  //     "setParams": [Function anonymous],
  //   },
  //   "route": Object {
  //     "key": "Tabs-ed4x-wIB-4FkLdwhol_My",
  //     "name": "Tabs",
  //     "params": undefined,
  //     "state": Object {
  //       "history": Array [
  //         Object {
  //           "key": "Movies-bICxFErKkoLjmepZAjkKy",
  //           "type": "route",
  //         },
  //         Object {
  //           "key": "TVs-J8b30CQJb5-5jpktFy0wZ",
  //           "type": "route",
  //         },
  //         Object {
  //           "key": "Search-h8JOICFrIW4JPFM6jm_EU",
  //           "type": "route",
  //         },
  //       ],
  //       "index": 2,
  //       "key": "tab-2O9sNTzCidkm-45H-ejp2",
  //       "routeNames": Array [
  //         "Movies",
  //         "TVs",
  //         "Search",
  //         "Favs",
  //       ],
  //       "routes": Array [
  //         Object {
  //           "key": "Movies-bICxFErKkoLjmepZAjkKy",
  //           "name": "Movies",
  //           "params": undefined,
  //         },
  //         Object {
  //           "key": "TVs-J8b30CQJb5-5jpktFy0wZ",
  //           "name": "TVs",
  //           "params": undefined,
  //         },
  //         Object {
  //           "key": "Search-h8JOICFrIW4JPFM6jm_EU",
  //           "name": "Search",
  //           "params": undefined,
  //         },
  //         Object {
  //           "key": "Favs-dgYpUgCkiFrjPJRhBjaqg",
  //           "name": "Favs",
  //           "params": undefined,
  //         },
  //       ],
  //       "stale": false,
  //       "type": "tab",
  //     },
  //   },
  // }
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
