import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function HomeScreen({ navigation }) {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const festivalDate = new Date('2025-06-13T14:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = festivalDate - now;

      if (diff <= 0) {
        setCountdown("Festivalen er i gang! 🎉");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `Festivalen starter om: ${days} dage ${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePress = (label) => {
    if (label === 'Program') {
      navigation.navigate('Program');
    } else {
      Alert.alert(`Du trykkede på: ${label}`);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const menuItems = ['Kort', 'Program', 'Nyheder', 'Backstage', 'Shop'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdf6f0' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.countdownBox}>
            <Text style={styles.countdown}>{countdown}</Text>
          </View>

          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{
              uri: 'https://dronenetvaerk.dk/content/uploads/2021/02/rock-under-broen.png',
            }}
          />
        </View>

        <Text style={styles.title}>Velkommen!</Text>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <View key={item}>
              <TouchableOpacity onPress={() => handlePress(item)}>
                <Text style={styles.menuItem}>{item}</Text>
              </TouchableOpacity>
              {index < menuItems.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          {['Praktisk info', 'Hjemmeside', 'Kontakt os', 'Log ud'].map(
            (label, index, arr) => (
              <View key={label} style={styles.footerItemWrapper}>
                <TouchableOpacity
                  onPress={() =>
                    label === 'Log ud'
                      ? handleLogout()
                      : Alert.alert(label)
                  }
                >
                  <Text
                    style={[
                      styles.footerItem,
                      label === 'Log ud' && { color: '#e67000' },
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
                {index < arr.length - 1 && (
                  <Text style={styles.footerDivider}>|</Text>
                )}
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  countdown: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e67000',
    marginBottom: 10,
    textAlign: 'center',
  },
  headerImg: {
    width: 220,
    height: 220,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e67000',
    marginBottom: 30,
  },
  menuContainer: {
    width: '80%',
  },
  menuItem: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D2A32',
    textAlign: 'center',
    paddingVertical: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  footerItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  footerItem: {
    fontSize: 14,
    color: '#8a5c00',
    fontWeight: '500',
  },
  footerDivider: {
    marginHorizontal: 4,
    color: '#8a5c00',
    fontSize: 14,
  },
  countdownBox: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e67000',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
