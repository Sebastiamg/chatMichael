/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import { stylees } from '../themes/styles';
import {Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

interface Props extends NativeStackScreenProps<any, any> {}

export const RegisterComponent = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  interface credentials {
    username: string;
    password: string;
  }

  const register = async ({username, password}: credentials) => {
    try {
    //   const RES = await api.post();
    console.log(username, password)
    //   console.log(RES);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleRegister = async () => {
    if (password === '' || username === '') {
      return Alert.alert(
        'Register error',
        'Por favor complete todos los campos',
      );
    }
    if (password === passwordConfirm) {
      console.log('las contraseñas coinciden: ', password);
      navigation.navigate('MenuComponent');
    } else {
      Alert.alert('Error', 'Las contraseñas no coinciden', [{text: 'Aceptar'}]);
    }
    if (await register({username, password})) {
      navigation.navigate('RegisterScreen');
    }
  };

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
          <TouchableOpacity
            style={stylees.buttons}
            onPress={handleRegister}
          >
            <Text style={stylees.textButtons}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
