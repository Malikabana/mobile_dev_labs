import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '💧 Water Reminder' }} />
      <Stack.Screen name="reminder" options={{ title: 'Reminder' }} />
    </Stack>
  );
}
