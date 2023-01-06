import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function Home() {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('Stacks', { screen: 'Detail', params: { test: 'test' } })
      }
    >
      <Text>홈 페이지</Text>
    </TouchableOpacity>
  );
}
