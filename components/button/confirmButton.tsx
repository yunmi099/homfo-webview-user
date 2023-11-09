import React from "react";
import { StyledView ,StyledText} from "./style";
interface HeaderProps {
  title: string;
  navigation?:any;
  location?: string;
  onPress?: () => void;
}

const ConfirmButton = ({ title, navigation, location, onPress }: HeaderProps) => {
  return (
    <StyledView onPress={() => {
      if (navigation) {
        navigation.navigate(location);
      }
      if (onPress) {
        onPress();
      }
    }}>
      <StyledText>{title}</StyledText>
    </StyledView>
  );
};

export default ConfirmButton;





