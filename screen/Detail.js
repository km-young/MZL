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
    params: { id },
  },
}) {
  const [category, setCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [word, setWord] = useState({});

  const [editMean, setEditMean] = useState('');
  const [editWord, setEditWord] = useState('');
  const [editTmi, setEditTmi] = useState('');

  // get해오는부분
  const getWord = async () => {
    const snapshot = await getDoc(doc(dbService, 'Words', id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    // 아무것도 수정입력 안하고 수정완료 시 데이터 없어지는 현상을 막기위해 setEdit state 여기에 추가함.
    setEditMean(data.mean);
    setEditTmi(data.tmi);
    setEditWord(data.word);
    setWord(data);
    console.log(data)
  };

  useEffect(() => {
    getWord();
  }, []);

  // 누르면 isEdit이 true/false로 변경됨
  const setEdit = async () => {
    await updateDoc(doc(dbService, 'Words', id), {
      isEdit: !word.isEdit,
    });
    getWord();
  };

  // 완료 누르면 글 수정 완료
  // 유효성검사 추가, tmi는 공란이여도 괜찮을 것 같아서 mean,word에만 적용
  const editPost = async () => {
    if (editMean !== '' && editWord !== '') { 
      await updateDoc(doc(dbService, 'Words', id), {
        mean: editMean,
        word: editWord,
        tmi: editTmi,
        isEdit: false,
      });
      getWord();
    } else {
      return;
    }
  };

  // 유효성검사 에러메세지 출력을 위해 변수 생성
  const errCheck = editMean === '' || editWord === '';

  // reset 사용해서 변경된 상세페이지로 가게끔 해야함.  reset을 안쓰면 뒤로기가 되는데 그러면 이상해짐
  console.log('editMean', Boolean(editMean));
  console.log('editWord', editWord);
  console.log('editTmi', editTmi);
  return (
    <KeyboardAwareScrollView>
      <View key={id}>
        {word.isEdit ? (
          // isEdit이 true 일 때 보여지는 화면
          <>
            <Section>
              <Title>단어(수정)</Title>
              <TextBox background="#C2E1FF">
                <InputBox onChangeText={setEditWord} defaultValue={word.word} />
              </TextBox>
            </Section>

            <Section>
              <Title>의미(수정)</Title>
              <TextBox background="#C2E1FF">
                <InputBox onChangeText={setEditMean} defaultValue={word.mean} />
              </TextBox>
            </Section>

            <Section>
              <Title>TMI(수정)</Title>
              <TextBox background="#C2E1FF">
                <InputBox
                  onChangeText={setEditTmi}
                  defaultValue={word.tmi}
                  multiline={true}
                  numberOfLines={10}
                />
              </TextBox>
            </Section>
            {/* 유효성검사 에러메세지 */}
            <ErrText>{errCheck ? '단어와 의미를 입력해주세요.' : ''}</ErrText>
            <ButtonBox>
              <Btn onPress={editPost}>
                <Text>등록</Text>
              </Btn>
              <Btn onPress={() => {}}>
                <Text></Text>
              </Btn>
            </ButtonBox>
          </>
        ) : (
          // isEdit이 false 일 때 보여지는 화면
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
            <ButtonBox>
              <Btn onPress={setEdit}>
                <Text>수정</Text>
              </Btn>
              <Btn onPress={() => {}}>
                <Text>삭제</Text>
              </Btn>
            </ButtonBox>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const ErrText = styled.Text`
  color: red;
  text-align: center;
`;
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
