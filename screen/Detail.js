import React from 'react';
import styled from '@emotion/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Detail() {
  return (
    <ScrollView>
      <Section>
        <Title>단어</Title>
        <TextBox>
          <Text>갑분싸</Text>
        </TextBox>
      </Section>
      <Section>
        <Title>의미</Title>

        <TextBox>
          <Text>
            갑자기 분위기 싸해짐 갑자기 분위기를 싸하게 만드는 상황에서 쓰는
            말이다.
          </Text>
        </TextBox>
      </Section>
      <Section>
        <Title>TMI</Title>
        <TextBox>
          <Text>
            배우 황정민이 '갑자기 분뇨를 싸지르다' 라고 답해서 화제가 되었다.
            배우 황정민이 '갑자기 분뇨를 싸지르다' 라고 답해서 화제가 되었다.
            배우 황정민이 '갑자기 분뇨를 싸지르다' 라고 답해서 화제가 되었다.
          </Text>
        </TextBox>
      </Section>
      <ButtonBox onPress={() => {}}>
        <Btn>
          <Text>수정</Text>
        </Btn>
        <Btn onPress={() => {}}>
          <Text>삭제</Text>
        </Btn>
      </ButtonBox>
    </ScrollView>
  );
}

const Section = styled.View`
  flex: 1;
  padding: 40px;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const TextBox = styled.View`
  flex: 1;
  padding: 20px;
  min-height: 70px;
  background-color: #ffeaa7;
  box-shadow: 2px 2px 2px #555555;
`;
const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const Btn = styled.TouchableOpacity`
  padding: 30px 10px;
`;
