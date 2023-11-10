import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { format, formatISO } from "date-fns";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { StyledText } from "./style";
import '../interface';
import { ko } from "date-fns/locale";

interface DatePickerModalProps {
  setBirth: React.Dispatch<React.SetStateAction<UserFormData>>;
}
const DatePickerModal: React.FC<DatePickerModalProps> = ({ setBirth }) => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const adultYear = year - 19;
  const maxDate = new Date(adultYear, 11, 31);
  const [date, onChangeDate] = useState(maxDate);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setBirth((prevFormData) => ({
      ...prevFormData,
      "dateOfBirth": formatISO(maxDate).substring(0,10),
    }));
  }, []);

  const onPressDate = () => {
    setVisible(true);
  };

  const onConfirm = (selectedDate: Date) => {
    setVisible(false);
    setBirth((prevFormData) => ({
      ...prevFormData,
      "dateOfBirth": formatISO(selectedDate).substring(0,10),
    }));
    onChangeDate(selectedDate);
  };

  const onCancel = () => {
    setVisible(false);
  };


  return (
    <View style={{marginLeft:"6.8%"}}>
      <Pressable onPress={onPressDate}>
      {date?<StyledText>생년월일을 선택해주세요.</StyledText>:
        <StyledText>yyyy / mm / dd</StyledText>}
      </Pressable>
      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={onConfirm}
        onCancel={onCancel}
        maximumDate={maxDate}
      />
    </View>
  );
};

export default DatePickerModal;
