import React, { useState } from "react";
import { Text, Image } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";

const cacheImages = (images) =>
  images.map((img) => {
    if (typeof img === "string") {
      return Image.prefetch(img);
    } else {
      return Asset.fromModule(img).downloadAsync();
    }
  });

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const loadAssets = async () => {
    const images = cacheImages([
      "https://images.unsplash.com/photo-1593642634627-6fdaf35209f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      require("./assets/splash.png"),
    ]);
    console.log(images);
    // expected output:
    // [
    //   Promise {
    //     "_40": 0,
    //     "_55": null,
    //     "_65": 0,
    //     "_72": null,
    //   },
    //   Promise {
    //     "_40": 0,
    //     "_55": null,
    //     "_65": 0,
    //     "_72": null,
    //   },
    // ]
  };
  const onFinish = () => setIsReady(true);
  return isReady ? (
    <Text>Ready!</Text>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    ></AppLoading>
  );
}
