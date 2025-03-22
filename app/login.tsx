import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError('');
      
      if (!email || !password) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      if (email === 'admin@exemple.com' && password === 'password') {
        await AsyncStorage.setItem('isAuthenticated', 'true');
        router.replace('/(tabs)');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Connexion Admin</Text>
        
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          Email: admin@exemple.com{'\n'}
          Mot de passe: password
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1e1e1e',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#252525',
    padding: 16,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#ff4757',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff4757',
    marginBottom: 16,
    textAlign: 'center',
  },
  hint: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 20,
  },
});