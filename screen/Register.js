import React, { useState, useRef } from 'react';
import styled from '@emotion/native';
import { Alert, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function Register({ navigation: { navigate, reset } }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [alertText, setAlertText] = useState('');

  // 비어있는 inputText focus 지정
  const focusName = useRef();
  const focusEmail = useRef();
  const focusPw = useRef();
  const focusPwCheck = useRef();

  // const auth = authService();

  console.log(displayName, email, password);

  const alertTextTimer = (message) => {
    setAlertText(message);
    setTimeout(() => setAlertText(''), 3000);
  };

  const onSubmitRegister = async () => {
    // 유효성 검사 진행
    if (!displayName) {
      alertTextTimer('닉네임을 입력해 주세요');
      focusName.current.focus();
      return;
    } else if (!email) {
      alertTextTimer('이메일을 입력해 주세요');
      focusEmail.current.focus();
      return;
    } else if (email.indexOf('@') == -1) {
      alertTextTimer('이메일 형식이 아닙니다.');
      focusEmail.current.focus();
    } else if (!password) {
      alertTextTimer('비밀번호를 입력해 주세요');
      focusPw.current.focus();
      return;
    } else if (!passwordCheck) {
      alertTextTimer('비밀번호 재입력 입력해 주세요');
      focusPwCheck.current.focus();
      return;
    } else if (password.length < 6) {
      alertTextTimer('비밀번호는 6자리 이상 입력해주세요!');
      focusPw.current.focus();
    } else if (password !== passwordCheck) {
      alertTextTimer('비밀번호를 다시 확인해 주세요');
      focusPwCheck.current.focus();
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log('🚀 userCredential', userCredential);
        // Signed in
        const user = userCredential.user;
        // 닉네임 추가
        await updateProfile(auth.currentUser, {
          displayName,
        })
          .then(() => {
            console.log('🚀 Profile updated!', userCredential);
            reset({
              index: 0,
              routes: [
                {
                  name: 'Tabs',
                  params: {
                    screen: 'Home',
                  },
                },
              ],
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert('🚨: update profile error', errorCode, errorMessage);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes('email-already-in-use')) {
          alertTextTimer('🚨', '이미 가입된 이메일입니다.');
          focusEmail.current.focus();
          return;
        }
        Alert.alert('🚨', errorCode, errorMessage);
      });
  };
  return (
    <ContainerView>
      <KeyboardAwareScrollView
        extraScrollHeight={150}
        // keyboardShouldPersistTaps="always"
        style={{ paddingHorizontal: 30 }}
      >
        <AuthRegisterContainerView>
          <Text style={{ color: 'red', height: 20 }}>{alertText}</Text>
          <View>
            <TitleText>닉네임</TitleText>
            <InputBox
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="User Name"
              ref={focusName}
            />
          </View>

          <View>
            <TitleText>이메일</TitleText>
            <InputBox
              value={email}
              onChangeText={setEmail}
              placeholder="예)id@domain.com"
              ref={focusEmail}
            />
          </View>

          <View>
            <TitleText>비밀번호</TitleText>
            <InputBox
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              ref={focusPw}
              // 배포시 활성화
              // autoComplete="password"
              // textContentType="password"
              // secureTextEntry={true}
            />
            <InputBox
              value={passwordCheck}
              onChangeText={setPasswordCheck}
              placeholder="Password check"
              ref={focusPwCheck}
              // 배포시 활성화
              // autoComplete="password"
              // textContentType="password"
              // secureTextEntry={true}
            />
          </View>

          <Buttons onPress={() => onSubmitRegister()}>
            <ButtonsText>회원가입</ButtonsText>
          </Buttons>
        </AuthRegisterContainerView>
      </KeyboardAwareScrollView>
    </ContainerView>
  );
}

const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const AuthRegisterContainerView = styled.View`
  flex: 1;
  width: 340px;
  background-color: #c7f5dd;
  box-shadow: 1px 4px 4px #808080;
  margin-top: 30%;
  padding: 10%;
  padding-bottom: 20%;
`;
const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 10px;
`;
const InputBox = styled.TextInput`
  padding: 5px;
  margin: 5px 0;
  border-bottom-width: 1px;
  border-color: #808080;
`;

const Buttons = styled.TouchableOpacity`
  height: 20px;
  text-align: center;
  margin-top: 30px;
`;

const ButtonsText = styled.Text`
  text-align: center;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  margin: 0 30%;
  border: 1px solid goldenrod;
`;
