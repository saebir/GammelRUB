import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (email.trim() === '') {
      alert('Indtast din email for at nulstille adgangskode');
      return;
    }
  
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  
    if (error) {
      console.log('Fejl:', error);
      alert(`Noget gik galt: ${error.message}`);
    } else {
      alert('Email sendt! Tjek din indbakke for at nulstille adgangskoden.');
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf6f0' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Glemt adgangskode</Text>

          <Text style={styles.subtitle}>
            Indtast din email, så sender vi et link til at nulstille din adgangskode.
          </Text>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email:</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <TouchableOpacity onPress={handleResetPassword}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Send nulstillingslink</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Tilbage til login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D2A32',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    width: '100%',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#e67000',
    borderColor: '#e67000',
    marginBottom: 16,
    width: '100%',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  link: {
    textAlign: 'center',
    color: '#e67000',
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 12,
  },
});
