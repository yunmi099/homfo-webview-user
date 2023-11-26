import React from "react";
import { StyledView ,StyledText} from "./style";
interface HeaderProps {
  title: string;
  navigation?:any;
  location?: string;
  auth?: boolean;
  onPress?: () => void;
}

const ConfirmButton = ({ title, navigation, location, onPress, auth=true }: HeaderProps) => {
  return (
    <StyledView 
    auth={auth}
    onPress={() => {
      if (navigation) {
        navigation.navigate(location);
      }
      if (onPress && auth) {
        onPress();
      }
    }}>
      <StyledText>{title}</StyledText>
    </StyledView>
  );
};

export default ConfirmButton;





