import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import React from 'react';
import { Root } from './navigation/Root';

export default function App() {
  const [assets] = useAssets([
    require('./assets/images/ali-kazal-WOrt80XPnIc-unsplash.jpg'),
  ]);
  const [isFontsLoaded] = useFonts(Ionicons.font);

  if (!assets || !isFontsLoaded) return <AppLoading />;
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
