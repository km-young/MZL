import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
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
import { updateProfile } from 'firebase/auth';

export default function My({ navigation: { navigate, reset } }) {
  const displayName = auth.currentUser.displayName;

  const [words, setWords] = useState([]);
  const [onEdit, setEdit] = useState(false);
  const [editText, setEditText] = useState(displayName);

  console.log(editText);
  // const uid = auth.currentUser?.uid;

  useFocusEffect(
    useCallback(() => {
      if (!auth.currentUser) {
        reset({
          index: 1,
          routes: [
            { name: 'Tabs', params: { screen: 'Home' } },
            { name: 'Stacks', params: { screen: 'Login' } },
          ],
        });
      }
    }, []),
  );

  // useEffect(() => {
  //   const q = query(
  //     collection(dbService, 'Words'),
  //     orderBy('createdAt', 'desc'),
  //     where('userid', '==', uid ?? ''),
  //   );

  //   const myWords = onSnapshot(q, (snapshot) => {
  //     const newWords = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setWords(newWords);
  //   });
  //   return myWords;
  // }, []);

  // console.log('auth', auth.currentUser?.uid);
  const onPressUpdate = () => {
    setEdit(!onEdit);
    console.log('수정버튼', onEdit);
  };
  const onSubmitEdit = async () => {
    console.log('submit 완료');
    await updateProfile(auth.currentUser, {
      displayName: editText,
    });
    setEdit(!onEdit);
  };
  const onPressLogout = () => {
    console.log('로그아웃');
  };

  return (
    <Container>
      <UserColumn>
        {/* API 불러오기 */}
        <UserProfile>
          {onEdit ? (
            <UserNicknameInput
              value={editText}
              onChangeText={setEditText}
            ></UserNicknameInput>
          ) : (
            <UserNickname>{displayName}</UserNickname>
          )}
          {onEdit ? (
            <UserSuccessBtn onPress={() => onSubmitEdit()}>
              <UerEditBtnText>완료</UerEditBtnText>
            </UserSuccessBtn>
          ) : (
            <UserEditBtn onPress={() => onPressUpdate()}>
              <UerEditBtnText>수정</UerEditBtnText>
            </UserEditBtn>
          )}
        </UserProfile>
        <LogoutBtn onPress={() => onPressLogout()}>
          <LogoutBtnText>LOGOUT</LogoutBtnText>
        </LogoutBtn>
      </UserColumn>
      <Title>My Words</Title>
      <MyWordsColumn>
        {words.map((item) => {
          return (
            <View key={item.id} style={{ backgroundColor: 'red' }}>
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
  padding: 1% 5%;
`;
const UserNicknameInput = styled.TextInput`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  padding: 1% 5%;
  background-color: white;
  border-bottom: 5px solid #000;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const UserSuccessBtn = styled.TouchableOpacity`
  padding: 5px;
  background-color: ${YELLOW_COLOR};
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
