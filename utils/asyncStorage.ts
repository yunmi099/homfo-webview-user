import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key:string, value:string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error storing data:', error);
    }
};

export const getData = async (key:string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      } else {
        console.log(`Data with key ${key} not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };    

export const clearAsyncStorage =  async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage 데이터가 모두 삭제되었습니다.');
    } catch (error) {
      console.error('AsyncStorage 데이터 삭제 중 오류 발생:', error);
    }
}