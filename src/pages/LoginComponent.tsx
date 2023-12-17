/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {stylees} from '../themes/styles';

interface Props extends NativeStackScreenProps<any, any> {}

export default function LoginComponent({navigation}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  interface credentials {
    username: String;
    password: String;
  }

  const login = async ({username, password}: credentials) => {
    try {
      console.log(username, password);
      return true;
    } catch (error) {
      Alert.alert(
        'Login error',
        'Incorrect username or password, make sure you have entered your data correctly.',
      );
      return false;
    }
  };
  const handleLogin = async () => {
    if (username === '' || password === '') {
      return Alert.alert('Login error', 'Please complete all fiels');
    }
    if (await login({username, password})) {
      navigation.navigate('MenuComponent');
    }
  };

  return (
    <View style={{padding: 20, alignContent: 'center'}}>
      <Text>Username:</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{position: 'relative', flex: 1}}>
          <TextInput
            style={stylees.chat__input}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            value={username}
          />
        </View>
      </View>
      <Text>Password:</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{position: 'relative', flex: 1}}>
          <TextInput
            style={stylees.chat__input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={stylees.buttons}
          onPress={handleLogin}
        >
          <Text style={stylees.textButtons}>Login</Text>
        </TouchableOpacity>
        <Text>Haven't you registered yet? do it here!</Text>
        <TouchableOpacity
          style={stylees.buttons}
          onPress={() => navigation.navigate('RegisterComponent')}
        >
          <Text style={stylees.textButtons}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
