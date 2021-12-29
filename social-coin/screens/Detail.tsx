import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { history, info } from '../api';
import { IN_NAV_SCREEN, TInNavParamList } from '../navigators/screens';
import { VictoryChart, VictoryLine, VictoryScatter } from 'victory-native';

export const Detail: React.FC<
  NativeStackScreenProps<TInNavParamList, IN_NAV_SCREEN.DETAIL>
> = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params?.symbol,
      headerLargeTitle: true,
    });
  }, []);

  const { isLoading: isInfoLoading, data: infoData } = useQuery(
    ['info', route.params.id],
    info
  );
  const { isLoading: isHistoryLoading, data: historyData } = useQuery(
    ['history', route.params.id],
    history
  );

  const [victoryData, setVictoryData] = useState<
    { x: number; y: number }[] | null
  >(null);
  useEffect(() => {
    if (!historyData) return;
    setVictoryData(
      historyData.map(({ timestamp, price }) => ({
        x: new Date(timestamp).getTime(),
        y: price,
      }))
    );
  }, [historyData]);
  return (
    <Container__ScrollView>
      <Text>Detail</Text>
      {victoryData && (
        <VictoryChart height={360}>
          <VictoryLine
            data={victoryData}
            style={{ data: { stroke: '#1abc9c' } }}
            interpolation="cardinal"
            animate
          />
          <VictoryScatter
            data={victoryData}
            style={{ data: { fill: '#1abc9c' } }}
          />
        </VictoryChart>
      )}
    </Container__ScrollView>
  );
};

const Container__ScrollView = styled.ScrollView`
  flex: 1;
  background: black;
`;
