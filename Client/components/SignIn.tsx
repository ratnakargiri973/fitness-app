import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import instance from '../AxiosConfig/AxiosConfig';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/userSlice';

const backgroundImage = {
  uri: 'https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_1280.png',
};

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await instance.post('user/sign-in', formData);
      console.log('Logged in user:', response.data);
      const userData = response.data.user;
      console.warn(userData._id);

      dispatch(setUser({
         _id: userData._id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          profilePic: userData.profilePic,
          age: userData.age,
          gender: userData.gender,
          height: userData.height,
          weight: userData.weight,
          activityLevel: userData.activityLevel,
          fitnessGoals: userData.fitnessGoals,
          stepsToday: userData.stepsToday,
          workouts: userData.workouts,
        }));
      await AsyncStorage.setItem('authToken', response.data.user.token);
      setFormData({ emailOrPhone: '', password: '' });

      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Home');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          label="Email or Phone"
          value={formData.emailOrPhone}
          onChangeText={(text) => handleChange('emailOrPhone', text)}
          mode="outlined"
          placeholder="Enter your email or phone"
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
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

        <TouchableOpacity onPress={() => alert('Reset password flow')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loading ? <ActivityIndicator color="#fff" /> : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}> Sign Up</Text>
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
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
  forgotPassword: {
    color: '#ccc',
    textAlign: 'right',
    marginBottom: 24,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#00C853',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#ccc',
  },
  signupLink: {
    color: '#2962FF',
    fontWeight: 'bold',
  },
});

export default SignIn;
