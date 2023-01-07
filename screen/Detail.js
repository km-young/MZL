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
import Edit from '../components/Edit';

export default function Detail() {
  const [category, setCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [mean, setMean] = useState('');
  const [word, setWord] = useState('');
  const [tmi, setTmi] = useState('');

  const [editMean, SetEditMean] = useState('');
  const [editWord, SetEditWord] = useState('');
  const [editTmi, SetEditTmi] = useState('');

  // get해오는부분
  useEffect(() => {
    const q = query(
      collection(dbService, 'Words'),
      orderBy('createdAt', 'desc'), // 해당 collection 내의 docs들을 createdAt 속성을 내림차순 기준으로
    );

    onSnapshot(q, (snapshot) => {
      // q (쿼리)안에 담긴 collection 내의 변화가 생길 때 마다 매번 실행됨
      const newPosts = snapshot.docs.map((doc) => {
        const newPost = {
          id: doc.id,
          ...doc.data(), // doc.data() : { text, createdAt, ...  }
        };
        return newPost;
      });
      setPosts(newPosts);
    });

    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, 'Category', 'currentCategory'),
      );
    };
    getCategory();
  }, []);

  // 누르면 isEdit이 true/false로 변경됨
  const setEdit = async (id) => {
    const idx = posts.findIndex((post) => post.id === id);
    await updateDoc(doc(dbService, 'Words', id), {
      isEdit: !posts[idx].isEdit,
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
      {/* 이슈1 - if문이나 filter로 id에 해당하는 post만 띄우기, route.params로 해결 가능할 것 같아 강의 복습 예정..-미영- */}
      {/* 이슈2 - 새로고침 후 수정버튼 누르고 > 아무것도 수정 안하고 등록하면 input이 빈 value로 인식함. 어디서 배웠었는데 기억이안남; -미영- */}
      {posts.map((post) => {
        return (
          <View key={post.id}>
            {/* isEdit이 true이면 input으로 */}
            {post.isEdit ? (
              <Edit
                SetEditWord={SetEditWord}
                SetEditTmi={SetEditTmi}
                SetEditMean={SetEditMean}
                post={post}
                editPost={editPost}
                setEdit={setEdit}
              />
            ) : (
              // isEdit이 false이면 Text로..지영님이 수정할 곳..
              <>
                <Section>
                  <Title>단어</Title>
                  <TextBox>
                    <Text>{post.word}</Text>
                  </TextBox>
                </Section>
                <Section>
                  <Title>의미</Title>

                  <TextBox>
                    <Text>{post.mean}</Text>
                  </TextBox>
                </Section>
                <Section>
                  <Title>TMI</Title>
                  <TextBox>
                    <Text>{post.tmi}</Text>
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
              </>
            )}
          </View>
        );
      })}
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

