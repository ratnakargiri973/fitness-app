import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Profile() {
  const navigation = useNavigation();

  const {
    name,
    email,
    phone,
    profilePic,
    age,
    gender,
    activityLevel,
    height,
    weight,
  } = useSelector((state) => state.user);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileTop}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, styles.placeholderImage]}>
            <Text style={styles.initials}>
              {name ? name[0].toUpperCase() : 'U'}
            </Text>
          </View>
        )}
        <Text style={styles.name}>{name}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Icon name="create-outline" size={20} color="#00C853" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Detail label="Email" value={email} />
        <Detail label="Phone" value={phone} />
        <Detail label="Age" value={age} />
        <Detail label="Gender" value={gender} />
        <Detail label="Activity Level" value={activityLevel} />
        <Detail label="Height (cm)" value={height} />
        <Detail label="Weight (kg)" value={weight} />
      </View>
    </ScrollView>
  );
}

function Detail({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  profileTop: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#00C853',
    marginBottom: 10,
  },
  placeholderImage: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#555',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  editButtonText: {
    color: '#00C853',
    fontWeight: '600',
    marginLeft: 4,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
});
