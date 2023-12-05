import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { format, formatISO, max } from "date-fns";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SpaceBetweenView, StyledText } from "./style";
import { UserFormData } from "../../../store/interface/userForm";
import * as registerIcon from '../../../assets/icons/register/registerIcon'

interface DatePickerModalProps {
  setBirth: React.Dispatch<React.SetStateAction<UserFormData>>;
}
const DatePickerModal: React.FC<DatePickerModalProps> = ({ setBirth }) => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const adultYear = year - 19;
  const maxDate = new Date(adultYear, 11, 31);
  const [date, onChangeDate] = useState(maxDate);
  const [selectedDate, setSelectedDate] = useState<string|null>(null)
  const [visible, setVisible] = useState(false);


  const onPressDate = () => {
    setVisible(true);
  };

  const onConfirm = (selectedDate: Date) => {
    if (formatISO(selectedDate).substring(0,10) !== formatISO(todayDate).substring(0,10)){
      setVisible(false);
      setSelectedDate(formatISO(selectedDate).substring(0,10))
      setBirth((prevFormData) => ({
        ...prevFormData,
        "dateOfBirth": formatISO(selectedDate).substring(0,10),
      })); 
      onChangeDate(selectedDate);
    } else {
      setVisible(false);
    }
  };


  const onCancel = () => {
    setVisible(false);
  };


  return (
    <View style={{marginLeft:"6.8%"}}>
      <Pressable onPress={onPressDate}>
        <SpaceBetweenView>
          {selectedDate?<StyledText style={{paddingLeft:5}}>{selectedDate}</StyledText>:
          <StyledText>생년월일을 선택해 주세요</StyledText>}
          <Image source={registerIcon.calendar} style={{width: 15, height:18, marginTop:10}}/>
        </SpaceBetweenView>
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
