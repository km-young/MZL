import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from '../firebase';

export default function Home({ postId }) {
  const { navigate } = useNavigation();
  const [text, setText] = useState('');
  const [word, setWord] = useState([]);
  const [category, setCategory] = useState([
    { label: 'Korean', value: 'korean' },
    { label: 'English', value: 'english' },
    { label: 'Chinese', value: 'chinese' },
  ]);
  const [value, setValue] = useState(null);
  const [mean, setMean] = useState('');
  const [tmi, setTmi] = useState('');

  const newWord = {
    word,
    mean,
    tmi,
    category: value,
    userid: '',
    isEdit: false,
    createdAt: Date.now(),
  };

  useEffect(() => {
    const q = query(
      collection(dbService, 'Words'),
      orderBy('createdAt', 'desc'),
    );

    onSnapshot(q, (snapshot) => {
      const newWord = snapshot.docs.map((doc) => {
        const newWords = {
          id: doc.id,
          ...doc.data(),
        };

        return newWords;
      });

      setWord(newWord);
    });

    // const getCategory = async () => {
    //   const snapshot = await getDoc(doc(dbService, 'Words'));

    //   setCategory(snapshot.date().category);
    // };

    // getCategory();
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
          <CardListContainer>
            <CardContainer>
              {word.map((item) => {
                // if (category === item.category) {
                return (
                  <CardList key={item.id}>
                    <TextBox>{item.mean}</TextBox>
                    <CardBorder></CardBorder>
                  </CardList>
                );
                // }
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
