import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import instance from '../AxiosConfig/AxiosConfig';

const backgroundImage = {
  uri: 'https://cdn.pixabay.com/photo/2020/06/21/09/48/hill-5324149_1280.jpg',
};

const SignUp = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // <- Initially false

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      const response = await instance.post('user/sign-up', formData);
      console.log('Registered user:', response.data);
      setFormData({ name: '', email: '', phone: '', password: '' });

      setTimeout(() => {
        setLoading(false);
        navigation.navigate('SignIn');
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          label="Name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          mode="outlined"
          placeholder="Enter your name"
          style={styles.textInput}
          theme={inputTheme}
          textColor="#fff"
        />

        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          mode="outlined"
          placeholder="Enter your email"
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
          theme={inputTheme}
          textColor="#fff"
        />

        <TextInput
          label="Phone"
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
          mode="outlined"
          placeholder="Enter your phone"
          style={styles.textInput}
          keyboardType="phone-pad"
          theme={inputTheme}
          textColor="#fff"
        />

        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          mode="outlined"
          placeholder="Enter your password"
          style={styles.textInput}
          secureTextEntry
          theme={inputTheme}
          textColor="#fff"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signinContainer}>
          <Text style={styles.signinText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signinLink}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const inputTheme = {
  colors: {
    primary: '#00C853',
    text: '#fff',
    placeholder: '#aaa',
    background: '#1e1e1e',
  },
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00C853',
    textAlign: 'center',
    marginBottom: 32,
  },
  textInput: {
    marginBottom: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#00C853',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signinText: { color: '#ccc' },
  signinLink: {
    color: '#2962FF',
    fontWeight: 'bold',
  },
});

export default SignUp;
