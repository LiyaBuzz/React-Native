import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { router, Link } from 'expo-router';
import { Colors } from '../constants/Colors';

// LoginScreen
// - Simple email/password login form
// - Calls useAuth().login and navigates to home on success
export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Attempt to login; AuthContext throws on invalid credentials
      await login({ email, password });
      // replace history to avoid back navigation to login
      router.replace('/');
    } catch (e) {
      Alert.alert('Login failed', e.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </Pressable>
      <View style={styles.row}>
        <Text>Don't have an account?</Text>
        <Link href="/register" style={styles.link}>Register</Link>
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