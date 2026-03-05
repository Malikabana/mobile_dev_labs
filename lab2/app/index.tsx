import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  if (!user) return null;

  return (
    <View style={styles.container}>

      <Text style={styles.welcome}>Welcome {user} 👋</Text>

      <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/lab1' as any)}>
        <Ionicons name="person-circle" size={22} color="white" />
        <Text style={styles.buttonText}>Lab 1 - Profile Card</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/recipe' as any)}>
        <Ionicons name="restaurant" size={22} color="white" />
        <Text style={styles.buttonText}>Lab 2 - Recipe App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/weather' as any)}>
        <Ionicons name="sunny" size={22} color="white" />
        <Text style={styles.buttonText}>Lab 3 - Weather</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/gallery' as any)}>
        <Ionicons name="images" size={22} color="white" />
        <Text style={styles.buttonText}>Lab 3 - Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/demo' as any)}>
        <Ionicons name="grid" size={22} color="white" />
        <Text style={styles.buttonText}>Components Demo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/products' as any)}>
        <Ionicons name="cart" size={22} color="white" />
        <Text style={styles.buttonText}>Lab 4 - Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: 'red' }]}
        onPress={logout}
      >
        <Ionicons name="log-out" size={22} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.menuButton}
  onPress={() => router.push('/api-demo' as any)}
>
  <Ionicons name="cloud-download" size={22} color="white" />
  <Text style={styles.buttonText}>Lab 6 - API Fetch</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2afaf',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: 250,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});