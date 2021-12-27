import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdMobRewarded } from 'expo-ads-admob';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { useRealmCtx } from '../contexts/useRealmContext';
import { Feeling } from '../schema';

const EMOTIONS = ['😀', '🥰', '🤪', '😢', '😡', '💀', '💩'];

export const Write: React.FC<NativeStackScreenProps<any, any>> = ({
  navigation,
}) => {
  const realm = useRealmCtx();

  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [feelings, setFeelings] = useState<string>('');

  const onEmotionPress = (emoji: string) => setSelectedEmotion(emoji);
  const onChangeText = (feelings: string) => setFeelings(feelings);
  const onSubmit = async () => {
    if (!feelings || !selectedEmotion) {
      Alert.alert('Please complete the form.');
      return;
    }
    await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1712485313');
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true });
    await AdMobRewarded.showAdAsync();
    AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
      AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
        realm?.write(() => {
          realm.create<Feeling>('Feeling', {
            _id: new Date().getTime(),
            message: feelings,
            emotion: selectedEmotion,
          });
        });
        navigation.goBack();
      });
    });
  };

  return (
    <Container__View>
      <Title__Text>How do you feel today?</Title__Text>
      <Emotions__View>
        {EMOTIONS.map((emoji, index) => {
          return (
            <Emotion__TO
              selected={selectedEmotion === emoji}
              onPress={() => onEmotionPress(emoji)}
              key={index}
            >
              <Emotion__Text>{emoji}</Emotion__Text>
            </Emotion__TO>
          );
        })}
      </Emotions__View>
      <Input__TextInput
        placeholder="Write your feelings"
        value={feelings}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyLabel="" // For Android
        returnKeyType="done" // For IOS
      />
      <Button__TO onPress={onSubmit}>
        <ButtonText__Text>Save</ButtonText__Text>
      </Button__TO>
    </Container__View>
  );
};

const Container__View = styled.View`
  flex: 1;
  padding: 0px 30px;
  background-color: ${colors.bgColor};
`;

const Title__Text = styled.Text`
  margin: 50px 0px;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: ${colors.textColor};
`;

const Input__TextInput = styled.TextInput`
  padding: 10px 20px;
  background-color: white;
  border-radius: 10px;
  font-size: 18px;
`;

const Button__TO = styled.TouchableOpacity`
  width: 100%;
  margin-top: 30px;
  padding: 10px 20px;
  align-items: center;
  background-color: ${colors.btnColor};
  border-radius: 20px;
`;

const ButtonText__Text = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const Emotions__View = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Emotion__TO = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 8px;
  background-color: white;
  /* 'border: 1px solid black' is unavailable in React-native */
  border-radius: 10px;
  border-width: ${({ selected }) => (selected ? '2px' : '0px')};
  border-color: rgba(0, 0, 0, 0.5);
  /* Shadow for Android */
  elevation: 5;
  /* Shadow for IOS */
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const Emotion__Text = styled.Text`
  font-size: 24px;
`;
