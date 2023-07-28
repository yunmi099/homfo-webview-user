import styled from 'styled-components/native';
import { TouchableOpacityProps, TextProps } from 'react-native';
interface StyledButtonProps extends TouchableOpacityProps {
  set: boolean;
}
interface StyledButtonTextProps extends TextProps {
  set?: boolean;
}
export const StyledText = styled.Text`
  margin: 15px;
  font-size: 15px;
`;
export const Block = styled.View`
  width: 100%;
`;
export const NumberTextInput = styled.TextInput`
  border: 1px solid;
  border-color: lightgrey;
  width: 54%;
  padding-left: 10px;
  height: 45px;
  margin-top: 8px;
  margin-right: 3px;
`;
export const Buttontext = styled.Text<StyledButtonTextProps>`
  color: ${props => (props.set ? 'lightgrey' : 'white')};
`;
export const StyledVerifybutton = styled.TouchableOpacity<StyledButtonProps>`
  background-color: ${props => (props.set ? 'white' : '#8b00ff')};
  border: 1px solid;
  border-color: lightgrey;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: 45px;
  margin-top: 8px;
  margin-left: 3px;
`;
export const StyledTextInput = styled.TextInput`
  margin-horizontal: 20px;
  margin-vertical: 3px;
  border: 1px solid;
  height: 45px;
  padding-left: 10px;
  border-color: lightgrey;
`;

export const Container = styled.View`
  width: 100%;
  align-items: center;
  background-color: white;
`;
export const StyledButton = styled.TouchableOpacity`
  background-color: #8b00ff;
  border: 1px solid;
  border-color: lightgrey;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 60px;
  margin-top: 30px;
  margin-left: 3px;
  margin-bottom: 15px;
`;
export const ButtonText = styled.Text`
  color: white;
`;
