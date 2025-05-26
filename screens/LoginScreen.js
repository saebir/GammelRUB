import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { supabase } from '../lib/supabase';


export default function LoginScreen({ navigation }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = async () => {
        if (form.email.trim() === '' || form.password.trim() === '') {
            alert("Indtast både email og adgangskode");
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
        });

        if (error) {
            alert(`Login mislykkedes: ${error.message}`);
        } else {
            navigation.navigate('Home');
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
                    <View style={styles.header}>
                        <Image
                            alt="App Logo"
                            resizeMode="contain"
                            style={styles.headerImg}
                            source={{ uri: 'https://dronenetvaerk.dk/content/uploads/2021/02/rock-under-broen.png' }}
                        />

                        <Text style={styles.title}>
                            Rock under Broen <Text style={{ color: '#075eec' }}></Text>
                        </Text>

                        <Text style={styles.subtitle}>
                            Login for at få en bedre oplevelse!
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Email:</Text>

                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                keyboardType="email-address"
                                onChangeText={email => setForm({ ...form, email })}
                                placeholder="john@example.com"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={form.email}
                            />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Adgangskode:</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={password => setForm({ ...form, password })}
                                placeholder="********"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                secureTextEntry={hidePassword}
                                value={form.password}
                            />
                            {/* Vis/skjul adgangskode-knap */}
                            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                <Text style={{ color: '#e67000', marginTop: 6 }}>
                                    {hidePassword ? 'Vis adgangskode' : 'Skjul adgangskode'}
                                </Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.formAction}>
                            <TouchableOpacity onPress={handleLogin}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Login</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.formLink}>Glemt kodeord?</Text>
                        </TouchableOpacity>


                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.formFooter}>
                            Ingen konto?{' '}
                            <Text style={{ textDecorationLine: 'underline' }}>Opret en nu!</Text>
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
        fontSize: 31,
        fontWeight: '700',
        color: '#1D2A32',
        marginBottom: 6,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 36,
    },
    headerImg: {
        width: 180,
        height: 180,
        alignSelf: 'center',
        marginBottom: 36,
    },
    form: {
        marginBottom: 20,
    },
    formAction: {
        marginTop: 4,
        marginBottom: 16,
    },
    formLink: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e67000',
        textAlign: 'center',
    },
    formFooter: {
        paddingVertical: 24,
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
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
        borderStyle: 'solid',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#e67000',
        borderColor: '#e67000',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
});