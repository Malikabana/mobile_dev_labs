import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { router } from 'expo-router';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (!username) return;

    login(username);
    router.replace('/');
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: 250,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});