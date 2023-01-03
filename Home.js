import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Background from './Background';
import Lottie from 'lottie-react-native';
import Btn from './Btn';
import { darkGreen, green, darkBlue, yellow } from './Constants';

const Home = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 20, marginVertical: 100 }}>
        <Text style={{ color: 'black', fontSize: 40, marginBottom: 100 }}>Welcome to AI Recognition System</Text>
        <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
        <Btn bgColor={green} textColor='white' btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
        <Btn bgColor={green} textColor='white' btnLabel="Guest Mode" Press={() => props.navigation.navigate("GuestMode")} />
        <View style={{paddingVertical: 180, paddingLeft: 100}}>
        <Lottie
          style = {{height:150, width:150}}
          source={require('./VoiceAssistant.json')}
          loop = "true"
          autoPlay = "true"
          speed = "0.5"
        />
    </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default Home;
