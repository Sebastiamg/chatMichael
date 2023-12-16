import React from 'react';

import {Text, View} from 'react-native';
import {UserData} from '../interaces/userData.interface';

import {stylees} from '../themes/styles';

interface Props {
  user: UserData;
}

export default function UserPrivateChatComponent({user}: Props) {
  return (
    <View style={stylees.user}>
      <Text style={stylees.text}>{user.ip}</Text>
    </View>
  );
}
