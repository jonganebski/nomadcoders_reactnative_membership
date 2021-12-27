import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdMobBanner } from 'expo-ads-admob';
import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, LayoutAnimation } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
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
    feelings?.addListener((feelings, changes) => {
      // Layout Animations. Animated를 사용하지 않고도 간단한 Layout 관련 애니매이션은 가능하다.
      // https://reactnative.dev/docs/layoutanimation
      // State가 업데이트 될 때 이 애니매이션을 실행한다. 안드로이드는 추가적인 설정이 필요하니 공식문서 참고할 것.
      LayoutAnimation.spring();
      setFeelings(feelings.sorted('_id', true));
    });
    return () => {
      feelings?.removeAllListeners();
    };
  }, []);

  const onPress = (id: number) => {
    realm?.write(() => {
      const feeling = realm.objectForPrimaryKey(Feeling.name, id);
      realm.delete(feeling);
    });
  };

  return (
    <Container__View>
      <Title__Text>My Journal</Title__Text>
      <AdMobBanner
        adUnitID="ca-app-pub-3940256099942544/2934735716"
        bannerSize="fullBanner"
      />
      <FlatList
        style={{ width: '100%', marginVertical: 100 }}
        data={feelings}
        keyExtractor={(item) => item._id + ''}
        ItemSeparatorComponent={Separator__View}
        renderItem={({ item }: ListRenderItemInfo<Feeling>) => (
          <TouchableOpacity onPress={() => onPress(item._id)}>
            <Record__View>
              <Emotion__Text>{item.emotion}</Emotion__Text>
              <Message__Text>{item.message}</Message__Text>
            </Record__View>
          </TouchableOpacity>
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
  align-items: center;
  padding: 100px 30px 0px 30px;
  background-color: ${colors.bgColor};
`;

const Title__Text = styled.Text`
  width: 100%;
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
