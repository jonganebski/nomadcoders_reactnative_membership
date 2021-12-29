import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { InNav } from './navigators/InNav';
import { OutNav } from './navigators/OutNav';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => setIsLoggedIn(!!user));
  }, []);
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <InNav /> : <OutNav />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}
