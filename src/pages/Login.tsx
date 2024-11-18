import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../api/authApi';
import { setToken } from '../features/auth/authSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      dispatch(setToken(token));
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Home');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
  error: { color: 'red', marginTop: 8 },
});

export default Login;
