import React, { useState } from "react";
import { supabase } from '../lib/supabase';
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
} from "react-native";

export default function SignupScreen({ navigation }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirm, setHideConfirm] = useState(true);

    const handleSignup = async () => {
        if (form.email.trim() === '') {
            alert("Indtast venligst din email");
            return;
        }
        if (form.password !== form.confirmPassword) {
            alert("Adgangskoderne matcher ikke");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
        });

        if (error) {
            console.log('Signup error:', error);
            alert(`Noget gik galt: ${error.message}`);
          } else {
            alert("Tjek din e-mail og bekræft din konto!");
            navigation.navigate('Login');
          }
          
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf6f0' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={60}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Text style={styles.title}>Opret Konto</Text>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="john@example.com"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={form.email}
                            onChangeText={email => setForm({ ...form, email })}
                        />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Adgangskode</Text>
                        <TextInput
                            secureTextEntry={hidePassword}
                            placeholder="********"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={form.password}
                            onChangeText={password => setForm({ ...form, password })}
                        />
                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                            <Text style={styles.toggleText}>
                                {hidePassword ? "Vis adgangskode" : "Skjul adgangskode"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Bekræft adgangskode</Text>
                        <TextInput
                            secureTextEntry={hideConfirm}
                            placeholder="********"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={form.confirmPassword}
                            onChangeText={confirm => setForm({ ...form, confirmPassword: confirm })}
                        />
                        <TouchableOpacity onPress={() => setHideConfirm(!hideConfirm)}>
                            <Text style={styles.toggleText}>
                                {hideConfirm ? "Vis adgangskode" : "Skjul adgangskode"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleSignup} style={styles.btn}>
                        <Text style={styles.btnText}>Opret konto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerText}>
                            Har du allerede en konto? <Text style={{ textDecorationLine: 'underline' }}>Log ind</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <Text style={styles.footerText}>
                            Er du en af vores dygtige medarbejder på pladsen? <Text style={{ textDecorationLine: 'underline' }}>Ansøg om medarbejder login!</Text>
                        </Text>
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
        fontWeight: '700',
        color: '#1D2A32',
        textAlign: 'center',
        marginBottom: 24,
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
    },
    toggleText: {
        color: '#e67000',
        marginTop: 6,
    },
    btn: {
        backgroundColor: '#e67000',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 16,
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    footerText: {
        marginTop: 24,
        textAlign: 'center',
        fontSize: 15,
        color: '#222',
        fontWeight: '600',
    },
});