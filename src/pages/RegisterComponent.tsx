import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {stylees} from '../themes/styles';

import {Register} from '../services/auth.service';
import {socket} from '../../socket/client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}
export const RegisterComponent = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [userIP, setUserIP] = useState('');

  useEffect(() => {
    socket.emit('getIp');
    function getIp(ip: string) {
      setUserIP(ip);
    }

    socket.on('socketIP', getIp);
    return () => {
      socket.off('socketIP', getIp);
    };
  }, []);

  function RegisterUser() {
    Register({username, password, ip: userIP});
    setUsername('');
    setPassword('');
    setPasswordConfirm('');
    navigation.navigate('Login');
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
        <Text>Confirm Password:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{position: 'relative', flex: 1}}>
            <TextInput
              style={stylees.chat__input}
              placeholder="Confirmar contraseña"
              secureTextEntry
              onChangeText={text => setPasswordConfirm(text)}
              value={passwordConfirm}
            />
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={stylees.buttons} onPress={RegisterUser}>
            <Text style={stylees.textButtons}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
