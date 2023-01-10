import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, dbService } from '../firebase';

import { PINK_COLOR } from '../common/colors';

export default function Home({ postId }) {
  const { navigate } = useNavigation();
  const [text, setText] = useState('');
  const [word, setWord] = useState([]);
  const [category, setCategory] = useState([
    { label: 'korean', value: 'korean' },
    { label: 'english', value: 'english' },
    { label: 'chinese', value: 'chinese' },
  ]);

  const [categoryList] = useState(['korean', 'english', 'chinese']);

  useEffect(() => {
    const q = query(
      collection(dbService, 'Words'),
      orderBy('createdAt', 'desc'),
    );

    onSnapshot(q, (snapshot) => {
      const newWords = snapshot.docs.map((doc) => {
        const newWord = {
          id: doc.id,
          ...doc.data(),
        };

        return newWord;
      });

      setWord(newWords);
    });

    console.log(
      auth.currentUser
        ? ('로그인 상태', auth.currentUser.displayName)
        : '로그아웃 상태',
    );
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigate('Stacks', {
            screen: 'Detail',
            params: { postId: 'V9JbfFhrS6pdmORAmXqW' },
          })
        }
      >
        <Text>홈 페이지</Text>
      </TouchableOpacity>
      <HomeContainer>
        <CategoryContainer>
          {categoryList.map((item) => (
            <CategoryButton
              key={item}
              onPress={() => {
                setCategory(item);
              }}
            >
              <ButtonText>{item}</ButtonText>
            </CategoryButton>
          ))}
        </CategoryContainer>
        <ScrollView>
          <CardListContainer>
            <CardContainer>
              {word.map((item) => {
                if (item.category === category) {
                  return (
                    <CardList key={item.id}>
                      <TextBox>{item.mean}</TextBox>
                      <CardBorder></CardBorder>
                    </CardList>
                  );
                }
              })}
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
const ButtonText = styled.Text`
  font-weight: 600;
`;
const CategoryContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 0px;
`;
const CategoryButton = styled.TouchableOpacity`
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
  background-color: ${PINK_COLOR};
  box-shadow: 2px 2px 2px #555;
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 10px;
  padding-left: 15px;
  width: 350px;
  height: 70px;
  margin: 10px;
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
