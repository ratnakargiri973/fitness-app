import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import Workouts from './Workouts';
import Steps from './Steps';
import Nutrition from './Neutrition';
import Profile from './Profile';
import Ionicons from 'react-native-vector-icons/Ionicons'




const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') iconName = 'home-outline';
          else if (route.name === 'Workouts') iconName = 'barbell-outline';
          else if (route.name === 'Steps') iconName = 'walk-outline';
          else if (route.name === 'Nutrition') iconName = 'nutrition-outline';
          else if (route.name === 'Profile') iconName = 'person-circle-outline';

          return (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#00C853',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="Steps" component={Steps} />
      <Tab.Screen name="Nutrition" component={Nutrition} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
