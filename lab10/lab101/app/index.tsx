import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView } from 'react-native';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldSetBadge: false,
  }),
});

async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission required', 'Please enable notifications in your settings.');
    return false;
  }
  return true;
}

async function scheduleWaterReminder(intervalMinutes: number) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '💧 Time to drink water!',
      body: 'Stay hydrated — tap to log your intake.',
      data: { screen: 'reminder' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: intervalMinutes * 60,
      repeats: true,
    },
  });
}

const INTERVAL_OPTIONS = [1, 30, 60, 90, 120];

export default function HomeScreen() {
  const [selectedInterval, setSelectedInterval] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // When user taps the notification, navigate to /reminder
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const screen = response.notification.request.content.data?.screen;
      if (screen === 'reminder') {
        router.push('/reminder');
      }
    });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  const handleStart = async () => {
    const granted = await requestPermissions();
    if (!granted) return;
    await scheduleWaterReminder(selectedInterval);
    setIsActive(true);
    Alert.alert('Reminder set! 💧', `You'll be reminded every ${selectedInterval} minute(s).`);
  };

  const handleStop = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setIsActive(false);
    Alert.alert('Reminders cancelled', 'Water reminders have been turned off.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>💧 Water Reminder</Text>
      <Text style={styles.subtitle}>Stay hydrated throughout the day</Text>

      <Text style={styles.label}>Remind me every:</Text>
      <View style={styles.optionsRow}>
        {INTERVAL_OPTIONS.map(mins => (
          <TouchableOpacity
            key={mins}
            style={[styles.option, selectedInterval === mins && styles.optionSelected]}
            onPress={() => setSelectedInterval(mins)}
          >
            <Text style={[styles.optionText, selectedInterval === mins && styles.optionTextSelected]}>
              {mins < 60 ? `${mins}m` : `${mins / 60}h`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {!isActive ? (
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Start Reminders</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.activeBox}>
            <Text style={styles.activeText}>
              ✅ Reminders active every {selectedInterval} min
            </Text>
          </View>
          <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
            <Text style={styles.stopButtonText}>Stop Reminders</Text>
          </TouchableOpacity>
        </>
      )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e8f4fc',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 32, fontWeight: '800', color: '#1a6fa8', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#555', marginBottom: 36 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 12 },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  option: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1a6fa8',
    backgroundColor: '#fff',
  },
  optionSelected: { backgroundColor: '#1a6fa8' },
  optionText: { color: '#1a6fa8', fontWeight: '600', fontSize: 14 },
  optionTextSelected: { color: '#fff' },
  startButton: {
    backgroundColor: '#1a6fa8',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
  },
  startButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  activeBox: {
    backgroundColor: '#d4edda',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  activeText: { color: '#155724', fontSize: 15, fontWeight: '600' },
  stopButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
  },
  stopButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
