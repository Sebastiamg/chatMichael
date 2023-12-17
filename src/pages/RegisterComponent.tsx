import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {stylees} from '../themes/styles';

import {Register} from '../services/auth.service';
import {socket} from '../../socket/client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AlertError, checkInputs} from '../utils/utils';

interface Props extends NativeStackScreenProps<any, any> {}
export const RegisterComponent = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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

  function RegisterUser() {
    if (!checkInputs(username, password, passwordConfirm, ip)) {
      AlertError('Form Error', 'Please fill all inputs');
      return;
    }
    if (password !== passwordConfirm) {
      AlertError('Password Error', 'Passwords do not match, please check');
      return;
    }

    Register({username, password, ip})
      .then(() => {
        setUsername('');
        setPassword('');
        setPasswordConfirm('');
        navigation.replace(' Ϟ(๑⚈ ․̫ ⚈๑)⋆ ╰┈─➤  Michael Ortiz');
      })
      .catch(err => {
        AlertError('', '', true, err);
      });
  }

  return (
    <ScrollView contentContainerStyle={stylees.authForm}>
      <Text style={stylees.authTitle}>Register IP</Text>
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
      <View style={stylees.authInputContainer}>
        <Text style={stylees.text}>Confirm Password</Text>
        <TextInput
          style={stylees.authInput}
          placeholderTextColor={'gray'}
          placeholder="••••••••••"
          secureTextEntry
          onChangeText={text => setPasswordConfirm(text)}
          value={passwordConfirm}
        />
      </View>
      <View>
        <View>
          <TouchableOpacity style={stylees.authLink} onPress={RegisterUser}>
            <Text style={stylees.textButtons}>Register</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[stylees.authLink, stylees.authLinkA]}
            onPress={() =>
              navigation.replace(' Ϟ(๑⚈ ․̫ ⚈๑)⋆ ╰┈─➤  Michael Ortiz')
            }>
            <Text style={stylees.authText}>Enter with your account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
