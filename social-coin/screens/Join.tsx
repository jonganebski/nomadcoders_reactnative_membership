import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef<TextInput | null>(null);
  const onSubmitEditingEmail = () => {
    passwordInputRef.current?.focus();
  };
  const onSubmitEditingPassword = async () => {
    if (isLoading) return;
    if (!email || !password) return Alert.alert('Fill in the form.');

    setIsLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container__View>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
        returnKeyType="next"
        onSubmitEditing={onSubmitEditingEmail}
      />
      <TextInput
        ref={passwordInputRef}
        placeholder="Password"
        value={password}
        secureTextEntry
        returnKeyType="done"
        onChangeText={(password) => setPassword(password)}
        onSubmitEditing={onSubmitEditingPassword}
      />
      <TouchableOpacity onPress={onSubmitEditingPassword}>
        {isLoading ? (
          <ActivityIndicator color="red" />
        ) : (
          <Text>Create an account</Text>
        )}
      </TouchableOpacity>
    </Container__View>
  );
};

const Container__View = styled.View`
  flex: 1;
`;
const Text = styled.Text``;
