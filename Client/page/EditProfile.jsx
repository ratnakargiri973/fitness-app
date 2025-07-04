import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/userSlice';
import instance from '../AxiosConfig/AxiosConfig';
import * as ImagePicker from 'react-native-image-picker';

export default function EditProfile({ navigation }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    age: user.age || '',
    gender: user.gender || '',
    height: user.height?.toString() || '',
    weight: user.weight?.toString() || '',
  });

  // Only store new image if picked
  const [profileImg, setProfileImg] = useState(null);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Image Error', response.errorMessage);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const img = response.assets[0];
        setProfileImg({
          uri: img.uri,
          name: img.fileName || 'profile.jpg',
          type: img.type || 'image/jpeg',
        });
      }
    });
  };

  const handleSave = async () => {
    const data = new FormData();

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    // Send either new image or old profilePic URL
    if (profileImg && profileImg.uri?.startsWith('file')) {
      data.append('image', {
        uri: profileImg.uri,
        name: profileImg.name,
        type: profileImg.type,
      });
    } else {
      data.append('profilePic', user.profilePic || '');
    }

    try {
      const response = await instance.put(`user/update/${user._id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      dispatch(setUser(response.data.user));
      navigation.goBack();
    } catch (error) {
      Alert.alert('Update Failed', error?.response?.data?.message || error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <TouchableOpacity onPress={handleImagePick} style={styles.imageWrapper}>
        <Image
          source={{ uri: profileImg?.uri || user.profilePic }}
          style={styles.image}
        />
        <Text style={styles.changeImageText}>Change Profile Image</Text>
      </TouchableOpacity>

      <TextInput
        label="Name"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
      />
      <TextInput
        label="Phone"
        value={formData.phone}
        onChangeText={(text) => handleChange('phone', text)}
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
      />
      <TextInput
        label="Age"
        value={formData.age.toString()}
        onChangeText={(text) => handleChange('age', text)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInput
        label="Gender"
        value={formData.gender}
        onChangeText={(text) => handleChange('gender', text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Height (cm)"
        value={formData.height}
        onChangeText={(text) => handleChange('height', text)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInput
        label="Weight (kg)"
        value={formData.weight}
        onChangeText={(text) => handleChange('weight', text)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />

      <Button
        mode="contained"
        onPress={handleSave}
        style={styles.button}
        buttonColor="#00C853"
      >
        Save Changes
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00C853',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 6,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00C853',
    marginBottom: 8,
  },
  changeImageText: {
    fontSize: 14,
    color: '#00C853',
  },
});
