import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ProgramScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('13');

  const program = {
    '13': [
      { time: '15:00', act: 'Rockband A' },
      { time: '17:00', act: 'DJ Crazy Beats' },
    ],
    '14': [
      { time: '13:00', act: 'Jazz & Chill' },
      { time: '20:00', act: 'Metal Storm' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tilbage-knap */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Tilbage</Text>
      </TouchableOpacity>

      {/* Dato-navigation */}
      <View style={styles.tabContainer}>
        {['13', '14'].map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDate(day)}
            style={[
              styles.tabButton,
              selectedDate === day && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedDate === day && styles.activeTabText,
              ]}
            >
              {day}. juni
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Indhold for valgt dag */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {program[selectedDate].map((item, index) => (
          <View key={index} style={styles.programItem}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.act}>{item.act}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6f0',
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  backText: {
    fontSize: 16,
    color: '#e67000',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeTab: {
    backgroundColor: '#e67000',
  },
  tabText: {
    fontSize: 16,
    color: '#1D2A32',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  programItem: {
    marginBottom: 16,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D2A32',
  },
  act: {
    fontSize: 16,
    color: '#333',
  },
});
