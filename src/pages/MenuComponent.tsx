import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import UserPrivateChatComponent from '../components/UserPrivateChatComponent';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';

import {UserData} from '../interaces/userData.interface';
import socket from '../../socket/client';

import {stylees} from '../themes/styles';

interface Props extends NativeStackScreenProps<any, any> {}

export default function MenuComponent({navigation}: Props) {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    function concatNewUser(user: UserData) {
      setUsers(currentUsers => {
        const allUsers = [...currentUsers, user];
        const newUsers = allUsers.filter(
          (obj, idx, self) =>
            idx === self.findIndex(o => o.ip === obj.ip && o.ip === obj.ip),
        );

        return newUsers;
      });
    }

    function concatNewUser2(user: UserData[]) {
      console.log('from new User: ', user);

      setUsers(currentUsers => {
        const allUsers = [...currentUsers, ...user];
        const newUsers = allUsers.filter(
          (obj, idx, self) =>
            idx === self.findIndex(o => o.ip === obj.ip && o.ip === obj.ip),
        );

        return newUsers;
      });
    }

    socket.on('newUser', concatNewUser);
    // socket.on('newUser2', concatNewUser2);

    return () => {
      socket.off('newUser', concatNewUser);
      // socket.off('newUser2', concatNewUser2);
    };
  }, [users]);

  return (
    <View style={stylees.homeScreen}>
      <ScrollView contentContainerStyle={stylees.usersList}>
        {users &&
          users.map(user => (
            <UserPrivateChatComponent
              user={user}
              key={new Date().getTime() + Math.random() * 10}
            />
          ))}
      </ScrollView>
      <TouchableOpacity
        style={[stylees.buttons, stylees.generalChat]}
        onPress={() => {
          navigation.navigate('Chat');
        }}>
        <Text style={stylees.textButtons}>General Chat</Text>
      </TouchableOpacity>
    </View>
  );
}
