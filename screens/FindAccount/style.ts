import styled from 'styled-components/native';

export const NotifyText = styled.Text`
    margin-top: 3%;
    margin-left: 6%;
    margin-bottom: 15%;
    font-size: 17px;
    color: #646464;
    font-weight: 500;
`;
export const Container = styled.View`
  width: 100%;
  height:100%;
  background-color: white;
`;
export const FoundIdBox = styled.View`
  width: 88%;
  height: 26%;
  border: 1px solid;
  border-color:#646464;
  border-radius:11px;
  margin-horizontal: 6%;
  margin-vertical: 10%;
  justify-content:center;
  align-items:center;
  
`
export const FoundIdText = styled.Text`
  font-size: 15px;
  margin:10px;
  color: black;
`

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content:center;
  align-items:center;
  border: 1px solid #D3D3D3;
  width: 88%;
  height: 47;
  margin-vertical: 3px;
  margin-left: 6%;
`
export const StyledTextInput = styled.TextInput`
  width: 88%;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  padding-left: 5px;
  color:black;
`

export const ButtonText = styled.Text`
  color: #FFF;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
`
interface CommentTextProps {
  color: string; // Add a color prop
}

export const CommentText = styled.Text<CommentTextProps>`
  color: ${(props) => props.color};
  margin-left:6.8%;
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 11px;
`