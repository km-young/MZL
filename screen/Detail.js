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
  const [mean, setMean] = useState('');
  const [word, setWord] = useState({});
  const [tmi, setTmi] = useState('');

  const [editMean, SetEditMean] = useState('');
  const [editWord, SetEditWord] = useState('');
  const [editTmi, SetEditTmi] = useState('');

  console.log(word);
  // get해오는부분
  useEffect(() => {
    // const q = query(
    //   collection(dbService, 'Words'),
    //   orderBy('createdAt', 'desc'), // 해당 collection 내의 docs들을 createdAt 속성을 내림차순 기준으로
    // );
    const getWord = async () => {
      const snapshot = await getDoc(doc(dbService, 'Words', postId));
      const data = snapshot.data(); // 가져온 doc의 객체 내용
      const postID = snapshot.id; // 가져온 doc의 id
      setWord(data);
      console.log(snapshot.data());
    };
    getWord();
  }, []);

  // onSnapshot(q, (snapshot) => {
  //   // q (쿼리)안에 담긴 collection 내의 변화가 생길 때 마다 매번 실행됨
  //   const newPosts = snapshot.docs.map((doc) => {
  //     const newPost = {
  //       id: doc.id,
  //       ...doc.data(), // doc.data() : { text, createdAt, ...  }
  //     };
  //     return newPost;
  //   });
  //   setPosts(newPosts);
  //   console.log(newPosts)
  // });

  // 단일데이터를 가지고와야함.

  //   const getCategory = async () => {
  //     const snapshot = await getDoc(
  //       doc(dbService, 'Category', 'currentCategory'),
  //     );
  //   };
  //   getCategory();
  // }, []);


  // 현재 수정,완료 버튼을 누르게 되면 데이터 isEdit은 바뀌지만 화면 렌더링이 늦어지고 있음.
  // 월요일 확인하여 수정예정.. 이유는 모르겠음..비동기적인 문제인가?
  
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