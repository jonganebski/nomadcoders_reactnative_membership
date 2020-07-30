import React, { useState } from "react";
import { Text, Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import Stack from "./navigation/Stack";

const cacheImages = (images) =>
  images.map((img) => {
    if (typeof img === "string") {
      return Image.prefetch(img);
    } else {
      return Asset.fromModule(img).downloadAsync();
    }
  });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = () => {
    const images = cacheImages([
      "https://images.unsplash.com/photo-1593642634627-6fdaf35209f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      require("./assets/splash.png"),
    ]);
    const fonts = cacheFonts([Ionicons.font, FontAwesome.font]);
    return Promise.all([...images, ...fonts]);
  };
  const onFinish = () => setIsReady(true);
  return isReady ? (
    <>
      <NavigationContainer>
        <Stack></Stack>
      </NavigationContainer>
      <StatusBar barStyle="light-content"></StatusBar>
    </>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    ></AppLoading>
  );
}
