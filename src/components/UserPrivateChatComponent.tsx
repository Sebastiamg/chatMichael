import React from 'react';

import {Text, TouchableOpacity} from 'react-native';
import {UserData} from '../interaces/userData.interface';

import {stylees} from '../themes/styles';

interface Props {
  user: UserData;
}

export default function UserPrivateChatComponent({user}: Props) {
  function someAny() {
    console.log(user);
  }
  return (
    <TouchableOpacity style={stylees.user} onPress={someAny}>
      {/* <Text style={stylees.text}>{user.ip}</Text> */}
      <Text style={stylees.text}>{user.username ?? user.id}</Text>
    </TouchableOpacity>
  );
}
