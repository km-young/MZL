import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import styled from '@emotion/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { dbService,auth } from '../firebase';
import { PINK_COLOR, GREEN_COLOR, YELLOW_COLOR } from '../common/colors';

import { AntDesign } from '@expo/vector-icons';
import { FlatList,Text, TouchableOpacity } from 'react-native';


export default function Home({ navigation }) {
  const { navigate } = useNavigation();
  const [word, setWord] = useState([]);
  const [category, setCategory] = useState('');
  const [categoryList] = useState(['korean', 'english', 'chinese']);

  const uid = auth.currentUser?.uid;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log('HELLO HOME');
    }
  }, [isFocused]);


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

      navigation.setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Tabs', params: { screen: 'Home' } }],
                })
              }
            >
              <HomeText>전체보기</HomeText>
            </TouchableOpacity>
          );
        },
      });
    });

    // console.log(auth.currentUser ? '로그인 상태' : '로그아웃 상태');
  }, []);
  
  const filteredWord = word?.filter((item) => item.category === category);
  return (
    <>
      <HomeContainer>
        {/* //header // list header component */}
        <CategoryContainer>
          {categoryList.map((item) => (
            <CategoryButton
              key={item}
              onPress={() => {
                setCategory(item);
              }}
            >
              <ButtonText item={item} category={category}>
                {item}
              </ButtonText>
            </CategoryButton>
          ))}
        </CategoryContainer>
        <CardListContainer>
          <CardContainer>
            {category ? (
              <FlatList
                data={filteredWord}
                renderItem={({ item }) => {
                  return (
                    <CardList
                      category={category}
                      onPress={() => {
                        navigate('Stacks', {
                          screen: 'Detail',
                          params: { id: item.id },
                        });
                      }}
                    >
                      <TextBox>{item.word}</TextBox>
                      <CardBorder category={category}></CardBorder>
                    </CardList>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <FlatList
                data={word}
                renderItem={({ item }) => {
                  return (
                    <CardList
                      category={item.category}
                      onPress={() => {
                        navigate('Stacks', {
                          screen: 'Detail',
                          params: { id: item.id },
                        });
                      }}
                    >
                      <Likecontainer>
                        <TextBox>{item.word}</TextBox>
                        <Likenum>
                          <AntDesign name="like2" size={20} color="black" />
                          {item.likingUser.length}
                        </Likenum>
                      </Likecontainer>
                      <CardBorder category={item.category}></CardBorder>
                    </CardList>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            )}
          </CardContainer>
        </CardListContainer>
      </HomeContainer>
    </>
  );
}

const Likecontainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 10px;
  width: 350px;
  height: 70px;
  position: absolute;
`;
const Likenum = styled.Text`
  font-size: 15px;
  font-weight: bold;
`
const HomeContainer = styled.View`
  flex: 1;
`;
const HomeText = styled.Text`
  color: ${(props) => props.theme.title};
  padding-right: 10px;
`;
const ButtonText = styled.Text`
  font-weight: 600;
  color: ${(props) =>
    props.item === props.category ? 'lightcoral' : props.theme.title};
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
  background-color: ${(props) => {
    return props.category === 'korean'
      ? PINK_COLOR
      : props.category === 'english'
      ? GREEN_COLOR
      : props.category === 'chinese'
      ? YELLOW_COLOR
      : 'transparent';
  }};
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
  border: 1px solid;
  border-color: ${(props) => {
    return props.category === 'korean'
      ? '#F2AEB4'
      : props.category === 'english'
      ? '#46D989'
      : props.category === 'chinese'
      ? '#FFC818'
      : 'transparent';
  }};
  top: 10px;
  left: 10px;
`;
