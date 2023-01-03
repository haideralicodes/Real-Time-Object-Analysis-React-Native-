import React from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';

const ForgetPassword = props => {
  return (
    <Background>
      <View style={{alignItems: 'center', width: 400}}>
        <Text
          style={{
            color: 'black',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 60,
          }}>
          Forget Password
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Reset your password
          </Text>
          <Field placeholder="Email / Username" keyboardType={'email-address'} />
          <Field placeholder="Password" secureTextEntry={true} />
          <Field placeholder="Confirm Password" secureTextEntry={true} />

          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Submit"
            Press={() => {
              alert('Password changed sucessfully');
              props.navigation.navigate('Login');
            }}
          />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default ForgetPassword;