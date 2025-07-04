import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import instance from '../AxiosConfig/AxiosConfig';
import { useSelector } from 'react-redux';

export default function NutritionScreen() {
  const user = useSelector((state) => state.user);
  const [mealType, setMealType] = useState('');
  const [foodItems, setFoodItems] = useState([
    { name: '', calories: '', protein: '', carbs: '', fats: '' }
  ]);
  const [nutritionData, setNutritionData] = useState([]);

  const handleFoodChange = (index, key, value) => {
    const updatedItems = [...foodItems];
    updatedItems[index][key] = value;
    setFoodItems(updatedItems);
  };

  const addMoreFoodItem = () => {
    setFoodItems([
      ...foodItems,
      { name: '', calories: '', protein: '', carbs: '', fats: '' }
    ]);
  };

  const removeFoodItem = (index) => {
    const updatedItems = [...foodItems];
    updatedItems.splice(index, 1);
    setFoodItems(updatedItems);
  };

  const fetchNutritionData = async () => {
    try {
      const res = await instance.get(`/nutrition/${user._id}`);
      setNutritionData(res.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch nutrition data');
    }
  };

  const handleSubmit = async () => {
    try {
      const formattedFoodItems = foodItems.map(item => ({
        name: item.name,
        calories: Number(item.calories),
        protein: Number(item.protein),
        carbs: Number(item.carbs),
        fats: Number(item.fats),
      }));

      const payload = {
        userId: user._id,
        mealType,
        foodItems: formattedFoodItems,
      };

      await instance.post('/nutrition/add-nutrition', payload);
      Alert.alert('Success', 'Nutrition entry added');
      setMealType('');
      setFoodItems([{ name: '', calories: '', protein: '', carbs: '', fats: '' }]);
      fetchNutritionData();
    } catch (err) {
      Alert.alert('Error', 'Failed to add nutrition');
    }
  };

  useEffect(() => {
    fetchNutritionData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Nutrition</Text>

      <TextInput
        label="Meal Type (e.g., breakfast, lunch)"
        value={mealType}
        onChangeText={setMealType}
        style={styles.input}
        mode="outlined"
      />

      {foodItems.map((item, index) => (
        <View key={index} style={styles.foodItem}>
          <Text style={styles.foodLabel}>Food Item {index + 1}</Text>
          <TextInput
            label="Food Name"
            value={item.name}
            onChangeText={(text) => handleFoodChange(index, 'name', text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Calories"
            value={item.calories}
            onChangeText={(text) => handleFoodChange(index, 'calories', text)}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />
          <TextInput
            label="Protein"
            value={item.protein}
            onChangeText={(text) => handleFoodChange(index, 'protein', text)}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />
          <TextInput
            label="Carbs"
            value={item.carbs}
            onChangeText={(text) => handleFoodChange(index, 'carbs', text)}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />
          <TextInput
            label="Fats"
            value={item.fats}
            onChangeText={(text) => handleFoodChange(index, 'fats', text)}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />

          {index > 0 && (
            <Button
              mode="text"
              onPress={() => removeFoodItem(index)}
              style={styles.removeButton}
              textColor="red"
            >
              Remove Item
            </Button>
          )}
        </View>
      ))}

      <Button
        mode="outlined"
        onPress={addMoreFoodItem}
        style={styles.button}
        textColor="#00C853"
      >
        + Add Another Food Item
      </Button>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Submit Nutrition
      </Button>

      <Text style={styles.sectionTitle}>Your Nutrition Entries</Text>

      {nutritionData.map((entry, idx) => (
        <Card key={idx} style={styles.card}>
          <Card.Title
            title={`Meal: ${entry.mealType}`}
            subtitle={`Date: ${new Date(entry.createdAt).toLocaleDateString()}`}
          />
          <Card.Content>
            <Text>Total Calories: {entry.totalCalories}</Text>
            {entry.foodItems.map((item, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text>Calories: {item.calories} cal</Text>
                <Text>Protein: {item.protein}g | Carbs: {item.carbs}g | Fats: {item.fats}g</Text>
              </View>
            ))}
          </Card.Content>
        </Card>

      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 40,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#00C853',
  },
  input: {
    marginBottom: 10,
  },
  foodItem: {
    marginBottom: 20,
    backgroundColor: '#f1f8e9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c5e1a5',
  },
  foodLabel: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#33691E',
  },
  button: {
    marginBottom: 10,
  },
  removeButton: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  submitButton: {
    backgroundColor: '#00C853',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 8,
  },
});
