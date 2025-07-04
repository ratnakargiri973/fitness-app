import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

export default function Avatar() {
  const { name, profilePic } = useSelector((state) => state.user);
  const [bgColor, setBgColor] = useState('lightgray');

  const Colors = [
    '#e0f7fa', '#b2ebf2', '#b3e5fc', '#c8e6c9',
    '#ffe0b2', '#ffcdd2', '#f0f4c3', '#e1bee7', '#d7ccc8',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * Colors.length);
      setBgColor(Colors[random]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const avatarInitials = name
    ? name.trim().split(' ').map(word => word[0].toUpperCase()).join('').slice(0, 2)
    : '';


  return (
    <View style={styles.container}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.avatarImage} />
        ) : (
          <View style={[styles.avatarInitials, { backgroundColor: bgColor }]}>
            <Text style={styles.initialsText}>{avatarInitials}</Text>
          </View>
        )}
      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: 4,
    paddingTop: 20,
    position: 'relative',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#00C853',
  },
  avatarInitials: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00C853',
  },
  initialsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  nameText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  
});
