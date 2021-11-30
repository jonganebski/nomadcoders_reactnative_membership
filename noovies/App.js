import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image } from 'react-native';
import { loadAsync as loadFontAsync, useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Asset, useAssets } from 'expo-asset';

export default function App() {
  const [assets] = useAssets([
    require('./assets/images/ali-kazal-WOrt80XPnIc-unsplash.jpg'),
  ]);
  const [isFontsLoaded] = useFonts(Ionicons.font);

  if (!assets || !isFontsLoaded) return <AppLoading />;
  return <Text>Loading is done!</Text>;
}
