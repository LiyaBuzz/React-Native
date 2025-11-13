import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { router, Link } from 'expo-router';
import { Colors } from '../constants/Colors';

// RegisterScreen
// - Allows a new user to create an account (in-memory)
// - After successful registration the user is auto-logged in and redirected to home
export default function RegisterScreen() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      // register will throw if the user already exists
      await register({ name, email, password });
      // navigate to home after successful registration
      router.replace('/');
    } catch (e) {
      Alert.alert('Registration failed', e.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
      </Pressable>
      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <Link href="/login" style={styles.link}>Login</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: Colors.cream },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  input: { backgroundColor: Colors.white, padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: Colors.primary, padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: Colors.white, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  link: { marginLeft: 8, color: Colors.primary }
});