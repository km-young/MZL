import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, useColorScheme, View } from 'react-native';
import styled from '@emotion/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BLUE_COLOR } from '../common/colors';
import { SCREEN_HEIGHT } from '../common/util';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Post() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [category, setCategory] = useState([
    { label: 'Korean', value: 'korean' },
    { label: 'English', value: 'english' },
    { label: 'Chinese', value: 'chinese' },
  ]);
  return (
    <Container>
      <InputBox style={{ zIndex: 1 }}>
        <InputLabel>CATEGORY</InputLabel>
        <DropDownPicker
          open={open}
          value={value}
          items={category}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setCategory}
          placeholder="Select Category"
          zIndex={9000}
        />
      </InputBox>
      <KeyboardAwareScrollView extraScrollHeight={80}>
        <InputBox>
          <InputLabel>단어</InputLabel>
          <Input />
        </InputBox>
        <InputBox>
          <InputLabel>의미</InputLabel>
          <Input
            style={{ height: 120 }}
            textAlignVertical="top"
            multiline={true}
          />
        </InputBox>
        <InputBox>
          <InputLabel>TMI</InputLabel>
          <Input
            style={{ height: 120 }}
            textAlignVertical="top"
            multiline={true}
          />
        </InputBox>
        <SubmitButton>
          <SBtnText>등록</SBtnText>
        </SubmitButton>
      </KeyboardAwareScrollView>
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
  font-size: 20px;
  align-self: center;
`;
const SBtnText = styled.Text`
  color: ${(props) => props.theme.title};
`;
