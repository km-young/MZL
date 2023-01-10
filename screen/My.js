import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
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
  where,
} from 'firebase/firestore';
import { auth, dbService } from '../firebase';
import styled from '@emotion/native';
import { BLUE_COLOR, YELLOW_COLOR } from '../common/colors';

export default function My({ navigation: { navigate, reset } }) {
  const [words, setWords] = useState([]);
  const displayName = auth.currentUser?.displayName;
  const uid = auth.currentUser?.uid;

  //   useFocusEffect(
  //     useCallback(() => {
  //       const q = query(
  //         collection(dbService, 'Words'),
  //         orderBy('createdAt', 'desc'),
  //         where('userid', '==', auth.currentUser?.uid ?? ''),
  //       );
  //       const myWords = onSnapshot(q, (snapshot) => {
  //         const newWords = snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         setWords(newWords);
  //       });
  //       return myWords;
  //     }, []),
  //   );

  useEffect(() => {
    const q = query(
      collection(dbService, 'Words'),
      orderBy('createdAt', 'desc'),
      where('userid', '==', uid ?? ''),
    );

    const myWords = onSnapshot(q, (snapshot) => {
      const newWords = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWords(newWords);
    });
    return myWords;
  }, []);

  console.log('auth', auth.currentUser?.uid);

  return (
    <Container>
      <UserColumn>
        {/* API 불러오기 */}
        <UserProfile>
          <UserNickname>{displayName}</UserNickname>
          <UserEditBtn>
            <UerEditBtnText>수정</UerEditBtnText>
          </UserEditBtn>
        </UserProfile>
        <LogoutBtn>
          <LogoutBtnText>LOGOUT</LogoutBtnText>
        </LogoutBtn>
      </UserColumn>
      <Title>My Words</Title>
      <MyWordsColumn>
        {words.map((item) => {
          return (
            <View key={item.id}>
              <Text>{item.word}</Text>
            </View>
          );
        })}
      </MyWordsColumn>
    </Container>
  );
}

// Css
const Container = styled.View`
  padding: 30px;
`;
const UserColumn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const UserProfile = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserNickname = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;
const UserEditBtn = styled.TouchableOpacity`
  padding: 5px;
  background-color: ${BLUE_COLOR};
`;
const UerEditBtnText = styled.Text`
  font-size: 16px;
`;
const LogoutBtn = styled.TouchableOpacity``;
const LogoutBtnText = styled.Text`
  color: red;
`;
const MyWordsColumn = styled.ScrollView``;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 30px 0 10px;
`;
