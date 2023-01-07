import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';

export default function Home() {
  const { navigate } = useNavigation();
  return (
    <>
    <TouchableOpacity
      onPress={() =>
        navigate('Stacks', { screen: 'Detail', params: { test: 'test' } })
      }
    >
      <Text>홈 페이지</Text>
    </TouchableOpacity>
    <HomeContainer>
      <CategoryContainer>
        <Categorybutton>
          <Text>KOREAN</Text>
        </Categorybutton>
        <Categorybutton>
          <Text>ENGLISH</Text>
        </Categorybutton>
        <Categorybutton>
          <Text>CHINESE</Text>
        </Categorybutton>
      </CategoryContainer>
      <ScrollView>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
        <CardListContainer style={{ height: '100%', padding: 20 }}>
          <CardContainer>
            <CardList>
              <TextBox>갑분싸</TextBox>
              <CardBorder></CardBorder>
            </CardList>
          </CardContainer>
        </CardListContainer>
      </ScrollView>
    </HomeContainer>
  </>
  );
}
const HomeContainer = styled.View`
  flex: 1;
`;
const CategoryContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 0px;
`;
const Categorybutton = styled.TouchableOpacity`
  margin: 10px 40px 10px 40px;
`;

const ScrollView = styled.ScrollView``;

const CardListContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TextBox = styled.Text`
  font-size: 25px;
  font-weight: 800;
`;

const CardList = styled.TouchableOpacity`
  position: relative;
  background-color: #ffebec;
  box-shadow: 2px 2px 2px #555;
  align-items: flex-start;
  justify-content: flex-end;
  stroke: 1px solid #f2aeb4;
  padding: 15px;
  width: 350px;
  height: 70px;
`;
const CardContainer = styled.View``;
const CardBorder = styled.View`
  position: absolute;
  width: 350px;
  height: 70px;
  border: 1px solid #f2aeb4;
  top: 10px;
  left: 10px;
`;
