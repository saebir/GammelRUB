import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { supabase } from './lib/supabase';


console.log('Supabase klient:', supabase);

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ProgramScreen from './screens/ProgramScreen';


const Stack = createNativeStackNavigator();

//const linking = {
  //prefixes: ['loginsite://'], // ← skal matche din app.json -> "scheme"
  //config: {
    //screens: {
      //Login: 'login',
      //Signup: 'signup',
      //ForgotPassword: 'forgot-password',
      //ResetPassword: 'reset-password', // ← loginsite://reset-password
    //},
  //},
//};

export default function App() {
  return (
    <NavigationContainer > 
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Program" component={ProgramScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );

}

//linking={linking} skal stå i NavigationContaineren hvis der skal bruges deep linking