import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = () => {
  const [rating, setRating] = useState(0); // Default rating

  const handlePress = (index) => {
    setRating(index + 1); // Set rating based on the index
  };

  return (
    <View className=" mt-4">
      <View className="flex-row gap-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(index)}>
            <FontAwesome
              name={index < rating ? 'star' : 'star-o'}
              size={36}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StarRating;
