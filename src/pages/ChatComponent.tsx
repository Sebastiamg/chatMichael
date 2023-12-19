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
import {GetGeneralChatMsgs} from '../services/auth.service';
import {checkInputs} from '../utils/utils';

export default function ChatComponent() {
  const [_, setIsConnected] = useState(socket.connected);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<
    {key: number; message: string; username: string; ip: string}[]
  >([]);

  const [userIP, setUserIP] = useState();

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    socket.on('connect', onConnect);
    // getUserIp
    socket.emit('getIp');

    function setIpFromSocket(ipFromSocket: any) {
      setUserIP(ipFromSocket);
    }

    socket.on('socketIP', setIpFromSocket);

    // todo
    GetGeneralChatMsgs()
      .then(msgs => {
        setMessages(msgs.data.messages);
      })
      .catch(err => console.log(err));

    return () => {
      socket.off('connect', onConnect);
      socket.off('socketIP', setIpFromSocket);
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
        message: socketData.message,
        username: socketData.username,
        ip: socketData.ip,
      },
    ]);
  }

  function sendMessage() {
    // socket.emit('my message', msg);
    if (!checkInputs(msg)) {
      return;
    }
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
            <View
              style={
                userIP === item.ip ? stylees.chat__text2 : stylees.chat__text
              }
              key={index}>
              {userIP === item.ip ? (
                <Text style={[stylees.text2, stylees.text4]}>Me</Text>
              ) : (
                <Text style={[stylees.text2, stylees.text5]}>
                  {item.username ?? item.ip}
                </Text>
              )}
              <Text style={stylees.text3}>{item.message}</Text>
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
          placeholder="Type a message"
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
