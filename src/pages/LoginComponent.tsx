import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {stylees} from '../themes/styles';

import {Verify} from '../services/auth.service';
import {socket} from '../../socket/client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
export const LoginComponent = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [ip, setIP] = useState('');

  useEffect(() => {
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
    await Verify({username, password, ip}).then(res => {
      console.log('REGISTRADO: ', res.data.message);
      if (res.data.message) {
        navigation.navigate('MenuComponent');
      }
    });
    setUsername('');
    setPassword('');
  }

  return (
    <ScrollView>
      <View style={{padding: 20, alignContent: 'center'}}>
        <Text>Username:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{position: 'relative', flex: 1}}>
            <TextInput
              style={stylees.chat__input}
              placeholder="Nombre"
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
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={stylees.buttons} onPress={LoginUser}>
            <Text style={stylees.textButtons}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
