import styled from 'styled-components/native';

interface ConfirmButtonProps {
    auth? : boolean;
}
export const StyledView = styled.TouchableOpacity<ConfirmButtonProps>`
background-color: ${(props) => (props.auth ? '#842CFF' : '#767676')};
position: absolute;
bottom: 0;
width:100%;
height:8%;
align-items: center;
justifyContent:center;
`;

export const StyledText = styled.Text`
color: white;
fontSize:15px;
font-weight: 400;
`