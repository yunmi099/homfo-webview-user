import styled from 'styled-components/native';
import { TouchableOpacityProps, TextProps } from 'react-native';

export const StyledTextInput = styled.TextInput`
  border-radius: 11px;
  border: 1px solid;
  border-color: lightgrey;
  width: 85%;
  padding: 20px;
  height: 5.7%;
  margin-top: 8px;
  margin-horizontal: 7.5%;
`;
export const TextView = styled.Text`
  margin-vertical: 15%;
  margin-left: 7.5%;
`
export const StyledText = styled.Text`
  font-weight: 600;
  font-size: 25;

`
export const LoginButton = styled.TouchableOpacity`
  width: 85%;
  height: 5.7%;
  margin-top: 8px;
  margin-horizontal: 7.5%;
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
  font-size: 13;
`