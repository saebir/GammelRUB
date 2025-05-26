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

export default function ResetPasswordScreen({ navigation }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirm, setHideConfirm] = useState(true);

    const handleReset = async () => {
        if (password.length < 6) {
            alert('Adgangskoden skal være mindst 6 tegn');
            return;
        }

        if (password !== confirmPassword) {
            alert('Adgangskoderne matcher ikke');
            return;
        }

        const { data, error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            console.log('Fejl ved opdatering:', error);
            alert(`Noget gik galt: ${error.message}`);
        } else {
            alert('Adgangskoden er opdateret!');
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
                    <Text style={styles.title}>Nulstil adgangskode</Text>
                    <Text style={styles.subtitle}>Indtast din nye adgangskode herunder</Text>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Ny adgangskode</Text>
                        <TextInput
                            secureTextEntry={hidePassword}
                            placeholder="********"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                            <Text style={styles.toggleText}>
                                {hidePassword ? 'Vis adgangskode' : 'Skjul adgangskode'}
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
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setHideConfirm(!hideConfirm)}>
                            <Text style={styles.toggleText}>
                                {hideConfirm ? 'Vis adgangskode' : 'Skjul adgangskode'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleReset} style={styles.btn}>
                        <Text style={styles.btnText}>Gem ny adgangskode</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
        fontWeight: '700',
        color: '#1D2A32',
        textAlign: 'center',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: '#444',
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
    link: {
        textAlign: 'center',
        color: '#e67000',
        fontWeight: '600',
        textDecorationLine: 'underline',
        marginTop: 24,
    },
});
