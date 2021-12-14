import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { useRealmCtx } from '../contexts/useRealmContext';
import { Feeling } from '../schema';

// 아래처럼 필터링도 된다. 단, 필터링 쿼리를 알아야 된다.
// realm?.objects<Feeling>('Feeling').filtered("emotion = '💩'")

export const Home: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  const realm = useRealmCtx();
  const [feelings, setFeelings] = useState<
    Realm.Results<Feeling & Realm.Object> | undefined
  >();

  useEffect(() => {
    const feelings = realm?.objects<Feeling>('Feeling');
    setFeelings(feelings);
    feelings?.addListener(() => {
      const feelings = realm?.objects<Feeling>('Feeling');
      setFeelings(feelings);
    });
    return () => {
      feelings?.removeAllListeners();
    };
  }, []);

  return (
    <Container__View>
      <Title__Text>My Journal</Title__Text>
      <FlatList
        data={feelings}
        keyExtractor={(item) => item._id + ''}
        ItemSeparatorComponent={Separator__View}
        renderItem={({ item }: ListRenderItemInfo<Feeling>) => (
          <Record__View>
            <Emotion__Text>{item.emotion}</Emotion__Text>
            <Message__Text>{item.message}</Message__Text>
          </Record__View>
        )}
      />
      <Button__TO onPress={() => navigation.navigate('Write')}>
        <Ionicons name="add" color="white" size={40} />
      </Button__TO>
    </Container__View>
  );
};

const Container__View = styled.View`
  flex: 1;
  padding: 100px 30px 0px 30px;
  background-color: ${colors.bgColor};
`;

const Title__Text = styled.Text`
  margin-bottom: 100px;
  color: ${colors.textColor};
  font-size: 38px;
`;

const Button__TO = styled.TouchableOpacity`
  position: absolute;
  right: 50px;
  bottom: 50px;
  height: 80px;
  width: 80px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: ${colors.btnColor};
  /* Shadow for Android */
  elevation: 5;
  /* Shadow for IOS */
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const Record__View = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${colors.cardColor};
`;

const Emotion__Text = styled.Text`
  margin-right: 10px;
  font-size: 24px;
`;

const Message__Text = styled.Text`
  font-size: 18px;
`;

const Separator__View = styled.View`
  height: 10px;
`;
