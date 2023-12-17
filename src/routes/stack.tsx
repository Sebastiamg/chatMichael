import React from 'react';
import MenuComponent from '../pages/MenuComponent';
import ChatComponent from '../pages/ChatComponent';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginComponent from '../pages/LoginComponent';
import { RegisterComponent } from '../pages/RegisterComponent';
const Stack = createNativeStackNavigator();

export default function StackComponent() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginComponent} />
      <Stack.Screen name="RegisterComponent" component={RegisterComponent} />

      <Stack.Screen
        name="MenuComponent"
        component={MenuComponent}
        options={{title: 'Menu'}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatComponent}
        options={{title: 'Chat'}}
      />
    </Stack.Navigator>
  );
}
