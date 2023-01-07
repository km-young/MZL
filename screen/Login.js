import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Text } from 'react-native';
import { async } from '@firebase/util';

export default function Login() {
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertText, setAlertText] = useState('');
  console.log('🚀', email, password);

  // 비어있는 inputText focus 지정
  const focusEmail = useRef();
  const focusPw = useRef();

  const alertTextTimer = (message) => {
    setAlertText(message);
    setTimeout(() => setAlertText(''), 3000);
  };

  // LOGIN API
  const onSubmitLogin = () => {
    // 유효성 검사 진행
    if (!email) {
      focusEmail.current.focus();
      alertTextTimer('이메일을 입력해 주세요');
      return;
    } else if (email.indexOf('@') == -1) {
      alertTextTimer('이메일 형식이 아닙니다.');
      focusEmail.current.focus();
    } else if (!password) {
      alertTextTimer('비밀번호를 입력해 주세요');
      focusPw.current.focus();
      return;
    } else if (password.length < 6) {
      alertTextTimer('비밀번호는 6자리 이상 입력해주세요!');
      focusPw.current.focus();
      return;
    }

    // Firebase : authentication API
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('Stacks', { screen: 'Home', params: { test: 'test' } });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorMessage:', errorMessage);
        if (errorMessage.includes('user-not-found')) {
          alertTextTimer('가입되지 않은 회원입니다.');
          return;
        } else if (errorMessage.includes('wrong-password')) {
          alertTextTimer('비밀번호가 올바르지 않습니다.');
        }
      });
  };

  return (
    <ContainerView>
      <StatusBar />
      <AuthLoginContainerView>
        <TitleText>회원 로그인</TitleText>
        <Text style={{ color: 'red', height: 20 }}>{alertText}</Text>
        <IDInput
          value={email}
          onChangeText={setEmail}
          placeholder="E-MAIL"
          ref={focusEmail}
          onSubmitEditing={() => focusPw.current.focus()}
        />
        <PWInput
          value={password}
          onChangeText={setPassword}
          placeholder="PW"
          ref={focusPw}
          onSubmitEditing={() => onSubmitLogin()}
        />
        <Buttons>
          <ButtonsText onPress={() => onSubmitLogin()}>LOGIN</ButtonsText>
        </Buttons>
        <Buttons
          onPress={() =>
            navigate('Stacks', { screen: 'Register', params: { test: 'test' } })
          }
        >
          <ButtonsText>REGISTER</ButtonsText>
        </Buttons>
      </AuthLoginContainerView>
    </ContainerView>
  );
}

const ContainerView = styled.View`
  background-color: white;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const AuthLoginContainerView = styled.View`
  width: 340px;
  height: 340px;
  background-color: #c7f5dd;
  box-shadow: 1px 4px 4px #808080;
  justify-content: center;
  align-items: center;
`;
const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 10px;
`;
const IDInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: #808080;
  width: 250px;
  height: 50px;
`;

const PWInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: #808080;
  width: 250px;
  height: 50px;
`;

const Buttons = styled.TouchableOpacity`
  height: 20px;
  width: 100px;
  text-align: center;
  margin-top: 30px;
`;

const ButtonsText = styled.Text`
  text-align: center;
  height: 20px;
  line-height: 20px;
`;
