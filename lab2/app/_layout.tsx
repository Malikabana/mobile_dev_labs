import { Stack, Redirect, useSegments } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function RootNavigation() {
  const { user } = useContext(AuthContext);
  const segments = useSegments();

  const inAuthScreen = segments[0] === 'login';

  if (!user && !inAuthScreen) {
    return <Redirect href="/login" />;
  }

  return <Stack />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </AuthProvider>
  );
}