import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import socket from '../../socket/client';

import {stylees} from '../themes/styles';
import {useFocusEffect} from '@react-navigation/native';

export default function PrivateChatComponent() {
  const [_, setIsConnected] = useState(socket.connected);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<
    {key: number; data: string; username: string}[]
  >([]);

  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      socket.emit('move to room', 'generalChat');
      return () => {
        socket.emit('leave to room', 'generalChat');
      };
    }, []),
  );

  useEffect(() => {
    socket.on('my message', getMEssage);

    scrollViewRef.current!.scrollToEnd({animated: true});
    return () => {
      socket.off('my message', getMEssage);
    };
  }, [messages]);

  function getMEssage(socketData: any) {
    setMessages(msgs => [
      ...msgs,
      {
        key: new Date().getTime(),
        data: socketData.message,
        username: socketData.username,
      },
    ]);
  }

  function sendMessage() {
    // socket.emit('my message', msg);
    socket.emit('message to room', {room: 'generalChat', message: msg});
    setMsg('');
  }

  function generateMsg(text: string) {
    setMsg(text);
  }
  return (
    // todo
    <View style={stylees.chat}>
      {/* lista de mensajes */}
      <Text style={stylees.mainTitle}>| (• ◡•)| (❍ᴥ❍ʋ) - General</Text>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={stylees.chat_messages}>
        {messages &&
          messages.map((item, index) => (
            <View style={stylees.chat__text} key={index}>
              <Text style={[stylees.text2, stylees.text3]}>
                {item.username}
              </Text>
              <Text style={stylees.text2}>{item.data}</Text>
            </View>
          ))}
      </ScrollView>
      {/* formulario */}
      <SafeAreaView style={stylees.chat__form} id="form">
        {/* input */}
        <TextInput
          value={msg}
          id="input"
          style={stylees.chat__input}
          placeholder="type a message"
          placeholderTextColor={'gray'}
          onChangeText={txt => generateMsg(txt)}
        />
        {/* botón */}
        <TouchableOpacity onPress={sendMessage} style={stylees.chat_button}>
          <Text style={stylees.text}>Send</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
