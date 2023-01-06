import React from 'react';
import { Text, View } from 'react-native';
import { PINK_COLOR } from '../colors';

export default function Post() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PINK_COLOR,
        width: 200,
        height: 200,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
    >
      <Text>Post</Text>
    </View>
  );
}
