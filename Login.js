import React from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen, darkBlue} from './Constants';
import Field from './Field';

const Login = (props) => {
  return (
    <Background>
      <View style={{alignItems: 'center', width: 400}}>
        <Text
          style={{
            color: 'black',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 50
          }}>
          Login
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
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
          <Field placeholder="Password" secureTextEntry={true} />
          <View
            style={{alignItems: 'flex-end', flexDirection :'row', width: '78%', paddingRight: 16, marginBottom: 200, justifyContent: "end"}}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Click here if you </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("ForgetPassword")}>
            <Text style={{ color: darkBlue, fontWeight: 'bold', fontSize: 16 }}>Forget Password ?</Text>
            </TouchableOpacity>
          </View>
          <Btn textColor='white' bgColor={darkBlue} btnLabel="Login" Press={() => alert("Logged In")} Press={() => props.navigation.navigate("Camera")} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;