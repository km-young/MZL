import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  where,
} from 'firebase/firestore';
import { auth, dbService } from '../firebase';
import { updateProfile } from 'firebase/auth';
import styled from '@emotion/native';
import {
  PINK_COLOR,
  BLUE_COLOR,
  YELLOW_COLOR,
  GREEN_COLOR,
} from '../common/colors';

export default function My({ navigation: { navigate, reset } }) {
  const displayName = auth.currentUser?.displayName;
  const uid = auth.currentUser?.uid;

  const [words, setWords] = useState([]);
  const [onEdit, setEdit] = useState(false);
  const [editText, setEditText] = useState(displayName);

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
      console.log(uid);
      const q = query(
        collection(dbService, 'Words'),
        orderBy('createdAt', 'desc'),
        where('userid', '==', uid),
      );
      const myPosts = onSnapshot(q, (post) => {
        const myPost = post.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWords(myPost);
      });
      console.log('data', words);
      return myPosts;
    }, []),
  );

  const onPressUpdate = () => {
    /* 수정 버튼 */
    setEdit(!onEdit);
  };

  const onSubmitEdit = async () => {
    /* (수정)완료 버튼 */
    await updateProfile(auth.currentUser, {
      displayName: editText,
    });
    setEdit(!onEdit);
  };

  const onPressLogout = () => {
    /* 로그아웃 버튼 */
    auth.signOut();
    // Home 화면으로 이동
    reset({
      index: 0,
      routes: [{ name: 'Tabs', params: { screen: 'Home' } }],
    });
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
            <CardList
              style={{
                backgroundColor:
                  item.category === 'korean'
                    ? PINK_COLOR
                    : item.category === 'english'
                    ? GREEN_COLOR
                    : item.category === 'chinese'
                    ? YELLOW_COLOR
                    : 'transparent',
              }}
              key={item.id}
              onPress={() => {
                navigate('Stacks', {
                  screen: 'Detail',
                  params: { id: item.id },
                });
              }}
            >
              <TextBox>{item.mean}</TextBox>
              <CardBorder
                style={{
                  borderColor:
                    item.category === 'korean'
                      ? '#F2AEB4'
                      : item.category === 'english'
                      ? '#46D989'
                      : item.category === 'chinese'
                      ? '#FFC818'
                      : 'transparent',
                }}
              ></CardBorder>
            </CardList>
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

const TextBox = styled.Text`
  font-size: 25px;
  font-weight: 800;
`;

const CardList = styled.TouchableOpacity`
  position: relative;
  background-color: ${PINK_COLOR};
  box-shadow: 2px 2px 2px #555;
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 10px;
  padding-left: 15px;
  width: 330px;
  height: 70px;
  margin: 10px;
`;
const CardBorder = styled.View`
  position: absolute;
  width: 330px;
  height: 70px;
  border: 1px solid #f2aeb4;
  top: 10px;
  left: 10px;
`;
