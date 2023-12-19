import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {stylees} from '../themes/styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AlertError, checkInputs} from '../utils/utils';
import {setBASE_URL} from '../services/auth.service';
import {setSERVER_URL} from '../../socket/client';

interface Props extends NativeStackScreenProps<any, any> {}
export default function SetServerComponent({navigation}: Props) {
  const [ip, setServerIp] = useState<string>('');

  function changeIps() {
    if (!validateIP()) {
      console.log('invalid');
      AlertError('Ip Error', 'Ip is not valid 😢');
    } else {
      setBASE_URL(ip);
      setSERVER_URL(ip);
      navigation.replace(' Ϟ(๑⚈ ․̫ ⚈๑)⋆ ╰┈─➤  Michael Ortiz');
    }
  }

  function validateIP() {
    const ipRegex = /^(\d{1,3}\.){3}(\d{1,3})$/;
    const isValidIp = ipRegex.test(ip);
    if (!isValidIp || !checkInputs(ip)) {
      return false;
    }
    return true;
  }

  return (
    <View style={stylees.setIpSForm}>
      <Text style={[stylees.authTitle, stylees.authTitle2]}>Connect to</Text>
      <View style={stylees.setIpSForm1}>
        <View>
          <TextInput
            style={stylees.authInput}
            placeholderTextColor={'gray'}
            placeholder="127.0.0.1"
            keyboardType="numeric"
            onChangeText={text => setServerIp(text)}
            value={ip}
          />
        </View>
        <View>
          <TouchableOpacity
            style={[stylees.authLink, stylees.authLinkB]}
            onPress={changeIps}>
            <Text style={stylees.textButtons}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
