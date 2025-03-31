import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useTaskContext } from '../app/context/TaskContext';
import { useAppTheme } from '@/hooks/useAppTheme';

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { categories } = useTaskContext();
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { borderBottomColor: theme.borderColor }]}>
      <ThemedText style={[styles.label, { color: theme.text + '99' }]}>
        Category:
      </ThemedText>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              { 
                backgroundColor: selectedCategory === category.id 
                  ? category.color 
                  : category.color + '20',
                borderColor: category.color,
              },
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Ionicons
              name={category.icon as any}
              size={16}
              color={selectedCategory === category.id ? '#fff' : category.color}
              style={styles.categoryIcon}
            />
            <ThemedText
              style={[
                styles.categoryName,
                { color: selectedCategory === category.id ? '#fff' : category.color },
              ]}
            >
              {category.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
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