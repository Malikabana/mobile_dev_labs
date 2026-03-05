import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

async function sendGoalReachedNotification(steps: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🏆 Goal reached!',
      body: `Amazing! You hit ${steps.toLocaleString()} steps today!`,
      data: { screen: 'stats', steps },
    },
    trigger: null, // send immediately
  });
}

export default function HomeScreen() {
  const [stepCount, setStepCount] = useState(0);
  const [goal, setGoal] = useState('10');
  const [goalInput, setGoalInput] = useState('10');
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [goalNotified, setGoalNotified] = useState(false);
  const subscriptionRef = useRef<{ remove: () => void } | null>(null);
  const responseListener = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    setupPedometer();
    requestPermissions();

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const { screen, steps } = response.notification.request.content.data ?? {};
      if (screen === 'stats') {
        router.push({ pathname: '/stats', params: { steps: Number(steps ?? stepCount), goal: Number(goal) } });
      }
    });

    return () => {
      subscriptionRef.current?.remove?.();
      responseListener.current?.remove?.();
    };
  }, []);

  useEffect(() => {
    const numGoal = parseInt(goal);
    if (stepCount >= numGoal && numGoal > 0 && !goalNotified) {
      setGoalNotified(true);
      sendGoalReachedNotification(stepCount);
    }
  }, [stepCount, goal, goalNotified]);

  const setupPedometer = async () => {
    const available = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(available);

    if (!available) {
      Alert.alert('Pedometer unavailable', 'This device does not support the pedometer.');
      return;
    }

    subscriptionRef.current = Pedometer.watchStepCount(result => {
      setStepCount(result.steps);
    });
  };

  const handleSetGoal = () => {
    const parsed = parseInt(goalInput);
    if (isNaN(parsed) || parsed <= 0) {
      Alert.alert('Invalid goal', 'Please enter a positive number.');
      return;
    }
    setGoal(String(parsed));
    setGoalNotified(false);
    Alert.alert('Goal updated!', `New daily goal: ${parsed.toLocaleString()} steps`);
  };

  const progress = Math.min(stepCount / parseInt(goal || '1', 10), 1);
  const numGoal = parseInt(goal);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏃 Step Counter</Text>

      <View style={styles.stepsCircle}>
        <Text style={styles.stepsNumber}>{stepCount.toLocaleString()}</Text>
        <Text style={styles.stepsLabel}>steps today</Text>
      </View>

      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {stepCount.toLocaleString()} / {numGoal.toLocaleString()} steps
        {progress >= 1 ? ' 🎉' : ''}
      </Text>

      <View style={styles.goalRow}>
        <TextInput
          style={styles.input}
          value={goalInput}
          onChangeText={setGoalInput}
          keyboardType="numeric"
          placeholder="Daily goal"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.setGoalButton} onPress={handleSetGoal}>
          <Text style={styles.setGoalText}>Set Goal</Text>
        </TouchableOpacity>
      </View>

      {!isPedometerAvailable && (
        <Text style={styles.warning}>⚠️ Pedometer not available on this device</Text>
      )}

      <TouchableOpacity
        style={styles.statsButton}
        onPress={() => router.push({ pathname: '/stats', params: { steps: stepCount, goal: numGoal } })}
      >
        <Text style={styles.statsButtonText}>View Detailed Stats →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0faf0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#2e7d32', marginBottom: 28 },
  stepsCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#2e7d32',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#2e7d32',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  stepsNumber: { fontSize: 36, fontWeight: '900', color: '#fff' },
  stepsLabel: { fontSize: 13, color: '#a5d6a7', marginTop: 2 },
  progressBarBg: {
    width: '100%',
    height: 14,
    backgroundColor: '#c8e6c9',
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: { height: '100%', backgroundColor: '#2e7d32', borderRadius: 7 },
  progressText: { fontSize: 13, color: '#555', marginBottom: 28 },
  goalRow: { flexDirection: 'row', gap: 10, marginBottom: 16, width: '100%' },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#2e7d32',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#222',
  },
  setGoalButton: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 18,
    borderRadius: 12,
    justifyContent: 'center',
  },
  setGoalText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  warning: { color: '#e65100', fontSize: 13, marginBottom: 12, textAlign: 'center' },
  statsButton: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#2e7d32',
  },
  statsButtonText: { color: '#2e7d32', fontWeight: '700', fontSize: 15 },
});
