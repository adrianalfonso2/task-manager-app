import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useTaskContext } from '../app/context/TaskContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface CategoryFilterProps {
  selectedFilter: string | null;
  onSelectFilter: (categoryId: string | null) => void;
}

// This is the category filter component that allows the user to filter tasks by category
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedFilter,
  onSelectFilter,
}) => {
  const { categories } = useTaskContext();
  const { theme } = useAppTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonScale = useSharedValue(1);

  const handleSelectFilter = (categoryId: string | null) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    buttonScale.value = withSpring(0.95, {}, () => {
      buttonScale.value = withSpring(1, {}, () => {
        setIsAnimating(false);
      });
    });
    
    onSelectFilter(categoryId);
  };

  // This is the animation for the button
  const buttonAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }]
    };
  });

  // This is the return for the category filter component
  return (
    <Animated.View 
      style={[styles.container, { borderBottomColor: theme.borderColor, borderBottomWidth: StyleSheet.hairlineWidth }]}
      entering={FadeIn.duration(400).delay(100)}
      exiting={FadeOut.duration(200)}
    >
      <ThemedText style={[styles.label, { color: theme.text + 'CC' }]}>
        Filter by:
      </ThemedText>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesContainer}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            { 
              backgroundColor: selectedFilter === null 
                ? theme.primaryButtonBackground 
                : theme.primaryButtonBackground + '20',
              borderColor: theme.primaryButtonBackground,
            },
          ]}
          onPress={() => handleSelectFilter(null)}
          disabled={isAnimating}
        >
          <Animated.View style={selectedFilter === null ? buttonAnimStyle : undefined}>
            <Ionicons
              name="layers-outline"
              size={16}
              color={selectedFilter === null ? '#fff' : theme.primaryButtonBackground}
              style={styles.categoryIcon}
            />
            <ThemedText
              style={[
                styles.categoryName,
                { color: selectedFilter === null ? '#fff' : theme.primaryButtonBackground },
              ]}
            >
              All
            </ThemedText>
          </Animated.View>
        </TouchableOpacity>

        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              { 
                backgroundColor: selectedFilter === category.id 
                  ? category.color 
                  : category.color + '20',
                borderColor: category.color,
              },
            ]}
            onPress={() => handleSelectFilter(category.id)}
            disabled={isAnimating}
          >
            <Animated.View style={selectedFilter === category.id ? buttonAnimStyle : undefined}>
              <Ionicons
                name={category.icon as any}
                size={16}
                color={selectedFilter === category.id ? '#fff' : category.color}
                style={styles.categoryIcon}
              />
              <ThemedText
                style={[
                  styles.categoryName,
                  { color: selectedFilter === category.id ? '#fff' : category.color },
                ]}
              >
                {category.name}
              </ThemedText>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingVertical: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  categoryIcon: {
    marginRight: 4,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 