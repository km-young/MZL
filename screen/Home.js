import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import styled from '@emotion/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from '../firebase';
import { PINK_COLOR, GREEN_COLOR, YELLOW_COLOR } from '../common/colors';

export default function Home() {
  const { navigate } = useNavigation();
  const [word, setWord] = useState([]);
  const [category, setCategory] = useState('');
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
              <ButtonText>{item}</ButtonText>
            </CategoryButton>
          ))}
        </CategoryContainer>
        <ScrollView>
          {/* //data */}
          <CardListContainer>
            <CardContainer>
              {category
                ? filteredWord.map((item) => {
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
                  })
                : word.map((item) => {
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
