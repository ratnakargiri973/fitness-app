import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Avatar from '../components/Avatar';

function Dashboard() {
  // const { name, profilePic } = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar />
      </View>
      <Text style={styles.welcomeText}>Welcome to Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Dashboard;
