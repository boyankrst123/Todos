import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';

const MainHeader = () => {
  return (
    <View>
      <Header
        centerComponent={{ text: 'To be, or not to be ...urgent ?', style: { color: '#fff' ,fontSize:32, fontWeight: 'bold' }}}
        containerStyle={{
          backgroundColor: '#a5d6a7',
          height: 200,
          borderWidth: 25,
          borderColor: '#f8e4a8',
          justifyContent: 'space-around',
        }}
      />
    </View>
  );
};

export default MainHeader;