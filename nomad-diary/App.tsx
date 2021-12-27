import { NavigationContainer } from '@react-navigation/native';
import { setTestDeviceIDAsync } from 'expo-ads-admob';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import Realm from 'realm';
import { RealmContext } from './contexts/useRealmContext';
import { Navigator } from './navigator';
import { Feeling } from './schema';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [realm, setRealm] = useState<Realm | null>(null);

  const onFinish = () => setIsReady(true);
  const startLoading = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    const realm = await Realm.open({
      path: 'nomad_diary_db',
      schema: [Feeling.Schema],
    });
    setRealm(realm);
  };
  return !isReady ? (
    <AppLoading
      startAsync={startLoading}
      onFinish={onFinish}
      onError={console.error}
    />
  ) : (
    <RealmContext.Provider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </RealmContext.Provider>
  );
}
