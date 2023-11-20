import React, { useState } from 'react'
import { StyledText, StyledTextInput, HorizontalLine, CommentText } from '../style'
import RNPickerSelect from 'react-native-picker-select';
import DatePickerModal from '../DateTimePicker';
import { StyleSheet } from 'react-native';
import { UserFormData } from '../../../store/interface/userForm';

interface registerProps {
    formData: UserFormData;
    setFormData:  React.Dispatch<React.SetStateAction<UserFormData>>;
    onChangeText: (name: string, value: string) => void;
    detailJob: string;
    setDetailJob: React.Dispatch<React.SetStateAction<string>>;
}
export const SecondStep = ({formData, setFormData, onChangeText, detailJob, setDetailJob}: registerProps)=>{
    const [jobSetting, setJob] = useState<boolean>(false);
    const jobHandleEvent = (value:string)=>{
        if (value === '기타'){
          setJob(true);
        } else {
          setJob(false);
        }
        onChangeText("job", value);
      } 
    return(
    <>
          <StyledText>성별</StyledText>
          <RNPickerSelect
            placeholder={{
              label: "성별",
            }}
            textInputProps={{ underlineColorAndroid: 'transparent' }}
            value={formData.gender}
            onValueChange={(value: string) => onChangeText("gender", value)}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            items={[
              { label: '남성', value: 'M' },
              { label: '여성', value: 'W' },
            ]}
            style={pickerSelectStyles}
          />
          <HorizontalLine/>
          <StyledText>직업</StyledText>
          <RNPickerSelect
            textInputProps={{ underlineColorAndroid: 'transparent' }}
            placeholder={{
              label: "선택",
            }}
            fixAndroidTouchableBug={true}
            value={formData.job}
            onValueChange={(value: string) => jobHandleEvent(value)}
            useNativeAndroidPickerStyle={false}
            items={[
              { label: '학생', value: '학생'},
              { label: '직장인', value: '직장인'},
              { label: '자영업자', value: '자영업자'},
              { label: '프리랜서', value: '프리랜서'},
              { label: '주부', value: '주부'},
              { label: '기타', value: '기타'},
            ]}
            style={pickerSelectStyles}
          />
          <HorizontalLine/>
          {jobSetting? <StyledTextInput placeholder={"20자 이내로 작성해주세요"} 
                value={detailJob}
                placeholderTextColor ="lightgrey"
                onChangeText={(text: string) => setDetailJob(text)}
                autoCorrect={false} maxLength={20} autoCapitalize={"none"} /> : null
          }
          <StyledText>생년월일</StyledText>

        <DatePickerModal 
            setBirth={setFormData}
        />
        <HorizontalLine/>
    </>)
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      marginHorizontal: "6.8%",
      marginVertical:5,
    },
    inputAndroid: {
      marginHorizontal: 20,
      marginVertical: 3,
      height: 45,
      // borderWidth:1,
      paddingLeft: 10,
      borderColor: "lightgrey",
    },
  });