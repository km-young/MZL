import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { dbService } from '../firebase';

export default function Detail({
  navigation: { navigate },
  route: {
    params: { postId },
  },
}) {
  const [category, setCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [word, setWord] = useState({});

  const [editMean, SetEditMean] = useState('');
  const [editWord, SetEditWord] = useState('');
  const [editTmi, SetEditTmi] = useState('');

  console.log(word);
  // get해오는부분
  useEffect(() => {
    const getWord = async () => {
      const snapshot = await getDoc(doc(dbService, 'Words', postId));
      const data = snapshot.data(); // 가져온 doc의 객체 내용
      const postID = snapshot.id; // 가져온 doc의 id
      setWord(data);
      console.log(snapshot.data());
    };
    getWord();
  }, []);

  
  // 누르면 isEdit이 true/false로 변경됨
  const setEdit = async (id) => {
    await updateDoc(doc(dbService, 'Words', id), {
      isEdit: !word.isEdit,
    });
  };

  // 완료 누르면 글 수정 완료
  const editPost = async (id) => {
    await updateDoc(doc(dbService, 'Words', id), {
      mean: editMean,
      word: editWord,
      tmi: editTmi,
      isEdit: false,
    });
  };

  return (
    <KeyboardAwareScrollView>
      <View key={word.id}>
        {word.isEdit ? (
          <>
            <Section>
              <Title>단어(수정)</Title>
              <TextBox background="#C2E1FF">
                <InputBox onChangeText={SetEditWord} defaultValue={word.word} />
              </TextBox>
            </Section>

            <Section>
              <Title>의미(수정)</Title>
              <TextBox background="#C2E1FF">
                <InputBox onChangeText={SetEditMean} defaultValue={word.mean} />
              </TextBox>
            </Section>

            <Section>
              <Title>TMI(수정)</Title>
              <TextBox background="#C2E1FF">
                <InputBox
                  onChangeText={SetEditTmi}
                  defaultValue={word.tmi}
                  multiline={true}
                  numberOfLines={10}
                />
              </TextBox>
            </Section>
          </>
        ) : (
          <>
            <Section>
              <Title>단어</Title>
              <TextBox>
                <Text>{word.word}</Text>
              </TextBox>
            </Section>
            <Section>
              <Title>의미</Title>
              <TextBox>
                <Text>{word.mean}</Text>
              </TextBox>
            </Section>

            <Section>
              <Title>TMI</Title>
              <TextBox>
                <Text>{word.tmi}</Text>
              </TextBox>
            </Section>
          </>
        )}
        <ButtonBox>
          <Btn
            onPress={() => {
              word.isEdit ? editPost(word.id) : setEdit(word.id);
            }}
          >
            <Text>{word.isEdit ? '등록' : '수정'}</Text>
          </Btn>
          <Btn onPress={() => {}}>
            <Text>{word.isEdit ? '' : '삭제'}</Text>
          </Btn>
        </ButtonBox>
      </View>
    </KeyboardAwareScrollView>
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