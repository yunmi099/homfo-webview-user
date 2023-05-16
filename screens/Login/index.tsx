import React, { useState } from 'react';
import { Text ,View, TextInput, Button } from 'react-native';
import { Container, StyledTextInput, StyledButton, ButtonText} from './style';
const Login = ({ navigation }) => {
  const [verify, setVerify]= useState(false);
  return (
    <Container>
        <View style={{flexDirection:'row', marginTop: 20}}>
          <StyledTextInput
            placeholder="전화번호를 입력해주세요"
          />
          <StyledButton set={verify} onPress={()=>{setVerify(true)}}> 
            <ButtonText set={verify}>
              인증번호 받기
            </ButtonText>
        </StyledButton>
        </View>
        {verify?
        <View style={{flexDirection:'row'}}>
          <StyledTextInput
            placeholder="인증번호를 입력해주세요"
          />
          <StyledButton set={true}  onPress={() => navigation.navigate('Main')}> 
            <ButtonText set={true}>
              인증번호 확인
            </ButtonText>
          </StyledButton>
        </View>: null}
        <View style={{marginTop:20}}>
          <Button title="회원가입" onPress={()=>navigation.navigate('회원가입')}/>
        </View>
    </Container>
    );
};

export default Login;