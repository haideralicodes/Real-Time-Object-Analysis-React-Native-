import React from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import {darkGreen, darkBlue, white, black, yellow} from './Constants';

const Background = ({ children }) => {
  return (
    <View>
      <View style={{ position: "absolute"}}>
        {children}
      </View>
    </View>
  )
};

export default Background;