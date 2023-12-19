import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {stylees} from '../themes/styles';

import {Register} from '../services/auth.service';
import socket from '../../socket/client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AlertError, checkInputs} from '../utils/utils';

interface Props extends NativeStackScreenProps<any, any> {}
export const RegisterComponent = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [badIp, setBadIp] = useState(false);

  useEffect(() => {
    setBadIp(false);
    socket.disconnect();
  }, []);

  function RegisterUser() {
    if (!checkInputs(username, password, passwordConfirm)) {
      AlertError('Form Error', 'Please fill all inputs');
      return;
    }
    if (password !== passwordConfirm) {
      AlertError('Password Error', 'Passwords do not match, please check');
      return;
    }

    socket.auth = {username};
    socket.connect();
    socket.emit('getIp');
    socket.on('socketIP', getIp);
    function getIp(userIP: string) {
      Register({username, password, ip: userIP})
        .then(() => {
          setUsername('');
          setPassword('');
          setPasswordConfirm('');
          navigation.replace(' Ϟ(๑⚈ ․̫ ⚈๑)⋆ ╰┈─➤  Michael Ortiz');
          socket.off('socketIP', getIp);
        })
        .catch(err => {
          setUsername('');
          setPassword('');
          setPasswordConfirm('');
          AlertError('', '', true, err);
          socket.off('socketIP', getIp);
          if (!err.response) {
            setBadIp(true);
          }
        });
    }
    return;
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
        {badIp ? (
          <View>
            <TouchableOpacity
              style={[stylees.authLink, stylees.authLinkA, stylees.errorButton]}
              onPress={() =>
                navigation.replace('૮₍ ´˶• ᴥ •˶` ₎ა  ╰┈─➤  Michael Ortiz')
              }>
              <Text style={stylees.authText}>Set new Server IP</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};
