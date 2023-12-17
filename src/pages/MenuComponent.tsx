import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import UserPrivateChatComponent from '../components/UserPrivateChatComponent';
import {Button, View, ScrollView} from 'react-native';

import {UserData} from '../interaces/userData.interface';
import {socket} from '../../socket/client';

import {stylees} from '../themes/styles';

interface Props extends NativeStackScreenProps<any, any> {}

export default function MenuComponent({navigation}: Props) {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    socket.connect();
    function concatNewUser(user: UserData) {
      console.log(user);
      setUsers(currentUsers => [...currentUsers, user]);
    }

    socket.on('newUser', concatNewUser);

    return () => {
      socket.off('newUser', concatNewUser);
    };
  }, [users]);

  return (
    <View style={stylees.homeScreen}>
      <View style={stylees.generalChat}>
        <Button
          title="General Chat"
          color={'#46494c'}
          onPress={() => {
            navigation.navigate('Chat');
          }}
        />
        <Button
          title="ON/OFF"
          color={'#46494c'}
          onPress={() => {
            console.log(socket.disconnected, socket.connected);
            if (!socket.disconnected) {
              return socket.disconnect();
            }
            socket.connect();
          }}
        />
      </View>
      <ScrollView contentContainerStyle={stylees.usersList}>
        {users &&
          users.map(user => (
            <UserPrivateChatComponent
              user={user}
              key={new Date().getTime() + Math.random() * 10}
            />
          ))}
      </ScrollView>
    </View>
  );
}
