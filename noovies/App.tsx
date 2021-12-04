import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import React from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { Root } from './navigation/Root';
import { darkTheme, lightTheme } from './styled';
import { QueryClient, QueryClientProvider } from 'react-query';

// https://reactnative.dev/docs/typescript

const client = new QueryClient();

export default function App() {
  const [assets] = useAssets([
    require('./assets/images/ali-kazal-WOrt80XPnIc-unsplash.jpg'),
  ]);
  const [isFontsLoaded] = useFonts(Ionicons.font);
  const isDarkMode = useColorScheme() === 'dark';

  if (!assets || !isFontsLoaded) return <AppLoading />;
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
