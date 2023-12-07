import styled from 'styled-components/native';
import { TouchableOpacityProps, TextProps } from 'react-native';

export const StyledTextInput = styled.TextInput`
  border-radius: 7px;
  border: 1px solid;
  border-color: lightgrey;
  width: 85%;
  paddingLeft:20px;
  height: 5.7%;
  margin-top: 8px;
  color: #D9D9D9;
  margin-horizontal: 7.5%;
`;
export const TextView = styled.Text`
  margin-top: 30%;
  margin-bottom: 15%;
  margin-left: 7.5%;
`
export const StyledText = styled.Text`
  font-weight: 600;
  font-size: 25px;
  color: #646464;
`
export const LoginButton = styled.TouchableOpacity`
  width: 85%;
  height: 5.7%;
  margin-top: 8px;
  border-radius: 11px;
  background-color: #8934FF;
  margin-horizontal: 7.5%;
  align-items:center;
  justify-content: center;
`
export const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background-color: white;
`;
export const VerticalLine = styled.View`
  width:1px;
  height: 12px;
  background-color: #D2D2D2;
  margin-horizontal:10px;
`
export const TextButton = styled.Text`
  font-weight: 600;
  font-size: 13px;
  color: #D9D9D9;
`

export const  PurpleText =  styled.Text`
  color: #8934FF;
  font-weight: 700;
  font-size: 25px;
`
