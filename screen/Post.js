import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BLUE_COLOR } from '../common/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { auth, dbService } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Post({ navigation: { navigate, reset, setOptions } }) {
  // DropDownPicker에 필요한 state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [category, setCategory] = useState([
    { label: 'Korean', value: 'korean' },
    { label: 'English', value: 'english' },
    { label: 'Chinese', value: 'chinese' },
  ]);
  // 각 인풋에 들어갈 state
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');
  const [tmi, setTmi] = useState('');

  // 새로고침 state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 새로고침 시에 인풋창 비우기
  const onRefresh = async () => {
    setIsRefreshing(true);
    setWord('');
    setMean('');
    setTmi('');
    setValue(null);
    setIsRefreshing(false);
  };

  const uid = auth.currentUser?.uid;
  const displayName = auth.currentUser?.displayName;

  const newWord = {
    word,
    mean,
    tmi,
    category: value,
    // auth기능 구현 되면 아래 userid사용
    // userid: '',
    userid: uid,
    isEdit: false,
    createdAt: Date.now(),
    nickname: displayName,
    counter: [],
  };

  const focusWord = useRef();
  const focusMean = useRef();
  const focusTmi = useRef();

  const addWord = async () => {
    // 공백이 있을 때 경고창 띄우기
    if (!word.trim() || word === null) {
      Alert.alert('등록 불가', '공백이 있습니다!', [
        {
          text: 'OK',
          onPress: () => focusWord.current.focus(),
        },
      ]);
    } else if (!mean.trim() || mean === null) {
      Alert.alert('등록 불가', '공백이 있습니다!', [
        {
          text: 'OK',
          onPress: () => focusMean.current.focus(),
        },
      ]);
    } else if (!value || value === null) {
      Alert.alert('등록 불가', '카테고리를 선택해주새요!');
    } else {
      await addDoc(collection(dbService, 'Words'), newWord);

      setWord('');
      setMean('');
      setTmi('');
      setValue(null);

      navigate('Tabs', { screen: 'Home' });
    }
  };

  const DATA = [];

  // 다른 탭으로 이동했을 때 인풋창 비우기
  useFocusEffect(
    useCallback(() => {
      // 비로그인 상태에서 Post 접근 시 로그인 화면으로 이동
      if (!auth.currentUser) {
        Alert.alert('로그인이 필요합니다.', '로그인 페이지로 이동합니다', [
          {
            text: 'OK',
            style: 'default',
            onPress: () =>
              reset({
                index: 1,
                routes: [
                  { name: 'Tabs', params: { screen: 'Home' } },
                  {
                    name: 'Stacks',
                    params: {
                      screen: 'Login',
                    },
                  },
                ],
              }),
          },
        ]);
      }
      return () => {
        setWord('');
        setMean('');
        setTmi('');
        setValue(null);
      };
    }, []),
  );

  return (
    <Container>
      {/* 스크롤 방향이 같은 것이 두개이상으로 겹치고 있으면 오류메세지가 발생하여 flatlist로 감쌌음 */}
      <FlatList
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <KeyboardAwareScrollView extraScrollHeight={120}>
            <InputBox style={{ zIndex: 1 }}>
              <InputLabel>CATEGORY</InputLabel>
              <DropDownPicker
                open={open}
                value={value}
                items={category}
                setOpen={setOpen}
                setValue={setValue}
                setItems={() => setCategory}
                placeholder="Select Category"
                zIndex={9000}
              />
            </InputBox>
            <InputBox>
              <InputLabel>단어</InputLabel>
              <Input
                ref={focusWord}
                value={word}
                onChangeText={(text) => setWord(text)}
              />
            </InputBox>
            <InputBox>
              <InputLabel>의미</InputLabel>
              <Input
                ref={focusMean}
                style={{ height: 120 }}
                textAlignVertical="top"
                multiline={true}
                value={mean}
                onChangeText={(text) => setMean(text)}
              />
            </InputBox>
            <InputBox>
              <InputLabel>TMI</InputLabel>
              <Input
                ref={focusTmi}
                style={{ height: 120 }}
                textAlignVertical="top"
                multiline={true}
                value={tmi}
                onChangeText={(text) => setTmi(text)}
              />
            </InputBox>
            <SubmitButton onPress={addWord}>
              <SBtnText>등록</SBtnText>
            </SubmitButton>
          </KeyboardAwareScrollView>
        }
        data={DATA}
        renderItem={({ item }) => item}
      />
    </Container>
  );
}

// css
const Container = styled.View`
  padding: 30px;
  flex: 1;
`;
const InputBox = styled.View`
  margin-bottom: 20px;
`;
const InputLabel = styled.Text`
  color: ${(props) => props.theme.title};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
`;
const Input = styled.TextInput`
  background-color: white;
  flex: 1;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 5px;
  height: 50px;
  background-color: ${BLUE_COLOR};
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const SubmitButton = styled.TouchableOpacity`
  align-self: center;
`;
const SBtnText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.title};
`;
