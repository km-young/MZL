import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Alert, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login({ navigation: { navigate, reset } }) {
  // const { navigate } = useNavigation();

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

  const textConfirm = () => {
    if (!email) {
      focusEmail.current.focus();
      alertTextTimer('이메일을 입력해 주세요');
      return true;
    } else if (email.indexOf('@') == -1) {
      alertTextTimer('이메일 형식이 아닙니다.');
      focusEmail.current.focus();
      return true;
    } else if (!password) {
      alertTextTimer('비밀번호를 입력해 주세요');
      focusPw.current.focus();
      return true;
    } else if (password.length < 6) {
      alertTextTimer('비밀번호는 6자리 이상 입력해주세요!');
      focusPw.current.focus();
      return true;
    }
  };

  // LOGIN API
  const onSubmitLogin = () => {
    // 유효성 검사 진행
    if (textConfirm()) {
      return;
    }
    // Firebase : authentication API
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('🎉로그인 성공', `${user.displayName}님 환영합니다`, [
          {
            text: 'OK',
            onPress: () =>
              reset({
                index: 0,
                routes: [{ name: 'Tabs', params: { screen: 'Home' } }],
              }),
          },
        ]);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorMessage:', errorCode, errorMessage);
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
      <KeyboardAwareScrollView
        style={{ paddingHorizontal: 30 }}
        extraScrollHeight={150}
      >
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
            // autoComplete="password"
            // textContentType="password"
            // secureTextEntry={true}
          />
          <Buttons>
            <ButtonsText onPress={() => onSubmitLogin()}>LOGIN</ButtonsText>
          </Buttons>
          <Buttons onPress={() => navigate('Stacks', { screen: 'Register' })}>
            <ButtonsText>REGISTER</ButtonsText>
          </Buttons>
        </AuthLoginContainerView>
      </KeyboardAwareScrollView>
    </ContainerView>
  );
}

const ContainerView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const AuthLoginContainerView = styled.View`
  width: 340px;
  background-color: #c7f5dd;
  box-shadow: 1px 4px 4px #808080;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
  padding: 10%;
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
