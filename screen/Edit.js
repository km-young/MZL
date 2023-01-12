import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
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
import { dbService, auth } from '../firebase';
import { Alert } from 'react-native';

export default function Edit({
  // 네비게이션 프랍에 setoptions 사용 / 헤더레프트 부분을 여기서도 한번 더 써줘서 덮어씌운다.
  navigation,
  route: {
    params: { id },
  },
}) {
  const [word, setWord] = useState({});

  const [editMean, setEditMean] = useState('');
  const [editWord, setEditWord] = useState('');
  const [editTmi, setEditTmi] = useState('');
  const [errCheck, setErrCheck] = useState(false);

  // get해오는부분
  const getWord = async () => {
    const snapshot = await getDoc(doc(dbService, 'Words', id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    // 아무것도 수정입력 안하고 수정완료 시 데이터 없어지는 현상을 막기위해 setEdit state 여기에 추가함.
    setEditMean(data.mean);
    setEditTmi(data.tmi);
    setEditWord(data.word);
    setWord(data);
    console.log(data);
  };

  useEffect(() => {
    getWord();
  }, []);

  // Edit 페이지에서 뒤로 버튼 누르면 Home으로 가는 현상 고쳐주는 코드
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BtTitle>← 뒤로</BtTitle>
          </TouchableOpacity>
        );
      },
    });
  }, []);

  const editPost = () => {
    Alert.alert('수정', '수정하시겠습니까?', [
      {
        text: '취소',
        style: 'destructive',
      },
      {
        text: '수정',
        onPress: async () => {
          try {
            if (editMean !== '' && editWord !== '') { // 단어와 의미가 공란이 아니어야지만 update가 됨
              await updateDoc(doc(dbService, 'Words', id), {
                mean: editMean,
                word: editWord,
                tmi: editTmi,
                isEdit: false,
              });
              getWord();
              navigation.reset({
                index: 1,
                routes: [
                  {
                    name: 'Home',
                  },
                  {
                    name: 'Detail',
                    params: { id: id },
                  }]
              })
            } else {
              // 둘중 하나 공백이면 errCheck를 true로 변경
              if (editMean === '' || editWord === '') { 
                setErrCheck(true);
              }
              return;
            }
          } catch (err) {
            console.log('err:', err);
          }
        },
      },
    ]);
  };

  // 유효성검사 에러메세지 출력을 위해 변수 생성

  return (
    <KeyboardAwareScrollView>
      <StatusBar />
      <View key={id}>
        <Section>
          <Title>단어(수정)</Title>
          <TextBox background="#C2E1FF">
            <InputBox onChangeText={setEditWord} defaultValue={word.word} />
          </TextBox>
        </Section>

        <Section>
          <Title>의미(수정)</Title>
          <TextBox background="#C2E1FF">
            <InputBox
              onChangeText={setEditMean}
              defaultValue={word.mean}
              multiline={true}
              numberOfLines={10}
            />
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
            <BtTitle>등록</BtTitle>
          </Btn>
        </ButtonBox>
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
  color: ${(props) => props.theme.title};
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

const BtTitle = styled.Text`
  color: ${(props) => props.theme.title};
`;

