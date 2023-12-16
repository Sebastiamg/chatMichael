import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Text, View} from 'react-native';

interface Props extends NativeStackScreenProps<any, any> {}

export default function LoginComponent({navigation}: Props) {
  return (
    <View>
      <Text>LoginComponent</Text>
      <Button
        title="home"
        onPress={() => navigation.replace('MenuComponent')}
      />
    </View>
  );
}
