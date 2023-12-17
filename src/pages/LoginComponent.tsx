import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {stylees} from '../themes/styles';

import {Verify} from '../services/auth.service';
import socket from '../../socket/client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AlertError, checkInputs} from '../utils/utils';

interface Props extends NativeStackScreenProps<any, any> {}
export const LoginComponent = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ip, setIP] = useState('');

  useEffect(() => {
    socket.connect();
    socket.emit('getIp');
    function getIp(userIP: string) {
      setIP(userIP);
    }
    socket.on('socketIP', getIp);
    return () => {
      socket.off('socketIP', getIp);
      socket.disconnect();
    };
  }, []);

  async function LoginUser() {
    if (!checkInputs(username, password)) {
      AlertError('Form Error', 'Please fill all inputs');
      return;
    }

    await Verify({username, password, ip})
      .then(res => {
        if (res.data.message) {
          navigation.navigate('MenuComponent');
        }

        // send data to sever
        socket.emit('user data', {username});

        setUsername('');
        setPassword('');
      })
      .catch(err => {
        return AlertError('', '', true, err);
      });
  }

  return (
    <ScrollView contentContainerStyle={stylees.authForm}>
      <Text style={stylees.authTitle}>LogIn</Text>
      <View style={stylees.authInputContainer}>
        <Text style={stylees.text}>Username</Text>
        <TextInput
          style={stylees.authInput}
          placeholderTextColor={'gray'}
          placeholder="Sebas777"
          onChangeText={text => setUsername(text)}
          value={username}
        />
      </View>

      <View style={stylees.authInputContainer}>
        <Text style={stylees.text}>Password</Text>
        <TextInput
          style={stylees.authInput}
          placeholderTextColor={'gray'}
          placeholder="••••••••••"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <View>
        <View>
          <TouchableOpacity style={stylees.authLink} onPress={LoginUser}>
            <Text style={stylees.textButtons}>LogIn</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[stylees.authLink, stylees.authLinkA]}
            onPress={() =>
              navigation.replace('(ง ◉ _ ◉)ง  ╰┈─➤   Michael Ortiz')
            }>
            <Text style={stylees.authText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
