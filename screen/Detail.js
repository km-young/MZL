import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from '@emotion/native';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { async } from '@firebase/util';

export default function Detail({
  navigation,
  route: {
    params: { id },
  },
}) {
  const [word, setWord] = useState(null);
  const uid = auth.currentUser?.uid;
  const { navigate } = useNavigation();
  // get해오는부분
  const getWord = async () => {
    const snapshot = await getDoc(doc(dbService, 'Words', id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    setWord(data);
    console.log(data);
  };

  useEffect(() => {
    getWord();
  }, []);

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

  // 누르면 isEdit이 true/false로 변경됨
  const setEdit = async () => {
    await updateDoc(doc(dbService, 'Words', id), {
      isEdit: !word.isEdit,
    });
    getWord();
  };

  const delPost = async () => {
    console.log('id', id);
    Alert.alert('삭제', '정말로 삭제하시겠습니까??', [
      { text: 'cancel', style: 'destructive' },
      {
        text: 'OK, Delete it.',
        onPress: async () => {
          try {
            await deleteDoc(doc(dbService, 'Words', id));
            navigation.reset({
              index: 0,
              routes: [{ name: 'Tabs', params: { screen: 'Home' } }],
            });
          } catch (err) {
            console.log('err:', err);
          }
        },
      },
    ]);
  };

  // 추천기능
  const countCheck = word?.counter.includes(uid);

  const counter = async () => {
    // 추천을 한적이 있을 때 클릭 시 추천취소
    if (countCheck) {
      await updateDoc(doc(dbService, 'Words', id), {
        counter: word.counter.filter((prev) => prev !== uid),
      });

      console.log();
      getWord();
      // 추천을 한적이 없을 때 클릭 시 추천추가
    } else {
      await updateDoc(doc(dbService, 'Words', id), {
        counter: [...word.counter, uid],
      });
      getWord();
    }
  };

  // reset 사용해서 변경된 상세페이지로 가게끔 해야함.  reset을 안쓰면 뒤로기가 되는데 그러면 이상해짐
  return (
    <KeyboardAwareScrollView>
      <StatusBar />
      <View key={id}>
        <HeaderContainer>
          <NickName>
            글쓴이 [ <NickNameText>{word?.nickname}</NickNameText> ]
          </NickName>
          <CounterBox>
            <TouchableOpacity onPress={() => counter()}>
              {/* 추천 */}
              {!countCheck ? (
                <AntDesign name="like2" size={24} color="black" />
              ) : (
                <AntDesign name="like1" size={24} color="black" />
              )}
            </TouchableOpacity>
            <Counter> {word?.counter.length}</Counter>
          </CounterBox>
        </HeaderContainer>

        <Section>
          <Title>단어</Title>
          <TextBox>
            <Text>{word?.word}</Text>
          </TextBox>
        </Section>
        <Section>
          <Title>의미</Title>
          <TextBox>
            <Text>{word?.mean}</Text>
          </TextBox>
        </Section>
        <Section>
          <Title>TMI</Title>
          <TextBox>
            <Text>{word?.tmi}</Text>
          </TextBox>
        </Section>
        <ButtonBox>
          {/* 로그인한 uid와 글의 uid가 동일해야지만 수정,삭제버튼이 보임 */}
          {uid === word?.userid ? (
            <>
              <Btn
                onPress={
                  (setEdit,
                  () => {
                    navigate('Stacks', {
                      screen: 'Edit',
                      params: { id: id },
                    });
                  })
                }
              >
                <BtTitle>수정</BtTitle>
              </Btn>
              <Btn onPress={() => delPost(word?.id)}>
                <BtTitle>삭제</BtTitle>
              </Btn>
            </>
          ) : (
            ''
          )}
        </ButtonBox>
      </View>
    </KeyboardAwareScrollView>
  );
}
const Counter = styled.Text`
  font-size: 20px;
`;
const CounterBox = styled.View`
  margin: 20px;
  margin-bottom: 0;
  flex-direction: row;
  align-items: center;
`;
const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
  margin-bottom: 0;
  margin-top: 0;
`;
const NickName = styled.Text`
  text-align: center;
  margin: 20px;
  margin-bottom: 0;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 2px 2px 1px grey;
`;
const NickNameText = styled.Text`
  text-align: center;
  margin: 20px;
  font-size: 20px;
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

const BtTitle = styled.Text`
  color: ${(props) => props.theme.title};
`;
