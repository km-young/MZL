import React from 'react';
import styled from '@emotion/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
export default function Edit({
  SetEditTmi,
  SetEditMean,
  SetEditWord,
  post,
  setEdit,
  editPost,
}) {
  return (
    <View>
      {/* isEdit이 true이면 input으로 */}
      <Section>
        <Title>단어(수정)</Title>
        <TextBox background="#C2E1FF">
          <InputBox onChangeText={SetEditWord} defaultValue={post.word} />
        </TextBox>
      </Section>
      <Section>
        <Title>의미(수정)</Title>
        <TextBox background="#C2E1FF">
          <InputBox onChangeText={SetEditMean} defaultValue={post.mean} />
        </TextBox>
      </Section>
      <Section>
        <Title>TMI(수정)</Title>
        <TextBox background="#C2E1FF">
          <InputBox
            onChangeText={SetEditTmi}
            defaultValue={post.tmi}
            multiline={true}
            numberOfLines={10}
          />
        </TextBox>
      </Section>
      <ButtonBox>
        <Btn
          onPress={() => {
            post.isEdit ? editPost(post.id) : setEdit(post.id);
          }}
        >
          <Text>{post.isEdit ? '등록' : '수정'}</Text>
        </Btn>
        <Btn onPress={() => {}}>
          <Text>{post.isEdit ? '' : '삭제'}</Text>
        </Btn>
      </ButtonBox>
    </View>
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
  background-color: ${(props) => props.background || '#ffeaa7'};
  box-shadow: 2px 2px 2px #555555;
  overflow: visible;
`;
const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const Btn = styled.TouchableOpacity`
  padding: 30px 10px;
`;

const InputBox = styled.TextInput`
  background-color: #c2e1ff;
`;
