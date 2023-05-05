import styled from 'styled-components/native';
export const StyledTextInput = styled.TextInput`
  border: 1px solid;
  border-color: lightgrey;
  width: 55%;
  padding: 20px;
  height: 50px;
  margin-top: 8px;
  margin-right: 3px;
`;
export const StyledButton = styled.TouchableOpacity`
  background-color: ${props => (props.set ? 'white' : '#8b00ff')};
  border: 1px solid;
  border-color: lightgrey;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: 50px;
  margin-top: 8px;
  margin-left: 3px;
`;
export const ButtonText = styled.Text`
  color: ${props => (props.set ? 'lightgrey' : 'white')};
`;
export const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background-color: white;
  align-items: center;
`;
