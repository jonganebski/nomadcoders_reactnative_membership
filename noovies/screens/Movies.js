import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const Movies = ({ navigation: { navigate } }) => {
  // navigate('Stacks', { screen: 'One' })와 navigate('One')의 차이
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      onPress={() => navigate('Stacks', { screen: 'One' })}
    >
      <Text>Movies</Text>
    </TouchableOpacity>
  );
};
