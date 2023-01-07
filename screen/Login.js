import React from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const { navigate } = useNavigation();
  return (
    <ContainerView>
      <StatusBar />
      <AuthLoginContainerView>
        <IDInput placeholder="E-MAIL" />
        <PWInput placeholder="PW" />
        <Buttons>
          <ButtonsText>LOGIN</ButtonsText>
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
