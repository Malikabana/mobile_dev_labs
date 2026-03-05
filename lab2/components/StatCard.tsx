import { View, Text, StyleSheet } from 'react-native';

type StatCardProps = {
  value: string;
  label: string;
  icon?: string;
  change?: number;
};

export default function StatCard({ value, label, icon, change }: StatCardProps) {
  const changeColor = change && change > 0 ? 'green' : 'red';

  return (
    <View style={styles.card}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>

      {change !== undefined && (
        <Text style={{ color: changeColor }}>
          {change > 0 ? `+${change}%` : `${change}%`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    margin: 10,
  },
  icon: {
    fontSize: 24,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: 'gray',
  },
});