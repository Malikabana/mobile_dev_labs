import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

export default function ReminderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>💧</Text>
      <Text style={styles.title}>Time to Drink Water!</Text>
      <Text style={styles.message}>
        Staying hydrated improves focus, energy, and overall health.{'\n'}
        Aim for a full glass right now!
      </Text>
      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Quick tip</Text>
        <Text style={styles.tipText}>
          The recommended daily intake is about 8 glasses (2 litres) of water.
          Keep a bottle nearby to make it easy!
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>✅ I drank water!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4fc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  icon: { fontSize: 72, marginBottom: 16 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a6fa8',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  tipBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    width: '100%',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  tipTitle: { fontSize: 15, fontWeight: '700', color: '#1a6fa8', marginBottom: 6 },
  tipText: { fontSize: 14, color: '#555', lineHeight: 20 },
  button: {
    backgroundColor: '#1a6fa8',
    paddingHorizontal: 44,
    paddingVertical: 16,
    borderRadius: 30,
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
