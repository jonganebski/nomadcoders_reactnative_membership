import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { coins, ICoin } from '../api';
import { Coin } from '../components/Coin';
import { IN_NAV_SCREEN, TInNavParamList } from '../navigators/screens';

// FlatList의 numColumns를 쓸 수 있다. 다만 앱을 reload해줄 것.
// columnWrapperStyle와 조합해서 쓰면 좋다.

export const Home: React.FC<
  NativeStackScreenProps<TInNavParamList, IN_NAV_SCREEN.HOME>
> = () => {
  const { isLoading, data } = useQuery<ICoin[]>('coins', coins);
  const [cleanData, setCleanData] = useState<ICoin[]>([]);

  useEffect(() => {
    if (!data) return;
    setCleanData(
      data.filter(
        ({ rank, is_active, is_new }) => rank !== 0 && is_active && !is_new
      )
    );
  }, [data]);
  if (isLoading)
    return (
      <Loader__View>
        <ActivityIndicator color="red" />
      </Loader__View>
    );
  return (
    <Container__View>
      <Coins__FlatList
        data={cleanData}
        numColumns={3}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          borderColor: 'red',
          borderWidth: 1,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => (
          <Coin id={item.id} symbol={item.symbol} index={index} />
        )}
      />
    </Container__View>
  );
};

const Container__View = styled.View`
  flex: 1;
`;
const Text = styled.Text``;
const Loader__View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Coins__FlatList = styled.FlatList`
  width: 100%;
  padding: 20px 10px;
` as unknown as typeof FlatList;
