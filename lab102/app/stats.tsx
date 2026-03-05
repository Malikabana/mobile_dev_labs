import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const AVG_STEP_LENGTH_M = 0.762;
const CALORIES_PER_STEP = 0.04;

export default function StatsScreen() {
  // params are passed as strings in Expo Router
  const { steps: stepsParam, goal: goalParam } = useLocalSearchParams();
  const parseNumberParam = (p?: string | string[], fallback = 0) => {
    const s = Array.isArray(p) ? p[0] : p ?? '';
    const n = parseInt(s, 10);
    return Number.isNaN(n) ? fallback : n;
  };

  const steps = parseNumberParam(stepsParam, 0);
  const goal = parseNumberParam(goalParam, 10000);

  const distanceKm = ((steps * AVG_STEP_LENGTH_M) / 1000).toFixed(2);
  const calories = Math.round(steps * CALORIES_PER_STEP);
  const progress = Math.min((steps / goal) * 100, 100).toFixed(1);
  const goalReached = steps >= goal;

  return (
    <View style={styles.container}>
      {goalReached && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>🏆 Goal reached! Congratulations!</Text>
        </View>
      )}

      <Text style={styles.title}>Your Stats</Text>

      <View style={styles.grid}>
        <StatCard label="Steps" value={steps.toLocaleString()} icon="👟" color="#2e7d32" />
        <StatCard label="Goal" value={goal.toLocaleString()} icon="🎯" color="#1565c0" />
        <StatCard label="Distance" value={`${distanceKm} km`} icon="📍" color="#6a1b9a" />
        <StatCard label="Calories" value={`${calories} kcal`} icon="🔥" color="#bf360c" />
        <StatCard label="Progress" value={`${progress}%`} icon="📈" color="#00695c" />
        <StatCard
          label="Remaining"
          value={goalReached ? '0 steps' : `${(goal - steps).toLocaleString()} steps`}
          icon="⏳"
          color="#4e342e"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>← Back to Counter</Text>
      </TouchableOpacity>
    </View>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon?: string; color?: string }) {
  return (
    <View style={[styles.card, { borderTopColor: color }]}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0faf0', padding: 20, alignItems: 'center' },
  banner: {
    backgroundColor: '#fffde7',
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    marginBottom: 4,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f9a825',
  },
  bannerText: { fontSize: 16, fontWeight: '700', color: '#f57f17' },
  title: { fontSize: 26, fontWeight: '800', color: '#2e7d32', marginVertical: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'center',
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    width: 140,
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIcon: { fontSize: 28, marginBottom: 6 },
  cardValue: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  cardLabel: {
    fontSize: 12,
    color: '#777',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 28,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});